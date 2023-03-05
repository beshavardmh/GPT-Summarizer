import { app } from './app.js';
import { chatGPTTabExists, getCache } from './helpers.js';

// Get access token for authorized user
export const getAccessToken = async () => {
    // Check if chatGPT tab exists
    if (!await chatGPTTabExists()) return false;

    // Execute script to get access token
    return new Promise((resolve, reject) => {
        chrome.scripting.executeScript({
            target: { tabId: app.chatGPTTabId },
            files: ['background/injects/get-access-token-inj.js']
        }).then(results => resolve(results[0].result ?? null));
    });
}

// Execute script to check if user is authorized
export const userAuthorized = () => {
    chrome.scripting.executeScript({
        target: { tabId: app.chatGPTTabId },
        files: ['background/injects/user-authorized-inj.js']
    });
}

// Check if user is authorized
export const isUserAuthorized = async () => {
    // Get cached content and summary if available
    const cachedContent = await getCache(`pageContentText${app.contentTabHashUrl}`);
    const cachedSummary = await getCache(`summaryText${app.contentTabHashUrl}`);
    // If cached content and summary are available, set them and return true
    if (cachedContent && cachedSummary) {
        app.pageContentText = cachedContent;
        app.summaryText = cachedSummary;
        app.states.alreadySummarized = true;
        return;
    }

    // If access token is available, set authorized state and return true
    if (await getAccessToken()) {
        app.states.authorized = true;
        return true;
    }
    // Otherwise, set unauthorized state and return false
    app.states.unauthorized = true;
    return false;
}

// Create or update authorization tab
export const createOrUpdateAuthorizeTab = async () => {
    // Set extWantAuthorize state to true
    app.extWantAuthorize = true;

    // If chatGPT tab does not exist, create it
    if (!await chatGPTTabExists()) {
        chrome.tabs.create({ url: 'https://chat.openai.com/chat' });
    }
    // Otherwise, update the tab and reload it
    else {
        chrome.tabs.update(app.chatGPTTabId, { active: true });
        chrome.tabs.reload(app.chatGPTTabId);
    }
}