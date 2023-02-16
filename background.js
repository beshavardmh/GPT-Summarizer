import { GPT3BrowserTokenizer } from "./gpt3-tokenizer.js";

const states = {
    unauthorized: false,
    authorized: false,
    error: false,
    overview: false,
    alreadySummarized: false,
}

let error = '';

let pageContentText = null;

let summaryText = null;

let extWantAuthorize = false;

let chatGPTTabId = 0;

let contentTabId = 0;

let contentTabHashUrl = '';

let chatGPTPort;

let contentPort;

let initialized = {};


const cyrb53 = (str, seed = 0) => {
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

const getCache = async (key) => {
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

const setCache = async (key, value, expireTime = 10) => {
    const ttl = (60 * 1000) * expireTime;
    var now = Date.now();
    var data = {
        value: value,
        timestamp: now,
        expireTime: ttl,
    };
    await chrome.storage.local.set({ [key]: data });
}

const chromeTabExist = tabId => {
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

const setChatGPTTabId = tabId => chatGPTTabId = tabId;

const getAccessToken = async () => {
    if (!await chromeTabExist(chatGPTTabId)) return false;

    return new Promise((resolve, reject) => {
        chrome.scripting.executeScript({
            target: { tabId: chatGPTTabId },
            func: getAccessTokenInj,
        }).then(results => resolve(results[0].result ?? null));
    });
}

const getAccessTokenInj = async () => {
    const res = await fetch('https://chat.openai.com/api/auth/session');
    const data = await res.json().catch(() => ({}));
    return res.status === 200 && data.accessToken;
}

const setConversationConfig = (question, accessToken) => {
    window.config = {
        accessToken: accessToken,
        question: question,
    }
}

const getConversation = (question, accessToken) => {
    return new Promise((resolve, reject) => {
        chrome.scripting.executeScript({
            target: { tabId: chatGPTTabId },
            func: setConversationConfig,
            args: [question, accessToken],
        }).then(() => {
            chrome.scripting.executeScript({
                target: { tabId: chatGPTTabId },
                files: ['fetch-sse-browser.js', 'get-conversation-inj.js'],
            });
            resolve(true);
        });
    });
}

const userAuthorized = () => {
    chrome.scripting.executeScript({
        target: { tabId: chatGPTTabId },
        files: ['user-authorized-inj.js']
    });
}

const resetStates = () => {
    for (const key of Object.keys(states)) {
        states[key] = false;
    }
}

const isUserAuthorized = async () => {
    const cachedContent = await getCache(`pageContentText${contentTabHashUrl}`);
    const cachedSummary = await getCache(`summaryText${contentTabHashUrl}`);
    if (cachedContent) {
        pageContentText = cachedContent;
        summaryText = cachedSummary;
        states.alreadySummarized = true;
        return;
    }

    if (await getAccessToken()) {
        states.authorized = true;
        return true;
    }
    states.unauthorized = true;
    return false;
}

const createOrUpdateAuthorizeTab = async () => {
    extWantAuthorize = true;

    if (!await chromeTabExist(chatGPTTabId)) {
        chrome.tabs.create({ url: 'https://chat.openai.com/chat' });
    } else {
        chrome.tabs.update(chatGPTTabId, { active: true });
        chrome.tabs.reload(chatGPTTabId);
    }
}

const generateOverview = async (contentObj) => {
    if (!contentObj || !contentObj.textContent || !contentObj.title) {
        states.error = true;
        error = 'Unfortunately, the content of this page cannot be identified!';
        return;
    }

    const tokenizer = new GPT3BrowserTokenizer({ type: 'gpt3' });
    let content = `${contentObj.title}\n${contentObj.textContent}`;
    content = content.trim().replace(/[\t\n]+/g, '\n');
    const contentWords = content.split(' ').length;
    const contentReadingTime = Math.floor((contentWords / 220) * 2) / 2;

    const encodedContent = tokenizer.encode(content);
    const trimmedBpe = encodedContent.bpe.length > 2000 ? encodedContent.bpe.slice(0, 2000) : encodedContent.bpe;

    pageContentText = tokenizer.decode(trimmedBpe) + '...';

    states.overview = true;

    return { overviewTime: contentReadingTime, overviewWords: contentWords };
}

const generateSummary = async () => {
    if (!pageContentText) {
        states.error = true;
        error = 'Page content not found!';
        return;
    }
    const prompt = `Instructions: act as a content summarizer. Your response should not be from third person point of view and should be in the original language of the content and provide an overview of the information presented in the content and should not include personal comments.\n\nContent: ${pageContentText}`;
    const accessToken = await getAccessToken();
    if (accessToken) {
        await getConversation(prompt, accessToken);
        return;
    }
    states.unauthorized = true;
    return;
}

const translateSummary = async (lang) => {
    if (!summaryText) {
        states.error = true;
        error = 'Summary not found!';
        return;
    }
    const prompt = `Instruction: translate this content into ${lang} with correct grammar.\n\nContent: ${summaryText}`;
    const accessToken = await getAccessToken();
    if (accessToken) {
        await getConversation(prompt, accessToken);
        return;
    }
    states.unauthorized = true;
    return;
}

const extIconOnClick = async (tab) => {
    contentTabId = tab.id;
    contentTabHashUrl = cyrb53(tab.url);

    chrome.tabs.onUpdated.addListener(async (contentTabId, changeInfo, tab) => {
        if (initialized[contentTabId]) delete initialized[contentTabId];

        if (tab.url == 'https://chat.openai.com/chat' && changeInfo.status == 'complete') {
            setChatGPTTabId(contentTabId);

            let accessToken = await getAccessToken();

            if (extWantAuthorize && accessToken) {
                userAuthorized();
                extWantAuthorize = false;
            }
        }
    });

    if (initialized[contentTabId]) {
        chrome.tabs.sendMessage(contentTabId, 'DISPLAY_POPUP');
        return;
    }

    initialized[contentTabId] = true;

    chrome.scripting.executeScript({ target: { tabId: contentTabId }, files: ['readability.js', 'content.js'] });
}

chrome.action.onClicked.addListener(extIconOnClick);

chrome.runtime.onConnect.addListener((port) => {
    if (chatGPTTabId && port.sender.tab.id == chatGPTTabId) {
        chatGPTPort = port;
    } else {
        contentPort = port;
    }

    port.onMessage.addListener(async (event) => {
        switch (event.type) {
            case 'GET_ACCESS_TOKEN':
                await isUserAuthorized();
                if (states.alreadySummarized) {
                    contentPort.postMessage({ type: 'SUMMARY_ONMESSAGE', props: { text: summaryText } });
                    contentPort.postMessage({ type: 'SUMMARY_DONE' });
                }
                if (states.unauthorized) contentPort.postMessage({ type: 'UNAUTHORIZED' });
                if (states.authorized) contentPort.postMessage({ type: 'AUTHORIZED' });
                break;
            case 'OPEN_AUTHORIZE_TAB':
                createOrUpdateAuthorizeTab();
                break;
            case 'RETURN_CONTENT_TAB':
                chrome.tabs.update(contentTabId, { active: true });
                break;
            case 'GENERATE_OVERVIEW':
                const { overviewTime, overviewWords } = await generateOverview(event.props.content);
                if (states.error) contentPort.postMessage({ type: 'ERROR', props: { error: error } });
                if (states.overview) contentPort.postMessage({ type: 'OVERVIEW', props: { time: overviewTime, words: overviewWords } });
                break;
            case 'GENERATE_SUMMARY':
                await generateSummary();
                if (states.unauthorized) contentPort.postMessage({ type: 'UNAUTHORIZED' });
                if (states.error) contentPort.postMessage({ type: 'ERROR', props: { error: error } });
                break;
            case 'TRANSLATE_SUMMARY':
                await translateSummary(event.props.lang);
                if (states.unauthorized) contentPort.postMessage({ type: 'UNAUTHORIZED' });
                if (states.error) contentPort.postMessage({ type: 'ERROR', props: { error: error } });
                break;
            case 'CONVERSATION_ERROR':
                contentPort.postMessage({ type: 'ERROR', props: { error: event.props.error } });
                break;
            case 'CONVERSATION_ONMESSAGE':
                summaryText = event.props.text;
                contentPort.postMessage({ type: 'SUMMARY_ONMESSAGE', props: { text: event.props.text } });
                break;
            case 'CONVERSATION_DONE':
                setCache(`pageContentText${contentTabHashUrl}`, pageContentText, 10);
                setCache(`summaryText${contentTabHashUrl}`, summaryText, 10);
                contentPort.postMessage({ type: 'SUMMARY_DONE' });
                break;
        }
        resetStates();
    });
});

// chrome.contextMenus.create({
//     id: "gpt-summarize",
//     title: "Summarize",
//     contexts: ["selection"]
// });

// chrome.contextMenus.onClicked.addListener(function (info, tab) {
//     if (info.menuItemId == "gpt-summarize") {
//         console.log(info.selectionText);
//     }
// });