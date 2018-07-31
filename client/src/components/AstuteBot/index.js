/* eslint-disable max-len */
import {Component} from 'react';

import AstuteLauncher from 'images/astute-launcher.png';
import BDIcon from 'images/icon.png';

export default class AstuteBot extends Component {
    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://www.astutebot.com/chat/script/AstuteBotLauncher-1.0.0.min.js';

        const launcher = document.createElement('script');
        const launcherText = document.createTextNode(`
            astuteBotLauncher.init({
                secondsBeforeDisplaying: 2,
                chatInitiallyVisible: false,
                fullScreenMobile: true,
                hideLauncherButtonWhenChatVisible: true,
                autoGetStarted: true,
                persistConversationAcrossSession: false,
                replyHeightPixels: 50,
                toggleChatMarkup: '<img src="${AstuteLauncher}" style="height: 70px;" />',
                titleMarkup: '<img src="${BDIcon}" style="margin-right: 6px;" /> Chatting with Blue Diamond',
                initialContext: JSON.stringify([
                    {
                        userInfo: {
                            language: 'en'
                        },
                    }
                ]),
                customCss:
                    '@import url("https://use.typekit.net/pru3xpz.css");' +
                    '.AstuteBotLauncher { position: fixed; bottom: 0px; right: 20px;} ' +
                    '.AstuteBotLauncher .ToggleChat { float: right; margin-bottom: 30px; color: #2b3b48; padding: 0 20px; font-family: "brandon-grotesque", sans-serif; font-weight: 400; font-size: 16px; height: 40px; line-height: 40px; } '  +
                    'div.AstuteBotLauncher .ChatTitleBar { background-color: #fdbb30; color: #2b3b48; height: 40px; line-height: 40px;} ' +
                    'div.AstuteBotLauncher .ChatTitleBar .TitleText { font-family: "brandon-grotesque", sans-serif; font-weight: 400; font-size: 16px; margin-left: 10px; display: inline-flex; align-items: center; } ' +
                    'div.AstuteBotLauncher .ChatTitleBar .MinMaxChat { margin-right: 20px; }',

                botUrl: 'https://www.astutebot.com/chat/index.aspx?aid=QiGxMOTLTz2a4sfhRdS%2BDA%3D%3D'
            });
        `);
        launcher.appendChild(launcherText);

        document.body.appendChild(script);
        script.onload = () => {
            document.body.appendChild(launcher);
        };
    }

    render() {
        return null;
    }
}
