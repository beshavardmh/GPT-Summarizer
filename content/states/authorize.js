const showAuthorizeState = (callback) => {
    if (!document.querySelector('.gpts .gpts-content')) return;

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

    dynamicDomEvent('click', '.gpts-auth-link', () => {
        callback();
    });
}