// Display overview state
const showOverviewState = (time, words, callback) => {
    // Return if main popup not exists
    if (!document.querySelector('.gpts .gpts-content')) return;

    // Create overview state DOM and put it inside the popup content
    const dom = `<div class="gpts-overview">
                    <p>
                        The content of this page is: <b>${time} min (about ${words} words)</b>.
                    </p>
                    <div class="gpts-summary-mode">
                        <p>Summary Mode: </p>
                        <select id="gpts-summary-mode">
                            <option value="general">General</option>
                            <option value="bullet">Bullet-Points</option>
                        </select>
                    </div>
                    <div class="gpts-generate-btn">
                        Summarize
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27 16V22" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M24 19H30" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10.5 5V10" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8 7.5H13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21 23V27" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19 25H23" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path style="stroke: #974bea;"
                                d="M23.2929 4.70711L4.70711 23.2929C4.31658 23.6834 4.31658 24.3166 4.70711 24.7071L7.29289 27.2929C7.68342 27.6834 8.31658 27.6834 8.70711 27.2929L27.2929 8.70711C27.6834 8.31658 27.6834 7.68342 27.2929 7.29289L24.7071 4.70711C24.3166 4.31658 23.6834 4.31658 23.2929 4.70711Z"
                                stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                            <path style="stroke: #974bea;" d="M18 10L22 14" stroke="black" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>`;
    document.querySelector('.gpts .gpts-content').innerHTML = dom;

    // Add an event listener for click on summarize button that calls a callback function
    dynamicDomEvent('click', '.gpts-generate-btn', () => {
        const summaryMode = document.getElementById('gpts-summary-mode').value;

        callback(summaryMode);
    });
}

// Get page content instance with Readability package
const getPageContent = () => {
    const documentClone = document.cloneNode(true);
    const article = new Readability(documentClone).parse();

    return article;
}