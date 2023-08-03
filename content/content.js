// This function is called when first-click on extension icon in the current tab
const run = async () => {
    // Add a stylesheet to the current document
    addStylesheet(document, 'assets/css/main.css');
    // Create the main extension popup
    createMainPopup();
    // Show the loading state
    showLoadingState();
}
run();

// Establishe a connection and send the first message to the background
const port = chrome.runtime.connect({name: "POPUP"});
port.postMessage({ type: 'GET_ACCESS_TOKEN' });

// Listen for messages on the background.
port.onMessage.addListener(async (state) => {
    // Handle different message types and executes code based on the message received
    switch (state.type) {
        // If the message type is "UNAUTHORIZED", this code shows an authorize state and sends a message to open an authorize tab
        case 'UNAUTHORIZED':
            showAuthorizeState(() => {
                port.postMessage({ type: 'OPEN_AUTHORIZE_TAB' });
            });
            break;
        // If the message type is "AUTHORIZED", this code shows a loading state and sends a message to generate an overview with page content
        case 'AUTHORIZED':
            showLoadingState();
            port.postMessage({ type: 'GENERATE_OVERVIEW', props: { content: getPageContent() } });
            break;
        // If the message type is "OVERVIEW", this code shows an overview state with the provided time and word count, and sends a message to generate a summary
        case 'OVERVIEW':
            showOverviewState(state.props.time, state.props.words, (summaryMode) => {
                port.postMessage({ type: 'GENERATE_SUMMARY', props: { summaryMode: summaryMode } });
                showLoadingState();
            });
            break;
        // If the message type is "ERROR", this code shows an error state with the provided error message
        case 'ERROR':
            showErrorState('Error: ' + state.props.error);
            break;
        // If the message type is "SUMMARY_ONMESSAGE", this code shows a summary state with the provided text
        case 'SUMMARY_ONMESSAGE':
            showSummaryState(state.props.text);
            break;
        // If the message type is "SUMMARY_DONE", this code shows summary options and sends a message to translate the summary based on the selected language
        case 'SUMMARY_DONE':
            showSummaryOptions((lang) => {
                port.postMessage({ type: 'TRANSLATE_SUMMARY', props: { lang: lang } });
                showLoadingState();
            }, () => {
                port.postMessage({ type: 'GENERATE_SUMMARY', props: { summaryMode: null } });
                showLoadingState();
            });
            break;
    }
});

// Listen for runtime messages on the background.
chrome.runtime.onMessage.addListener(async (action) => {
    // Display the main popup when the user closes it once and clicks on the extension icon again
    if (action == 'DISPLAY_POPUP') {
        displayMainPopup();
    }
}
);