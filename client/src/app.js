/* global REDUX_DEVTOOLS */

// The polyfill will emulate a full ES6 environment (for old browsers)
// (including generators, which means async/await)
import 'babel-polyfill';
import {render} from 'react-isomorphic-render';
import {mediaQueryTracker} from 'redux-mediaquery';

import settings from './react-isomorphic-render';

require('../assets/styles/style.css');

// renders the webpage on the client side
render(settings, {
    // enable/disable Redux dev-tools
    // eslint-disable-next-line no-undefined
    devtools: REDUX_DEVTOOLS ? require('./devtools').default : undefined,

    onNavigate: () => {
        // This is a bit of a hack to ensure that the pageview doesn't fire until
        // after other data is collected (such as ecomm data) that needs to be sent
        // at the same time.
        if(typeof window !== 'undefined' && window.google_tag_manager)
            window.google_tag_manager['GTM-PLGLCKN'].dataLayer.reset();
    }
})
.then(({store, rerender}) => {
    mediaQueryTracker({
        xlarge: '(min-width: 1441px)',
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
