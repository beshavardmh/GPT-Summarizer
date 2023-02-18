import { app, resetStates } from "./app.js";
import { cyrb53, setChatGPTTabId, setCache } from "./helpers.js";
import { getAccessToken, userAuthorized, isUserAuthorized, createOrUpdateAuthorizeTab } from "./authorization.js";
import { generateOverview } from "./overview.js";
import { generateSummary } from "./summary.js";

const extIconOnClick = async (tab) => {
    app.contentTabId = tab.id;
    app.contentTabHashUrl = cyrb53(tab.url);

    chrome.tabs.onUpdated.addListener(async (contentTabId, changeInfo, tab) => {
        if (app.initialized[contentTabId]) delete app.initialized[contentTabId];

        if (tab.url == 'https://chat.openai.com/chat' && changeInfo.status == 'complete') {
            setChatGPTTabId(contentTabId);

            let accessToken = await getAccessToken();

            if (app.extWantAuthorize && accessToken) {
                userAuthorized();
                app.extWantAuthorize = false;
            }
        }
    });

    if (app.initialized[app.contentTabId]) {
        chrome.tabs.sendMessage(app.contentTabId, 'DISPLAY_POPUP');
        return;
    }

    app.initialized[app.contentTabId] = true;

    chrome.scripting.executeScript({
        target: { tabId: app.contentTabId },
        files: [
            'content/readability.js',
            'content/helpers.js',
            'content/popup.js',
            'content/states/authorize.js',
            'content/states/error.js',
            'content/states/loading.js',
            'content/states/overview.js',
            'content/states/summary.js',
            'content/content.js',
        ]
    });
}

chrome.action.onClicked.addListener(extIconOnClick);

chrome.runtime.onConnect.addListener((port) => {
    if (app.chatGPTTabId && port.sender.tab.id == app.chatGPTTabId) {
        app.chatGPTPort = port;
    } else {
        app.contentPort = port;
    }

    port.onMessage.addListener(async (event) => {
        switch (event.type) {
            case 'GET_ACCESS_TOKEN':
                await isUserAuthorized();
                if (app.states.alreadySummarized) {
                    app.contentPort.postMessage({ type: 'SUMMARY_ONMESSAGE', props: { text: app.summaryText } });
                    app.contentPort.postMessage({ type: 'SUMMARY_DONE' });
                }
                if (app.states.unauthorized) app.contentPort.postMessage({ type: 'UNAUTHORIZED' });
                if (app.states.authorized) app.contentPort.postMessage({ type: 'AUTHORIZED' });
                break;
            case 'OPEN_AUTHORIZE_TAB':
                createOrUpdateAuthorizeTab();
                break;
            case 'RETURN_CONTENT_TAB':
                chrome.tabs.update(app.contentTabId, { active: true });
                break;
            case 'GENERATE_OVERVIEW':
                const { overviewTime, overviewWords } = await generateOverview(event.props.content);
                if (app.states.error) app.contentPort.postMessage({ type: 'ERROR', props: { error: app.error } });
                if (app.states.overview) app.contentPort.postMessage({ type: 'OVERVIEW', props: { time: overviewTime, words: overviewWords } });
                break;
            case 'GENERATE_SUMMARY':
                await generateSummary();
                if (app.states.unauthorized) app.contentPort.postMessage({ type: 'UNAUTHORIZED' });
                if (app.states.error) app.contentPort.postMessage({ type: 'ERROR', props: { error: app.error } });
                break;
            case 'TRANSLATE_SUMMARY':
                await translateSummary(event.props.lang);
                if (app.states.unauthorized) app.contentPort.postMessage({ type: 'UNAUTHORIZED' });
                if (app.states.error) app.contentPort.postMessage({ type: 'ERROR', props: { error: app.error } });
                break;
            case 'CONVERSATION_ERROR':
                app.contentPort.postMessage({ type: 'ERROR', props: { error: event.props.error } });
                break;
            case 'CONVERSATION_ONMESSAGE':
                app.summaryText = event.props.text;
                app.contentPort.postMessage({ type: 'SUMMARY_ONMESSAGE', props: { text: event.props.text } });
                break;
            case 'CONVERSATION_DONE':
                setCache(`pageContentText${app.contentTabHashUrl}`, app.pageContentText, 10);
                setCache(`summaryText${app.contentTabHashUrl}`, app.summaryText, 10);
                app.contentPort.postMessage({ type: 'SUMMARY_DONE' });
                break;
        }
        resetStates();
    });
});