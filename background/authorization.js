import {app} from './app.js';
import {chromeTabExist, getCache, setCache} from './helpers.js';

export const getAccessToken = async () => {
    if (!await chromeTabExist(app.chatGPTTabId)) return false;

    return new Promise((resolve, reject) => {
        chrome.scripting.executeScript({
            target: { tabId: app.chatGPTTabId },
            files: ['background/injects/get-access-token-inj.js']
        }).then(results => resolve(results[0].result ?? null));
    });
}

export const userAuthorized = () => {
    chrome.scripting.executeScript({
        target: { tabId: app.chatGPTTabId },
        files: ['background/injects/user-authorized-inj.js']
    });
}

export const isUserAuthorized = async () => {
    const cachedContent = await getCache(`pageContentText${app.contentTabHashUrl}`);
    const cachedSummary = await getCache(`summaryText${app.contentTabHashUrl}`);
    if (cachedContent && cachedSummary) {
        app.pageContentText = cachedContent;
        app.summaryText = cachedSummary;
        app.states.alreadySummarized = true;
        return;
    }

    if (await getAccessToken()) {
        app.states.authorized = true;
        return true;
    }
    app.states.unauthorized = true;
    return false;
}

export const createOrUpdateAuthorizeTab = async () => {
    app.extWantAuthorize = true;

    if (!await chromeTabExist(app.chatGPTTabId)) {
        chrome.tabs.create({ url: 'https://chat.openai.com/chat' });
    } else {
        chrome.tabs.update(app.chatGPTTabId, { active: true });
        chrome.tabs.reload(app.chatGPTTabId);
    }
}