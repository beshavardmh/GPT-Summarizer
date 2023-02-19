export const app = {
    states: {
        unauthorized: false,
        authorized: false,
        error: false,
        overview: false,
        alreadySummarized: false,
    },
    error: '',
    pageContentLang: 'en',
    pageContentText: null,
    summaryText: null,
    extWantAuthorize: false,
    chatGPTTabId: 0,
    contentTabId: 0,
    contentTabHashUrl: '',
    chatGPTPort: null,
    contentPort: null,
    initialized: {},
};

export const resetStates = () => {
    for (const key of Object.keys(app.states)) {
        app.states[key] = false;
    }
}