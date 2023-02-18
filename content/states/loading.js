const showLoadingState = () => {
    if (!document.querySelector('.gpts .gpts-content')) return;

    const dom = `<div class="gpts-loading">
                    <div class="lds-ripple">
                        <div></div>
                        <div></div>
                    </div>
                </div>`;

    document.querySelector('.gpts .gpts-content').innerHTML = dom;
}