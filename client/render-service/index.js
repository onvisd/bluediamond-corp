require('dotenv').config();

require('bluebird').promisifyAll(require('fs-extra'));

require('./start');

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

// Set `bluebird` as the default `Promise` implementation
// inside 3rd party libraries using `babel-runtime`.
require('babel-runtime/core-js/promise').default = require('bluebird');

// Not using ES6 `import` syntax here
// to avoid `require()`ing `babel-register`
// which would parse the whole server-side bundle by default.

// https://github.com/babel/babel/issues/5731
require('babel-polyfill');

require('./start');
