port = chrome.runtime.connect();

async function getConversationInj() {
    await fetchSSE("https://chat.openai.com/backend-api/conversation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.config.accessToken}`,
        },
        body: JSON.stringify({
            action: "next",
            messages: [
                {
                    id: uuidv4(),
                    role: "user",
                    content: {
                        content_type: "text",
                        parts: [window.config.question],
                    },
                },
            ],
            model: "text-davinci-002-render",
            parent_message_id: uuidv4(),
        }),
        onMessage(message) {
            if (respError) {
                port.postMessage({ type: 'CONVERSATION_ERROR', props: { error: respError } });
                return;
            }
            if (message === "[DONE]") {
                port.postMessage({ type: 'CONVERSATION_DONE' });
                return;
            }
            var data;
            try {
                data = JSON.parse(message)
            } catch (error) {
                port.postMessage({ type: 'CONVERSATION_ERROR', props: { error: error } });
                return;
            }
            var text = data.message?.content?.parts?.[0];
            if (text) {
                port.postMessage({ type: 'CONVERSATION_ONMESSAGE', props: { text: text } });
            }
        },
    });
}

async function run() {
    await getConversationInj();
}

run();
