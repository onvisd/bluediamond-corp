const path = require('path');

const rootFolder = path.resolve(__dirname, 'client');

module.exports = ({env}) => ({
    plugins: {
        'postcss-import': {
            path: [
                path.resolve(rootFolder, 'assets', 'styles')
            ]
        },
        'postcss-mixins': {},

        // This plugin is included separately from cssnext below because the current version of
        // cssnext (2.10.0) causes nesting to fail after 1 level otherwise
        'postcss-nesting': {},

        'postcss-cssnext': {},
        cssnano: env === 'production' ? {} : false
    }
});
