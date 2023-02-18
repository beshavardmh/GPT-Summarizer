const run = async () => {
    addStylesheet(document, 'assets/css/main.css');
    createMainPopup();
    showLoadingState();
}

run();

const port = chrome.runtime.connect();

port.postMessage({ type: 'GET_ACCESS_TOKEN' });

port.onMessage.addListener(async (state) => {
    switch (state.type) {
        case 'UNAUTHORIZED':
            showAuthorizeState(() => {
                port.postMessage({ type: 'OPEN_AUTHORIZE_TAB' });
            });
            break;
        case 'AUTHORIZED':
            showLoadingState();
            port.postMessage({ type: 'GENERATE_OVERVIEW', props: { content: getPageContent() } });
            break;
        case 'OVERVIEW':
            showOverviewState(state.props.time, state.props.words, () => {
                port.postMessage({ type: 'GENERATE_SUMMARY' });
                showLoadingState();
            });
            break;
        case 'ERROR':
            showErrorState('Error: ' + state.props.error);
            break;
        case 'SUMMARY_ONMESSAGE':
            showSummaryState(state.props.text);
            break;
        case 'SUMMARY_DONE':
            showSummaryOptions((lang) => {
                port.postMessage({ type: 'TRANSLATE_SUMMARY', props: { lang: lang } });
                showLoadingState();
            }, () => {
                port.postMessage({ type: 'GENERATE_SUMMARY' });
                showLoadingState();
            });
            break;
    }
});

chrome.runtime.onMessage.addListener(async (action) => {
    if (action == 'DISPLAY_POPUP') {
        displayMainPopup();
    }
}
);