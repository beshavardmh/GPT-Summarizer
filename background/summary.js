import { app } from "./app.js";
import { getAccessToken } from "./authorization.js";
import { getConversation } from "./conversation.js";

// Generate summary of the page content
export const generateSummary = async () => {
    // Check if page content is available
    if (!app.pageContentText) {
        // Update app states and error message
        app.states.error = true;
        app.error = 'Page content not found!';
        return;
    }

    // Set prompt with instructions and content to summarize
    const prompt = `Instructions: Summarize this content in brief in ${app.pageContentLang} language with correct grammer. Your response should be provide an overview of the information presented in the content and should not include personal comments.\n\nContent: ${app.pageContentText}`;
    
    // Get access token for authorization
    const accessToken = await getAccessToken();

    // If access token is available, call function to get summary
    if (accessToken) {
        await getConversation(prompt, accessToken);
        return;
    }

    // Update app states to indicate unauthorized access
    app.states.unauthorized = true;
    return;
}

// Translate generated summary to desired language
export const translateSummary = async (lang) => {
    // Check if summary is available
    if (!app.summaryText) {
        // Update app states and error message
        app.states.error = true;
        app.error = 'Summary not found!';
        return;
    }

    // Set prompt with instructions and summary to translate
    const prompt = `Instruction: translate this content into ${lang} with correct grammar.\n\nContent: ${app.summaryText}`;
    
    // Get access token for authorization
    const accessToken = await getAccessToken();

    // If access token is available, call function to translate summary
    if (accessToken) {
        await getConversation(prompt, accessToken);
        return;
    }

    // Update app states to indicate unauthorized access
    app.states.unauthorized = true;
    return;
}