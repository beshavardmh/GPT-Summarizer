import { app } from './app.js';
import { GPT3BrowserTokenizer } from "./gpt3-tokenizer.js";

// Define a function that generates an overview of the page content
export const generateOverview = async (contentObj) => {
    // Check if the content object has required properties
    if (!contentObj || !contentObj.textContent || !contentObj.title || !contentObj.lang) {
        // Set error state and message in the app module if content object is invalid
        app.states.error = true;
        app.error = 'Unfortunately, the content of this page cannot be identified!';
        return;
    }

    // Create a new instance of the GPT3BrowserTokenizer class
    const tokenizer = new GPT3BrowserTokenizer({ type: 'gpt3' });

    // Combine the content title and text, remove any leading/trailing white spaces and replace any tab/spaces with newline character
    let content = `${contentObj.title}\n${contentObj.textContent}`;
    content = content.trim().replace(/[\t\n]+/g, '\n');

    // Count the number of words in the content, calculate the reading time based on average reading speed and return an object with both values
    const contentWords = content.split(' ').length;
    const contentReadingTime = Math.floor((contentWords / 220) * 2) / 2;

    // Encode the content using the tokenizer, trim the encoded result if it exceeds 2000 bytes, and decode the result back to text
    const encodedContent = tokenizer.encode(content);
    const trimmedBpe = encodedContent.bpe.length > 2000 ? encodedContent.bpe.slice(0, 2000) : encodedContent.bpe;
    app.pageContentText = tokenizer.decode(trimmedBpe) + '...';

    // Set the content language in the app module
    app.pageContentLang = contentObj.lang;

    // Set the overview state to true in the app module
    app.states.overview = true;

    // Return an object containing the overview reading time and word count
    return { overviewTime: contentReadingTime, overviewWords: contentWords };
}