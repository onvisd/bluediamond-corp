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
    devtools: REDUX_DEVTOOLS ? require('./devtools').default : undefined
})
.then(({store, rerender}) => {
    mediaQueryTracker({
        large: '(min-width: 1025px)',
        medium: '(max-width: 1024px)',
        small: '(max-width: 768px)',
        xsmall: '(max-width: 375px)',
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
