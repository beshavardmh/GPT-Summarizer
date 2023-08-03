import { app } from "./app.js";

// A hash function that generates a 32-bit hash code for the given input string
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

// A function that retrieves the data from the local storage
export const getCache = async (key) => {
    let value = null;
    await chrome.storage.local.get([key]).then((result) => {
        if (typeof result[key] !== 'undefined') {
            // Check if data is expired, it will be removed from the storage
            if (Date.now() - result[key].timestamp < result[key].expireTime) {
                value = result[key].value;
                return value;
            }
            chrome.storage.local.remove([key]);
        }
    });
    return value;
}

// A function that sets the data with the given key and value to the local storage with a given expiration time
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

// A function that checks whether the tab with the given tabId exists or not
export const chromeTabExists = tabId => {
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

// A function that checks if there is a ChatGPT tab or not
export const chatGPTTabExists = async() => {
    if (await chromeTabExists(app.chatGPTTabId)) {
        return true;
    }
    
    // It also checks all tabs which have a ChatGPT url
    chrome.tabs.query({url: 'https://chat.openai.com/'}, (tabs)=>{
        if (tabs.length) {
            setChatGPTTabId(tabs[0].id);
            return true;
        }
    });
    
    return false;
}

// A function that sets the value of chatGPTTabId variable in app.js to the given tabId
export const setChatGPTTabId = tabId => app.chatGPTTabId = tabId;