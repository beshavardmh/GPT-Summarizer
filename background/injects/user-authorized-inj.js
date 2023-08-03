port = chrome.runtime.connect({name: "CHATGPT"});

const returnContentTab = () => {
    port.postMessage({ type: 'RETURN_CONTENT_TAB' });
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

const style = document.createElement('style');
style.innerHTML = `.gpts-user-authorized {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 100vw;
                            height: 100vh;
                            background-color: rgba(0, 0, 0, 0.6);
                            position: fixed;
                            z-index: 99999;
                            top: 0;
                            left: 0;
                        }

                        .gpts-user-authorized-dialog {
                            background-color: white;
                            padding: 20px;
                            font-size: 15px;
                            line-height: 1.6;
                            border-radius: 13px;
                            max-width: 300px;
                            font-family: sans-serif;
                            text-align: center;
                        }

                        .gpts-user-authorized-dialog svg{
                            display: inline-block;
                        }

                        .gpts-user-authorized-dialog b{
                            font-size: 20px;
                            margin-bottom: 10px;
                            display: block;
                        }

                        .gpts-user-authorized-dialog p {
                            margin: 0;
                        }

                        .gpts-user-authorized-dialog span {
                            color: #974bea;
                            text-decoration: underline;
                            cursor: pointer;
                        }

                        @-webkit-keyframes checkmark {
                            0% {
                                stroke-dashoffset: 50px
                            }

                            100% {
                                stroke-dashoffset: 0
                            }
                        }

                        @-ms-keyframes checkmark {
                            0% {
                                stroke-dashoffset: 50px
                            }

                            100% {
                                stroke-dashoffset: 0
                            }
                        }

                        @keyframes checkmark {
                            0% {
                                stroke-dashoffset: 50px
                            }

                            100% {
                                stroke-dashoffset: 0
                            }
                        }

                        @-webkit-keyframes checkmark-circle {
                            0% {
                                stroke-dashoffset: 240px
                            }

                            100% {
                                stroke-dashoffset: 480px
                            }
                        }

                        @-ms-keyframes checkmark-circle {
                            0% {
                                stroke-dashoffset: 240px
                            }

                            100% {
                                stroke-dashoffset: 480px
                            }
                        }

                        @keyframes checkmark-circle {
                            0% {
                                stroke-dashoffset: 240px
                            }

                            100% {
                                stroke-dashoffset: 480px
                            }
                        }

                        .icon--order-success svg path {
                            -webkit-animation: checkmark 0.25s ease-in-out 0.7s backwards;
                            animation: checkmark 0.25s ease-in-out 0.7s backwards;
                            -webkit-animation-delay: 1.6s;
                            animation-delay: 1.6s;
                        }

                        .icon--order-success svg circle {
                            -webkit-animation: checkmark-circle 0.6s ease-in-out backwards;
                            animation: checkmark-circle 0.6s ease-in-out backwards;
                            -webkit-animation-delay: .6s;
                            animation-delay: .6s;
                        }`;
document.head.appendChild(style);

const container = document.createElement('div');
container.classList.add('gpts-user-authorized');
container.innerHTML = `<div class="gpts-user-authorized-dialog">
                                <div class="icon icon--order-success svg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="72px" height="72px">
                                        <g fill="none" stroke="#8EC343" stroke-width="3">
                                            <circle cx="36" cy="36" r="33" style="stroke-dasharray:240px, 240px; stroke-dashoffset: 480px;">
                                            </circle>
                                            <path d="M17.417,37.778l9.93,9.909l25.444-25.393"
                                                style="stroke-dasharray:50px, 50px; stroke-dashoffset: 0px;"></path>
                                        </g>
                                    </svg>

                                </div>
                                <b>Authorization successful</b>
                                <p>please don't close this page and reutrn to the <span class="gpts-return-page">previous page</span>.
                                </p>
                            </div>`;
document.body.appendChild(container);

dynamicDomEvent('click', '.gpts-return-page', () => {
    returnContentTab();
});

port.postMessage({ type: 'GET_ACCESS_TOKEN' });