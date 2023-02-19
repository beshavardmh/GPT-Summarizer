// Copy the text content of an element with a given ID to the clipboard
const copyToClipboard = (elementID) => {
    var range = document.createRange();
    range.selectNode(document.getElementById(elementID));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
}

// Listen for a given event on the document and executes a callback when the event occurs on an element matching a given selector
const dynamicDomEvent = (event, selector, callback, toggleable = false, secondCallback = null) => {
    let clicked = false;

    document.addEventListener(event, function (e) {
        const target = e.target.closest(selector);

        if (target) {
            // If toggleable is true, the callback will toggle on and off when the element is clicked multiple times
            if (!toggleable) callback();
            else {
                if (!clicked) {
                    callback();
                    clicked = true;
                } else {
                    // An optional secondCallback can be provided for the "off" state
                    if (secondCallback) secondCallback();
                    clicked = false;
                }
            }
        }
    });
}

// Add a new stylesheet to the given document with a given link
const addStylesheet = (doc, link) => {
    const path = chrome.runtime.getURL(link),
        styleLink = document.createElement('link');

    styleLink.setAttribute('rel', 'stylesheet');
    styleLink.setAttribute('type', 'text/css');
    styleLink.setAttribute('href', path);

    doc.head.appendChild(styleLink);
}