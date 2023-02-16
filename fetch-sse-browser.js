respError = null;

async function fetchSSE(resource, options) {
    var { onMessage, ...fetchOptions } = options;
    var resp = await fetch(resource, fetchOptions);
    if (resp.status !== 200) {
        var errorBody = await resp.json().catch(() => ({}));
        respError = `${resp.status} ${errorBody.detail ?? resp.statusText}`;
    }
    var parser = createParser((event) => {
        if (event.type === "event") {
            onMessage(event.data);
        }
    });
    for await (var chunk of streamAsyncIterable(resp.body)) {
        var str = new TextDecoder().decode(chunk);
        parser.feed(str);
    }
}

function createParser(onParse) {
    var isFirstChunk;
    var buffer;
    var startingPosition;
    var startingFieldLength;
    var eventId;
    var eventName;
    var data;
    reset();
    return {
        feed,
        reset
    };

    function reset() {
        isFirstChunk = true;
        buffer = "";
        startingPosition = 0;
        startingFieldLength = -1;
        eventId = void 0;
        eventName = void 0;
        data = "";
    }

    function feed(chunk) {
        buffer = buffer ? buffer + chunk : chunk;

        if (isFirstChunk && hasBom(buffer)) {
            buffer = buffer.slice(BOM.length);
        }

        isFirstChunk = false;
        var length = buffer.length;
        var position = 0;
        var discardTrailingNewline = false;

        while (position < length) {
            if (discardTrailingNewline) {
                if (buffer[position] === "\n") {
                    ++position;
                }

                discardTrailingNewline = false;
            }

            var lineLength = -1;
            var fieldLength = startingFieldLength;
            var character;

            for (var index = startingPosition; lineLength < 0 && index < length; ++index) {
                character = buffer[index];

                if (character === ":" && fieldLength < 0) {
                    fieldLength = index - position;
                } else if (character === "\r") {
                    discardTrailingNewline = true;
                    lineLength = index - position;
                } else if (character === "\n") {
                    lineLength = index - position;
                }
            }

            if (lineLength < 0) {
                startingPosition = length - position;
                startingFieldLength = fieldLength;
                break;
            } else {
                startingPosition = 0;
                startingFieldLength = -1;
            }

            parseEventStreamLine(buffer, position, fieldLength, lineLength);
            position += lineLength + 1;
        }

        if (position === length) {
            buffer = "";
        } else if (position > 0) {
            buffer = buffer.slice(position);
        }
    }

    function parseEventStreamLine(lineBuffer, index, fieldLength, lineLength) {
        if (lineLength === 0) {
            if (data.length > 0) {
                onParse({
                    type: "event",
                    id: eventId,
                    event: eventName || void 0,
                    data: data.slice(0, -1)
                });
                data = "";
                eventId = void 0;
            }

            eventName = void 0;
            return;
        }

        var noValue = fieldLength < 0;
        var field = lineBuffer.slice(index, index + (noValue ? lineLength : fieldLength));
        var step = 0;

        if (noValue) {
            step = lineLength;
        } else if (lineBuffer[index + fieldLength + 1] === " ") {
            step = fieldLength + 2;
        } else {
            step = fieldLength + 1;
        }

        var position = index + step;
        var valueLength = lineLength - step;
        var value = lineBuffer.slice(position, position + valueLength).toString();

        if (field === "data") {
            data += value ? "".concat(value, "\n") : "\n";
        } else if (field === "event") {
            eventName = value;
        } else if (field === "id" && !value.includes("\0")) {
            eventId = value;
        } else if (field === "retry") {
            var retry = parseInt(value, 10);

            if (!Number.isNaN(retry)) {
                onParse({
                    type: "reconnect-interval",
                    value: retry
                });
            }
        }
    }
}

BOM = [239, 187, 191];

function hasBom(buffer) {
    return BOM.every((charCode, index) => buffer.charCodeAt(index) === charCode);
}

async function* streamAsyncIterable(stream) {
    var reader = stream.getReader();
    try {
        while (true) {
            var { done, value } = await reader.read();
            if (done) {
                return;
            }
            yield value;
        }
    } finally {
        reader.releaseLock();
    }
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}