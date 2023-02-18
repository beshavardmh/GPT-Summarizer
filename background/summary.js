import { app } from "./app.js";
import { getAccessToken } from "./authorization.js";
import { getConversation } from "./conversation.js";

export const generateSummary = async () => {
    if (!app.pageContentText) {
        app.states.error = true;
        app.error = 'Page content not found!';
        return;
    }
    const prompt = `Instructions: act as a content summarizer. Your response should be in the original language of the content and provide an overview of the information presented in the content and should not include personal comments.\n\nContent: ${app.pageContentText}`;
    const accessToken = await getAccessToken();
    if (accessToken) {
        await getConversation(prompt, accessToken);
        return;
    }
    app.states.unauthorized = true;
    return;
}

export const translateSummary = async (lang) => {
    if (!app.summaryText) {
        app.states.error = true;
        app.error = 'Summary not found!';
        return;
    }
    const prompt = `Instruction: translate this content into ${lang} with correct grammar.\n\nContent: ${app.summaryText}`;
    const accessToken = await getAccessToken();
    if (accessToken) {
        await getConversation(prompt, accessToken);
        return;
    }
    app.states.unauthorized = true;
    return;
}