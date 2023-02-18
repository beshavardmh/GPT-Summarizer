import { app } from "./app.js";

const setConversationConfig = (question, accessToken) => {
    window.config = {
        accessToken: accessToken,
        question: question,
    }
}

export const getConversation = (question, accessToken) => {
    return new Promise((resolve, reject) => {
        chrome.scripting.executeScript({
            target: { tabId: app.chatGPTTabId },
            func: setConversationConfig,
            args: [question, accessToken],
        }).then(() => {
            chrome.scripting.executeScript({
                target: { tabId: app.chatGPTTabId },
                files: [
                    'background/injects/fetch-sse-browser.js',
                    'background/injects/get-conversation-inj.js'
                ],
            });
            resolve(true);
        });
    });
}