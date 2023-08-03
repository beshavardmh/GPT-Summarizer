import { app, resetStates } from "./app.js";
import { cyrb53, setChatGPTTabId, setCache } from "./helpers.js";
import { getAccessToken, userAuthorized, isUserAuthorized, createOrUpdateAuthorizeTab } from "./authorization.js";
import { generateOverview } from "./overview.js";
import { generateSummary, translateSummary } from "./summary.js";

// Define a function that executes when the extension icon is clicked
const extIconOnClick = async (tab) => {
    // Set the content tab ID and URL hash for later use
    app.contentTabId = tab.id;
    app.contentTabHashUrl = cyrb53(tab.url);

    // Listen for updates to the content tab
    chrome.tabs.onUpdated.addListener(async (contentTabId, changeInfo, tab) => {
        // If the content tab has been initialized before, remove it from the initialized list
        if (app.initialized[contentTabId]) delete app.initialized[contentTabId];

        // If the content tab has finished loading the ChatGPT website, set the ChatGPT tab ID
        if (tab.url == 'https://chat.openai.com/' && changeInfo.status == 'complete') {
            setChatGPTTabId(contentTabId);

            // Get an access token and authorize the user if necessary
            let accessToken = await getAccessToken();

            // One time showing authorization dialog on ChatGPT tab
            if (app.extWantAuthorize && accessToken) {
                userAuthorized();
                app.extWantAuthorize = false;
            }
        }
    });

    // If the content tab has been initialized before, display the popup
    if (app.initialized[app.contentTabId]) {
        chrome.tabs.sendMessage(app.contentTabId, 'DISPLAY_POPUP');
        return;
    }

    // Mark the content tab as initialized
    app.initialized[app.contentTabId] = true;

    // Inject content modules into the content tab
    chrome.scripting.executeScript({
        target: { tabId: app.contentTabId },
        files: [
            'content/readability.js',
            'content/marked.js',
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

// Listen for clicks on the extension icon
chrome.action.onClicked.addListener(extIconOnClick);

// Listen for connections from other scripts
chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "POPUP" || port.name === "CHATGPT") {
        // If the connection is from the ChatGPT tab, save the port for later use
        if (port.name === "CHATGPT") {
            app.chatGPTPort = port;
        } else if (port.name === "POPUP") {
            // Otherwise, save the port for the content tab
            app.contentPort = port;
        }

        // Listen for messages from the connected script
        port.onMessage.addListener(async (event) => {
            // Handle different types of messages
            switch (event.type) {
                case 'GET_ACCESS_TOKEN':
                    // Check if the user is authorized and respond accordingly
                    await isUserAuthorized();
                    if (app.states.alreadySummarized) {
                        // If the content has already been summarized, send the summary to the content script
                        app.contentPort.postMessage({ type: 'SUMMARY_ONMESSAGE', props: { text: app.summaryText } });
                        app.contentPort.postMessage({ type: 'SUMMARY_DONE' });
                    }
                    // If the user is unauthorized, send the UNAUTHORIZED message to the content script
                    if (app.states.unauthorized) app.contentPort.postMessage({ type: 'UNAUTHORIZED' });
                    // If the user is authorized, send the AUTHORIZED message to the content script
                    if (app.states.authorized) app.contentPort.postMessage({ type: 'AUTHORIZED' });
                    break;
                case 'OPEN_AUTHORIZE_TAB':
                    // Create or update the authorization tab
                    createOrUpdateAuthorizeTab();
                    break;
                case 'RETURN_CONTENT_TAB':
                    // Switch to the content tab
                    chrome.tabs.update(app.contentTabId, { active: true });
                    break;
                case 'GENERATE_OVERVIEW':
                    // Generate an overview of the content
                    const { overviewTime, overviewWords } = await generateOverview(event.props.content);
                    if (app.states.error) app.contentPort.postMessage({ type: 'ERROR', props: { error: app.error } });
                    if (app.states.overview) app.contentPort.postMessage({ type: 'OVERVIEW', props: { time: overviewTime, words: overviewWords } });
                    break;
                case 'GENERATE_SUMMARY':
                    // Generate a summary of the content
                    await generateSummary(event.props.summaryMode);
                    if (app.states.unauthorized) app.contentPort.postMessage({ type: 'UNAUTHORIZED' });
                    if (app.states.error) app.contentPort.postMessage({ type: 'ERROR', props: { error: app.error } });
                    break;
                case 'TRANSLATE_SUMMARY':
                    // Translate the summary to the specified language
                    await translateSummary(event.props.lang);
                    if (app.states.unauthorized) app.contentPort.postMessage({ type: 'UNAUTHORIZED' });
                    if (app.states.error) app.contentPort.postMessage({ type: 'ERROR', props: { error: app.error } });
                    break;
                case 'CONVERSATION_ERROR':
                    // Send the error message to the content script
                    app.contentPort.postMessage({ type: 'ERROR', props: { error: event.props.error } });
                    break;
                case 'CONVERSATION_ONMESSAGE':
                    // Save the summary text and send the SUMMARY_ONMESSAGE message to the content script
                    app.summaryText = event.props.text;
                    app.contentPort.postMessage({ type: 'SUMMARY_ONMESSAGE', props: { text: event.props.text } });
                    break;
                case 'CONVERSATION_DONE':
                    // Save the page content and summary text to the cache and send the SUMMARY_DONE message to the content script
                    setCache(`pageContentText${app.contentTabHashUrl}`, app.pageContentText, 10);
                    setCache(`summaryText${app.contentTabHashUrl}`, app.summaryText, 10);
                    app.contentPort.postMessage({ type: 'SUMMARY_DONE' });
                    break;
            }
            // Reset the app states
            resetStates();
        });
    }
});