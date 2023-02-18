import {app} from './app.js';
import { GPT3BrowserTokenizer } from "./gpt3-tokenizer.js";

export const generateOverview = async (contentObj) => {
    if (!contentObj || !contentObj.textContent || !contentObj.title) {
        app.states.error = true;
        app.error = 'Unfortunately, the content of this page cannot be identified!';
        return;
    }

    const tokenizer = new GPT3BrowserTokenizer({ type: 'gpt3' });
    let content = `${contentObj.title}\n${contentObj.textContent}`;
    content = content.trim().replace(/[\t\n]+/g, '\n');
    const contentWords = content.split(' ').length;
    const contentReadingTime = Math.floor((contentWords / 220) * 2) / 2;

    const encodedContent = tokenizer.encode(content);
    const trimmedBpe = encodedContent.bpe.length > 2000 ? encodedContent.bpe.slice(0, 2000) : encodedContent.bpe;

    app.pageContentText = tokenizer.decode(trimmedBpe) + '...';

    app.states.overview = true;

    return { overviewTime: contentReadingTime, overviewWords: contentWords };
}