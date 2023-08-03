port = chrome.runtime.connect({name: "CHATGPT"});

conversationId = uuidv4();

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
                    id: conversationId,
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

async function getLastConversation() {
    var lastConversationId = null;

    await fetch(`https://chat.openai.com/backend-api/conversations?offset=0&limit=1&order=updated`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.config.accessToken}`,
        },
    }).then(response => response.json())
        .then(data => {
            if (data.hasOwnProperty('items') && Array.isArray(data.items) && data.items.length > 0 && data.items[0].hasOwnProperty('id')) {
                lastConversationId = data.items[0].id;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });

    return lastConversationId;
}

async function deleteTempConversation(lastConversationId) {
    const res = await fetch(`https://chat.openai.com/backend-api/conversation/${lastConversationId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${window.config.accessToken}`,
        },
        body: JSON.stringify({
            is_visible: false,
        }),
    });
    const data = await res.json().catch(() => ({}));
    return res.status === 200 && data.hasOwnProperty('success') && data.success == true;
}

async function run() {
    await getConversationInj();

    const lastConversationId = await getLastConversation();
    
    if (lastConversationId) {
        await deleteTempConversation(lastConversationId);
    }
}

run();
