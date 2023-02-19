// Display error state
const showErrorState = (msg) => {
    // Return if main popup not exists
    if (!document.querySelector('.gpts .gpts-content')) return;

    // Create error state DOM and put it inside the popup content
    const dom = `<div class="gpts-error">
                    <div class="gpts-error-text">
                        <p>${msg}</p>
                    </div>
                </div>`;
    document.querySelector('.gpts .gpts-content').innerHTML = dom;
}