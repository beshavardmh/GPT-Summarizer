// Display loading state
const showLoadingState = () => {
    // Return if main popup not exists
    if (!document.querySelector('.gpts .gpts-content')) return;

    // Create loading state DOM and put it inside the popup content
    const dom = `<div class="gpts-loading">
                    <div class="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>`;
    document.querySelector('.gpts .gpts-content').innerHTML = dom;
}