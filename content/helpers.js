const copyToClipboard = (elementID) => {
    var range = document.createRange();
    range.selectNode(document.getElementById(elementID));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
}

const dynamicDomEvent = (event, selector, callback, toggleable = false, secondCallback = null) => {
    let clicked = false;

    document.addEventListener(event, function (e) {
        const target = e.target.closest(selector);

        if (target) {
            if (!toggleable) callback();
            else {
                if (!clicked) {
                    callback();
                    clicked = true;
                } else {
                    if (secondCallback) secondCallback();
                    clicked = false;
                }
            }
        }
    });
}

const addStylesheet = (doc, link) => {
    const path = chrome.runtime.getURL(link),
        styleLink = document.createElement('link');

    styleLink.setAttribute('rel', 'stylesheet');
    styleLink.setAttribute('type', 'text/css');
    styleLink.setAttribute('href', path);

    doc.head.appendChild(styleLink);
}