// Display summary state
const showSummaryState = (response) => {
    // Return if main popup not exists
    if (!document.querySelector('.gpts .gpts-content')) return;

    response = response.replace(/'(.*?)'/g, "**$1**");

    var mdResponse = marked.parse(response);


    // Create summary state DOM and put it inside the popup content
    const dom = `<div class="gpts-summary">
                    <div class="gpts-summary-text" id="gpts-summary-text">${mdResponse}</div>
                </div>`;
    document.querySelector('.gpts .gpts-content').innerHTML = dom;
}

// Display summary options after summary is completed
const showSummaryOptions = (translateCallback, regenerateCallback) => {
    // Return if summary not exists
    if (!document.querySelector('.gpts .gpts-content .gpts-summary')) return;

    // Create summary options DOM and append it to the popup content
    const dom = `<div class="gpts-summary-options"> 
                    <div class="gpts-summary-option gpts-summary-option-copy" title="Copy">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.9992 22.9994V4.99924H8.99829" stroke="black" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M22.999 8.99939H4.99829V26.9994H22.999V8.99939Z" stroke="black" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <div class="gpts-summary-option gpts-summary-option-speech" title="Speak">
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

    // Handle options actions
    copyOptionAction();
    speechOptionAction();
    translateOptionAction(translateCallback);
    regenerateOptionAction(regenerateCallback);
}

// The following function is responsible for copying the summary text to the clipboard when the copy button is clicked
const copyOptionAction = () => {
    // Creating an HTML element with the message to be displayed when the text is copied
    const actionDom = `<div class="gpts-summary-options-action-copy">
                            The summary text was copied!
                        </div>`;

    // Adding a click event to the copy button, copying the text to clipboard, and displaying the message
    dynamicDomEvent('click', '.gpts-summary-option-copy', () => {
        document.querySelector('.gpts-summary-options-action').innerHTML = actionDom;
        document.querySelector('.gpts-content').scrollTop = document.querySelector('.gpts-content').scrollHeight;
        copyToClipboard('gpts-summary-text');
    });
}

// The following function is responsible for speaking the summary text when the speech button is clicked
const speechOptionAction = () => {
    // Creating HTML elements with messages to be displayed when the browser doesn't support text to speech, and when speech is not available for the summary text
    const browserNotSupportDom = `<div class="gpts-summary-options-action-copy">
                                        Your browser doesn't support text to speech!
                                    </div>`;
    const textErrorDom = `<div class="gpts-summary-options-action-copy">
                                Speech is not available for this summary!
                            </div>`;

    let msg = null;

    // Checking if the browser supports text to speech
    if ('speechSynthesis' in window) {
        msg = new SpeechSynthesisUtterance();
    }

    // Adding a click event to the speech button, checking if speech is supported, and speaking the summary text
    dynamicDomEvent('click', '.gpts-summary-option-speech', () => {
        const text = document.querySelector('.gpts-summary-text').innerText;
        if (msg && text) {
            msg.text = text;
            msg.rate = .7;
            setTimeout(() => {
                const voices = window.speechSynthesis.getVoices();
                // Checking if speech is not available for the summary text
                if (voices.length === 0) {
                    document.querySelector('.gpts-content').scrollTop = document.querySelector('.gpts-content').scrollHeight;
                    document.querySelector('.gpts-summary-options-action').innerHTML = textErrorDom;
                }
            }, 10);
            window.speechSynthesis.speak(msg);
        } else {
            // Displaying a message if the browser doesn't support text to speech
            document.querySelector('.gpts-content').scrollTop = document.querySelector('.gpts-content').scrollHeight;
            document.querySelector('.gpts-summary-options-action').innerHTML = browserNotSupportDom;
        }
    }, true, () => {
        // Cancelling speech when the speech button is clicked again, or the options menu is closed
        if (msg) {
            window.speechSynthesis.cancel(msg);
        }
        document.querySelector('.gpts-summary-options-action').innerHTML = null;
    });
}

// The following function is responsible for translating the summary text when the translate button is clicked
const translateOptionAction = (translateCallback) => {
    // Creating an HTML element with the options to select the language and the submit button
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

    // This event listener is added to the "Translate" button. When it's clicked, the actionDom is added to the page and a change event listener is added to the select dropdown
    dynamicDomEvent('click', '.gpts-summary-option-translate', () => {
        document.querySelector('.gpts-summary-options-action').innerHTML = actionDom;
        document.querySelector('.gpts-content').scrollTop = document.querySelector('.gpts-content').scrollHeight;

        // This event listener is added to the select dropdown. When it's changed, the submit button is enabled if a language is selected
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

        // This event listener is added to the submit button. When it's clicked and a language is selected, the callback function is executed with the selected language
        dynamicDomEvent('click', '.gpts-summary-options-action-translate-submit:not(.disabled)', () => {
            const select = document.querySelector('.gpts-summary-options-action-translate select');
            translateCallback(select.value);
        });
    }, true, () => {
        document.querySelector('.gpts-summary-options-action').innerHTML = null;
    });
}

// The following function is responsible for regenerating the summary text when the regenerate button is clicked
const regenerateOptionAction = (regenerateCallback) => {
    // This event listener is added to the "Regenerate" button. When it's clicked, the callback function is executed
    dynamicDomEvent('click', '.gpts-summary-option-regenerate', () => {
        regenerateCallback();
    });
}