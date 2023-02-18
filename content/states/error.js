const showErrorState = (msg) => {
    if (!document.querySelector('.gpts .gpts-content')) return;

    const dom = `<div class="gpts-error">
                    <div class="gpts-error-text">
                        <p>${msg}</p>
                    </div>
                </div>`;

    document.querySelector('.gpts .gpts-content').innerHTML = dom;
}