// Create a main popup element with icon, header, content, and footer
const createMainPopup = () => {
    // Create a div element with class name 'gpts'
    const popupDom = document.createElement('div');
    popupDom.classList.add('gpts');

    // Get the URL of icon image from extension assets
    const icon = chrome.runtime.getURL("assets/icons/icon-128.png");

    // Sets the innerHTML of the popupDom element
    popupDom.innerHTML = `<div class="gpts-head">
                                <div class="gpts-ext-logo">
                                    <img src="${icon}" width="25" alt="GPT Summarizer">

                                    <b class="gpts-ext-name">GPT Summarizer</b>
                                </div>

                                <div class="gpts-close">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M25 7L7 25" stroke="black" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M25 25L7 7" stroke="black" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            <div class="gpts-content"></div>

                            <div class="gpts-footer">
                                <a href="https://chrome.google.com/webstore/detail/gpt-summarizer/lnooklbibhjciljoigpckbeojhgoefig" target="_blank" class="gpts-rate">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path
                                            d="M16.5514 23.8416L22.8558 27.8358C23.6617 28.3464 24.6622 27.587 24.4231 26.6463L22.6016 19.481C22.5503 19.2815 22.5564 19.0715 22.6191 18.8752C22.6819 18.6789 22.7987 18.5044 22.9563 18.3715L28.6097 13.6661C29.3525 13.0478 28.9691 11.815 28.0147 11.7531L20.6318 11.2739C20.4329 11.2597 20.2422 11.1893 20.0818 11.0709C19.9214 10.9525 19.7979 10.791 19.7258 10.6051L16.9722 3.67097C16.8974 3.4737 16.7643 3.30387 16.5906 3.18403C16.417 3.06418 16.211 3 16 3C15.789 3 15.583 3.06418 15.4094 3.18403C15.2357 3.30387 15.1026 3.4737 15.0278 3.67097L12.2742 10.6051C12.2021 10.791 12.0786 10.9525 11.9182 11.0709C11.7578 11.1893 11.5671 11.2597 11.3682 11.2739L3.98525 11.7531C3.03087 11.815 2.64746 13.0478 3.3903 13.6661L9.04371 18.3715C9.20126 18.5044 9.31813 18.6789 9.38088 18.8752C9.44362 19.0715 9.4497 19.2815 9.39841 19.481L7.70918 26.126C7.42222 27.2549 8.62287 28.1661 9.58991 27.5534L15.4486 23.8416C15.6134 23.7367 15.8047 23.681 16 23.681C16.1953 23.681 16.3866 23.7367 16.5514 23.8416V23.8416Z"
                                            stroke="black" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"
                                            style="fill: #ffc107;" />
                                    </svg>

                                    <p>Rate this extension</p>
                                </a>

                                <div class="gpts-socials">
                                    <a href="https://github.com/beshavardmh/GPT-Summarizer" target="_blank" title="Github Repository">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.5 30C11.2956 30 12.0587 29.6839 12.6213 29.1213C13.1839 28.5587 13.5 27.7956 13.5 27V21"
                                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path
                                                d="M21.5 30C20.7044 30 19.9413 29.6839 19.3787 29.1213C18.8161 28.5587 18.5 27.7956 18.5 27V21"
                                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path
                                                d="M19 21H21C21.7956 21 22.5587 21.3161 23.1213 21.8787C23.6839 22.4413 24 23.2044 24 24V25C24 25.7956 24.3161 26.5587 24.8787 27.1213C25.4413 27.6839 26.2044 28 27 28"
                                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path
                                                d="M13 21H11C10.2044 21 9.44129 21.3161 8.87868 21.8787C8.31607 22.4413 8 23.2044 8 24V25C8 25.7956 7.68393 26.5587 7.12132 27.1213C6.55871 27.6839 5.79565 28 5 28"
                                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path
                                                d="M13.9781 7.99992C13.3907 7.0798 12.5808 6.32259 11.6233 5.79825C10.6658 5.27392 9.59165 4.99938 8.5 5C8.0142 5.83958 7.72284 6.7774 7.64738 7.74446C7.57192 8.71151 7.71426 9.68318 8.06395 10.588C7.37974 11.5951 7.00949 12.7825 7 14V15C7 16.5913 7.63214 18.1174 8.75736 19.2426C9.88258 20.3679 11.4087 21 13 21H19C20.5913 21 22.1174 20.3679 23.2426 19.2426C24.3679 18.1174 25 16.5913 25 15V14C24.9905 12.7825 24.6203 11.5951 23.9361 10.588C24.2857 9.68318 24.4281 8.71151 24.3526 7.74446C24.2772 6.7774 23.9858 5.83958 23.5 5C22.4083 4.99938 21.3341 5.27393 20.3766 5.79827C19.4191 6.32262 18.6093 7.07984 18.0218 7.99998L13.9781 7.99992Z"
                                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </a>
                                    
                                    <a href="https://linkedin.com/in/beshavardmh" target="_blank" title="My Linkedin">
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M26.5 4.5H5.5C4.94772 4.5 4.5 4.94772 4.5 5.5V26.5C4.5 27.0523 4.94772 27.5 5.5 27.5H26.5C27.0523 27.5 27.5 27.0523 27.5 26.5V5.5C27.5 4.94772 27.0523 4.5 26.5 4.5Z"
                                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15 14.0001V22.0001" stroke="black" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path d="M11 14.0001V22.0001" stroke="black" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path
                                                d="M15 17.5001C15 16.5719 15.3687 15.6816 16.0251 15.0252C16.6815 14.3689 17.5717 14.0001 18.5 14.0001C19.4283 14.0001 20.3185 14.3689 20.9749 15.0252C21.6313 15.6816 22 16.5719 22 17.5001V22.0001"
                                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path
                                                d="M11 11.5C11.8284 11.5 12.5 10.8284 12.5 10C12.5 9.17157 11.8284 8.5 11 8.5C10.1716 8.5 9.5 9.17157 9.5 10C9.5 10.8284 10.1716 11.5 11 11.5Z"
                                                fill="black" />
                                        </svg>
                                    </a>
                                </div>
                            </div>`;
    document.body.appendChild(popupDom);

    // Create a overlay div element and append to body
    const overlayDom = document.createElement('div');
    overlayDom.classList.add('gpts-overlay');
    document.body.appendChild(overlayDom);

    // Handle the close popup action when click on "X" icon
    dynamicDomEvent('click', '.gpts-close', () => {
        displayMainPopup(false);
    });

    // Handle the close popup action when click on overlay element
    dynamicDomEvent('click', '.gpts-overlay', () => {
        displayMainPopup(false);
    });
}

// Toggle display main popup with overlay
const displayMainPopup = (show = true) => {
    const popup = document.querySelector('.gpts');
    const overlay = document.querySelector('.gpts-overlay');

    if (show) {
        if (popup.classList.contains('gpts-hidden')) popup.classList.remove('gpts-hidden');
        if (overlay.classList.contains('gpts-hidden')) overlay.classList.remove('gpts-hidden');
    } else {
        if (!popup.classList.contains('gpts-hidden')) popup.classList.add('gpts-hidden');
        if (!overlay.classList.contains('gpts-hidden')) overlay.classList.add('gpts-hidden');
    }
}