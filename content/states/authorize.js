// Display authorization state
const showAuthorizeState = (callback) => {
    // Return if main popup not exists
    if (!document.querySelector('.gpts .gpts-content')) return;

    // Create authorize state DOM and put it inside the popup content
    const dom = `<div class="gpts-authorize">
                    <p>
                        Please login and pass Cloudflare check at
                        <br>
                        <b class="gpts-auth-link">
                            chat.openai.com
                        </b>
                    </p>
                </div>`;
    document.querySelector('.gpts .gpts-content').innerHTML = dom;

    // Add an event listener for click on ChatGPT tab link that calls a callback function
    dynamicDomEvent('click', '.gpts-auth-link', () => {
        callback();
    });
}