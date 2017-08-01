/* global REDUX_DEVTOOLS ANALYTICS_ID */

// The polyfill will emulate a full ES6 environment (for old browsers)
// (including generators, which means async/await)
import 'babel-polyfill';
import ReactGA from 'react-ga';
import {render} from 'react-isomorphic-render';
import {mediaQueryTracker} from 'redux-mediaquery';

import settings from './react-isomorphic-render';
import env from 'tools/env';

require('../assets/styles/style.css');

ReactGA.initialize(ANALYTICS_ID, {
    debug: env.development
});
ReactGA.plugin.require('ec');

// renders the webpage on the client side
render(settings, {
    // enable/disable Redux dev-tools
    // eslint-disable-next-line no-undefined
    devtools: REDUX_DEVTOOLS ? require('./devtools').default : undefined,

    onNavigate: (url) => {
        // This is a bit of a hack to ensure that the pageview doesn't fire until
        // after other data is collected (such as ecomm data) that needs to be sent
        // at the same time.
        setTimeout(() => {
            ReactGA.set({page: url});
            ReactGA.pageview(url);
        }, 1000);
    }
})
.then(({store, rerender}) => {
    mediaQueryTracker({
        large: '(min-width: 1025px)',
        medium: '(max-width: 1024px)',
        small: '(max-width: 768px)',
        xsmall: '(max-width: 520px)',
        innerWidth: true,
        innerHeight: true
    })(store.dispatch);

    if(module.hot) {
        module.hot.accept('./react-isomorphic-render', () => {
            store.hotReload(settings.reducer);
            rerender();
        });
    }
});
