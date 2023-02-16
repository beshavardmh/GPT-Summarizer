const createMainPopup = () => {
    const popupDom = document.createElement('div');
    popupDom.classList.add('gpts');
    const icon = chrome.runtime.getURL("assets/icons/icon-128.png");
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
                                <a href="#" class="gpts-rate">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                        <path
                                            d="M16.5514 23.8416L22.8558 27.8358C23.6617 28.3464 24.6622 27.587 24.4231 26.6463L22.6016 19.481C22.5503 19.2815 22.5564 19.0715 22.6191 18.8752C22.6819 18.6789 22.7987 18.5044 22.9563 18.3715L28.6097 13.6661C29.3525 13.0478 28.9691 11.815 28.0147 11.7531L20.6318 11.2739C20.4329 11.2597 20.2422 11.1893 20.0818 11.0709C19.9214 10.9525 19.7979 10.791 19.7258 10.6051L16.9722 3.67097C16.8974 3.4737 16.7643 3.30387 16.5906 3.18403C16.417 3.06418 16.211 3 16 3C15.789 3 15.583 3.06418 15.4094 3.18403C15.2357 3.30387 15.1026 3.4737 15.0278 3.67097L12.2742 10.6051C12.2021 10.791 12.0786 10.9525 11.9182 11.0709C11.7578 11.1893 11.5671 11.2597 11.3682 11.2739L3.98525 11.7531C3.03087 11.815 2.64746 13.0478 3.3903 13.6661L9.04371 18.3715C9.20126 18.5044 9.31813 18.6789 9.38088 18.8752C9.44362 19.0715 9.4497 19.2815 9.39841 19.481L7.70918 26.126C7.42222 27.2549 8.62287 28.1661 9.58991 27.5534L15.4486 23.8416C15.6134 23.7367 15.8047 23.681 16 23.681C16.1953 23.681 16.3866 23.7367 16.5514 23.8416V23.8416Z"
                                            stroke="black" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"
                                            style="fill: #ffc107;" />
                                    </svg>

                                    <p>Rate this extension</p>
                                </a>

                                <div class="gpts-socials">
                                    <a href="#" target="_blank" title="My Linkedin">
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

                                    <a href="#" target="_blank" title="Github Repository">
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
                                </div>
                            </div>`;
    document.body.appendChild(popupDom);

    const overlayDom = document.createElement('div');
    overlayDom.classList.add('gpts-overlay');
    document.body.appendChild(overlayDom);

    dynamicDomEvent('click', '.gpts-close', () => {
        displayMainPopup(false);
    });

    dynamicDomEvent('click', '.gpts-overlay', () => {
        displayMainPopup(false);
    });
}

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

const showErrorState = (msg) => {
    if (!document.querySelector('.gpts .gpts-content')) return;

    const dom = `<div class="gpts-error">
                    <div class="gpts-error-text">
                        <p>${msg}</p>
                    </div>
                </div>`;

    document.querySelector('.gpts .gpts-content').innerHTML = dom;
}

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

const showOverviewState = (time, words, callback) => {
    if (!document.querySelector('.gpts .gpts-content')) return;

    const dom = `<div class="gpts-overview">
                    <p>
                        The content of this page is: <b>${time} min (about ${words} words)</b>.
                    </p>
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

    dynamicDomEvent('click', '.gpts-generate-btn', () => {
        callback();
    });
}

const showSummaryState = (response) => {
    if (!document.querySelector('.gpts .gpts-content')) return;

    const dom = `<div class="gpts-summary">
                    <div class="gpts-summary-text" id="gpts-summary-text">${response}</div>
                </div>`;

    document.querySelector('.gpts .gpts-content').innerHTML = dom;
}

const showSummaryOptions = (translateCallback, regenerateCallback) => {
    if (!document.querySelector('.gpts .gpts-content .gpts-summary')) return;

    const dom = `<div class="gpts-summary-options"> 
                    <div class="gpts-summary-option gpts-summary-option-copy" title="Copy">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.9992 22.9994V4.99924H8.99829" stroke="black" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M22.999 8.99939H4.99829V26.9994H22.999V8.99939Z" stroke="black" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <div class="gpts-summary-option gpts-summary-option-speech" title="Speech">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M27.3602 9.63599C28.196 10.4717 28.8589 11.4639 29.3112 12.5558C29.7635 13.6477 29.9963 14.8181 29.9963 15.9999C29.9963 17.1818 29.7635 18.3522 29.3112 19.4441C28.8589 20.536 28.196 21.5282 27.3602 22.3639"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M10 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V12C3 11.7348 3.10536 11.4804 3.29289 11.2929C3.48043 11.1054 3.73478 11 4 11H10L19 4V28L10 21Z"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10 11V21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M23.8247 13.1716C24.1961 13.5431 24.4908 13.984 24.6918 14.4693C24.8928 14.9546 24.9963 15.4748 24.9963 16.0001C24.9963 16.5253 24.8928 17.0455 24.6918 17.5308C24.4908 18.0161 24.1961 18.4571 23.8247 18.8285"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <div class="gpts-summary-option gpts-summary-option-translate" title="Translate">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M29 27L22 13L15 27" stroke="black" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M17 23H27" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11 4V7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M3 7H19" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15 7C15 10.1826 13.7357 13.2348 11.4853 15.4853C9.23484 17.7357 6.1826 19 3 19" stroke="black"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M7.68359 11.0001C8.51222 13.3388 10.0451 15.3634 12.0715 16.7952C14.0979 18.227 16.5181 18.9958 18.9993 18.9958"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <div class="gpts-summary-option gpts-summary-option-regenerate" title="Regenerate">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.97913 12.4645H3.97913V6.46448" stroke="black" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path
                                d="M23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5C14.5555 5 13.1251 5.28452 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183L3.97919 12.4645"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22.0209 19.5355H28.0209V25.5355" stroke="black" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path
                                d="M8.2218 23.7782C9.24325 24.7996 10.4559 25.6099 11.7905 26.1627C13.125 26.7155 14.5554 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782L28.0208 19.5355"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>

                <div class="gpts-summary-options-action"></div>`;

    document.querySelector('.gpts .gpts-content .gpts-summary').insertAdjacentHTML('beforeend', dom);

    copyOptionAction();
    speechOptionAction();
    translateOptionAction(translateCallback);
    regenerateOptionAction(regenerateCallback);
}

const copyOptionAction = () => {
    const actionDom = `<div class="gpts-summary-options-action-copy">
                            The summary text was copied!
                        </div>`;

    dynamicDomEvent('click', '.gpts-summary-option-copy', () => {
        document.querySelector('.gpts-summary-options-action').innerHTML = actionDom;
        document.querySelector('.gpts-content').scrollTop = document.querySelector('.gpts-content').scrollHeight;
        copyToClipboard('gpts-summary-text');
    });
}

const speechOptionAction = () => {
    const browserNotSupportDom = `<div class="gpts-summary-options-action-copy">
                                        Your browser doesn't support text to speech!
                                    </div>`;
    const textErrorDom = `<div class="gpts-summary-options-action-copy">
                                Speech is not available for this summary!
                            </div>`;

    let msg = null;

    if ('speechSynthesis' in window) {
        msg = new SpeechSynthesisUtterance();
    }

    dynamicDomEvent('click', '.gpts-summary-option-speech', () => {
        const text = document.querySelector('.gpts-summary-text').innerText;
        if (msg && text) {
            msg.text = text;
            msg.rate = .7;
            setTimeout(() => {
                const voices = window.speechSynthesis.getVoices();
                if (voices.length === 0) {
                    document.querySelector('.gpts-content').scrollTop = document.querySelector('.gpts-content').scrollHeight;
                    document.querySelector('.gpts-summary-options-action').innerHTML = textErrorDom;
                }
            }, 10);
            window.speechSynthesis.speak(msg);
        } else {
            document.querySelector('.gpts-content').scrollTop = document.querySelector('.gpts-content').scrollHeight;
            document.querySelector('.gpts-summary-options-action').innerHTML = browserNotSupportDom;
        }
    }, true, () => {
        if (msg) {
            window.speechSynthesis.cancel(msg);
        }
        document.querySelector('.gpts-summary-options-action').innerHTML = null;
    });
}

const translateOptionAction = (translateCallback) => {
    const actionDom = `<div class="gpts-summary-options-action-translate">
                            <select>
                                <option value="">Language: </option>
                                <option value="Afrikaans">Afrikaans</option>
                                <option value="Albanian">Albanian</option>
                                <option value="Arabic">Arabic</option>
                                <option value="Armenian">Armenian</option>
                                <option value="Basque">Basque</option>
                                <option value="Bengali">Bengali</option>
                                <option value="Bulgarian">Bulgarian</option>
                                <option value="Catalan">Catalan</option>
                                <option value="Cambodian">Cambodian</option>
                                <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                                <option value="Croatian">Croatian</option>
                                <option value="Czech">Czech</option>
                                <option value="Danish">Danish</option>
                                <option value="Dutch">Dutch</option>
                                <option value="English">English</option>
                                <option value="Estonian">Estonian</option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finnish">Finnish</option>
                                <option value="French">French</option>
                                <option value="Georgian">Georgian</option>
                                <option value="German">German</option>
                                <option value="Greek">Greek</option>
                                <option value="Gujarati">Gujarati</option>
                                <option value="Hebrew">Hebrew</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Hungarian">Hungarian</option>
                                <option value="Icelandic">Icelandic</option>
                                <option value="Indonesian">Indonesian</option>
                                <option value="Irish">Irish</option>
                                <option value="Italian">Italian</option>
                                <option value="Japanese">Japanese</option>
                                <option value="Javanese">Javanese</option>
                                <option value="Korean">Korean</option>
                                <option value="Latin">Latin</option>
                                <option value="Latvian">Latvian</option>
                                <option value="Lithuanian">Lithuanian</option>
                                <option value="Macedonian">Macedonian</option>
                                <option value="Malay">Malay</option>
                                <option value="Malayalam">Malayalam</option>
                                <option value="Maltese">Maltese</option>
                                <option value="Maori">Maori</option>
                                <option value="Marathi">Marathi</option>
                                <option value="Mongolian">Mongolian</option>
                                <option value="Nepali">Nepali</option>
                                <option value="Norwegian">Norwegian</option>
                                <option value="Persian">Persian</option>
                                <option value="Polish">Polish</option>
                                <option value="Portuguese">Portuguese</option>
                                <option value="Punjabi">Punjabi</option>
                                <option value="Quechua">Quechua</option>
                                <option value="Romanian">Romanian</option>
                                <option value="Russian">Russian</option>
                                <option value="Samoan">Samoan</option>
                                <option value="Serbian">Serbian</option>
                                <option value="Slovak">Slovak</option>
                                <option value="Slovenian">Slovenian</option>
                                <option value="Spanish">Spanish</option>
                                <option value="Swahili">Swahili</option>
                                <option value="Swedish ">Swedish </option>
                                <option value="Tamil">Tamil</option>
                                <option value="Tatar">Tatar</option>
                                <option value="Telugu">Telugu</option>
                                <option value="Thai">Thai</option>
                                <option value="Tibetan">Tibetan</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Turkish">Turkish</option>
                                <option value="Ukrainian">Ukrainian</option>
                                <option value="Urdu">Urdu</option>
                                <option value="Uzbek">Uzbek</option>
                                <option value="Vietnamese">Vietnamese</option>
                                <option value="Welsh">Welsh</option>
                                <option value="Xhosa">Xhosa</option>
                            </select>
                            <div class="gpts-summary-options-action-translate-submit disabled">
                                <svg style="width: 18px;" width="32" height="32" viewBox="0 0 32 32" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 16H27" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M18 7L27 16L18 25" stroke="white" stroke-width="3" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>`;

    dynamicDomEvent('click', '.gpts-summary-option-translate', () => {
        document.querySelector('.gpts-summary-options-action').innerHTML = actionDom;
        document.querySelector('.gpts-content').scrollTop = document.querySelector('.gpts-content').scrollHeight;

        dynamicDomEvent('change', '.gpts-summary-options-action-translate select', () => {
            const select = document.querySelector('.gpts-summary-options-action-translate select');
            const submitBtn = document.querySelector('.gpts-summary-options-action-translate-submit');

            if (select.value !== '') {
                submitBtn.classList.remove('disabled');
            }
            else {
                submitBtn.classList.add('disabled');
            }
        });

        dynamicDomEvent('click', '.gpts-summary-options-action-translate-submit:not(.disabled)', () => {
            const select = document.querySelector('.gpts-summary-options-action-translate select');
            translateCallback(select.value);
        });
    }, true, () => {
        document.querySelector('.gpts-summary-options-action').innerHTML = null;
    });
}

const regenerateOptionAction = (regenerateCallback) => {
    dynamicDomEvent('click', '.gpts-summary-option-regenerate', () => {
        regenerateCallback();
    });
}

const getPageContent = () => {
    const documentClone = document.cloneNode(true);
    const article = new Readability(documentClone).parse();

    return article;
}

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

const sleep = (ms) => {
    return new Promise(res => setTimeout(res, ms));
}

const addStylesheet = (doc, link) => {
    const path = chrome.runtime.getURL(link),
        styleLink = document.createElement('link');

    styleLink.setAttribute('rel', 'stylesheet');
    styleLink.setAttribute('type', 'text/css');
    styleLink.setAttribute('href', path);

    doc.head.appendChild(styleLink);
}

const run = async () => {
    addStylesheet(document, 'assets/css/main.css');
    createMainPopup();
    showLoadingState();
}

run();

const port = chrome.runtime.connect();

port.postMessage({ type: 'GET_ACCESS_TOKEN' });

port.onMessage.addListener(async (state) => {
    switch (state.type) {
        case 'UNAUTHORIZED':
            showAuthorizeState(() => {
                port.postMessage({ type: 'OPEN_AUTHORIZE_TAB' });
            });
            break;
        case 'AUTHORIZED':
            showLoadingState();
            port.postMessage({ type: 'GENERATE_OVERVIEW', props: { content: getPageContent() } });
            break;
        case 'OVERVIEW':
            showOverviewState(state.props.time, state.props.words, () => {
                port.postMessage({ type: 'GENERATE_SUMMARY' });
                showLoadingState();
            });
            break;
        case 'ERROR':
            showErrorState('Error: ' + state.props.error);
            break;
        case 'SUMMARY_ONMESSAGE':
            showSummaryState(state.props.text);
            break;
        case 'SUMMARY_DONE':
            showSummaryOptions((lang) => {
                port.postMessage({ type: 'TRANSLATE_SUMMARY', props: { lang: lang } });
                showLoadingState();
            }, () => {
                port.postMessage({ type: 'GENERATE_SUMMARY' });
                showLoadingState();
            });
            break;
    }
});

chrome.runtime.onMessage.addListener(async (action) => {
    if (action == 'DISPLAY_POPUP') {
        displayMainPopup();
    }
}
);