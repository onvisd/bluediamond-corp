import webpack from 'webpack';
import StylelintPlugin from 'stylelint-webpack-plugin';
import webpackBaseConfig from './webpack.config.client';
import appConfig from '../../config';

// eslint-disable-next-line camelcase
const config = webpackBaseConfig({development: true, css_bundle: true});

config.devtool = 'cheap-module-eval-source-map';

config.plugins.push(
    new StylelintPlugin({
        files: '**/*.css'
    }),

    // environment variables
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development'),
            BABEL_ENV: JSON.stringify('development/client')
        },
        ANALYTICS_ID: JSON.stringify(process.env.ANALYTICS_ID),
        REDUX_DEVTOOLS: true  // enable/disable redux-devtools
    }),

    // faster code reload on changes
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // extracts common javascript into a separate file
    new webpack.optimize.CommonsChunkPlugin({
        name: 'react-lib',
        minChunks: (m) => /node_modules\/(?:react)/.test(m.context)
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
    }),
);

// enable webpack development server
config.entry.main = [
    'babel-polyfill',
    `webpack-hot-middleware/client?path=http://localhost:${appConfig.webpack.devserver.port}/__webpack_hmr`,
    'react-hot-loader/patch',
    config.entry.main
];

// network path for static files: fetch all statics from webpack development server
config.output.publicPath =
    `http://localhost:${appConfig.webpack.devserver.port}${config.output.publicPath}`;

export default config;
