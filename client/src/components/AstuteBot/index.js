/* eslint-disable max-len */
import {Component} from 'react';

export default class AstuteBox extends Component {
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
                toggleChatMarkup: 'Need Help?',
                titleMarkup: 'Blue Diamond Help',
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
                    '.AstuteBotLauncher .ToggleChat { float: right; margin-right: 100px; background-color: #2c7fb9; color: #fff; padding: 0 20px; font-family: "brandon-grotesque", sans-serif; font-weight: 400; font-size: 16px; height: 40px; line-height: 40px; } '  +
                    'div.AstuteBotLauncher .ChatTitleBar { background-color: #2c7fb9; height: 40px; line-height: 40px;} ' +
                    'div.AstuteBotLauncher .ChatTitleBar .TitleText { font-family: "brandon-grotesque", sans-serif; font-weight: 400; font-size: 16px; margin-left: 10px} ' +
                    'div.AstuteBotLauncher .ChatTitleBar .MinMaxChat { margin-right: 20px} ',

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
