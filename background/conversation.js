import { app } from "./app.js";

// Set conversation configuration for OpenAI chat
const setConversationConfig = (question, accessToken) => {
    window.config = {
        accessToken: accessToken,
        question: question,
    }
}

// Get conversation from OpenAI chat
export const getConversation = (question, accessToken) => {
    // Execute script to set conversation configuration
    return new Promise((resolve, reject) => {
        chrome.scripting.executeScript({
            target: { tabId: app.chatGPTTabId },
            func: setConversationConfig,
            args: [question, accessToken],
        }).then(() => {
            // Execute scripts to fetch SSE (stream) and get conversation
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