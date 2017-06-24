requestAnimationFrame = requestAnimationFrame.bind(window); // eslint-disable-line

// use bluebird for Promises
require('babel-runtime/core-js/promise').default = require('bluebird');

const bluebirdOptions = {
  // Enable cancellation
    cancellation: true
};

if(process.env.NODE_ENV !== 'production') {
    // Enable warnings
    bluebirdOptions.warnings = true;

    // Enable long stack traces
    bluebirdOptions.longStackTraces = true;

    // Enable monitoring
    bluebirdOptions.monitoring = true;
}

require('bluebird').config(bluebirdOptions);

/**
 * Warning from React Router, caused by react-hot-loader.
 * The warning can be safely ignored, so filter it from the console.
 * Otherwise you'll see it every time something changes.
 * See https://github.com/gaearon/react-hot-loader/issues/298
 */
if(module.hot) {
    const isString = (a) => typeof a === 'string';
    const orgError = console.error;
    console.error = (...args) => {
        if(
            args &&
            args.length === 1 &&
            isString(args[0]) &&
            args[0].indexOf('You cannot change <Router routes>;') > -1
        ) {

            // React route changed
        } else {
            // Log the error as normally
            orgError.apply(console, args);
        }
    };
}

require('./app');
