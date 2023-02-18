import { app } from "./app.js";

export const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }

    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export const getCache = async (key) => {
    let value = null;
    await chrome.storage.local.get([key]).then((result) => {
        if (typeof result[key] !== 'undefined') {
            if (Date.now() - result[key].timestamp < result[key].expireTime) {
                value = result[key].value;
                return value;
            }
            chrome.storage.local.remove([key]);
        }
    });
    return value;
}

export const setCache = async (key, value, expireTime = 10) => {
    const ttl = (60 * 1000) * expireTime;
    var now = Date.now();
    var data = {
        value: value,
        timestamp: now,
        expireTime: ttl,
    };
    await chrome.storage.local.set({ [key]: data });
}

export const chromeTabExist = tabId => {
    return new Promise((resolve, reject) => {
        chrome.tabs.get(tabId, (tab) => {
            if (chrome.runtime.lastError || !tab) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

export const setChatGPTTabId = tabId => app.chatGPTTabId = tabId;