import webpack from 'webpack';
import StylelintPlugin from 'stylelint-webpack-plugin';
import webpackBaseConfig from './webpack.config.client';
import appConfig from '../../config';

// eslint-disable-next-line camelcase
const config = webpackBaseConfig({development: true, css_bundle: true});

config.devtool = 'inline-eval-cheap-source-map';

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
        REDUX_DEVTOOLS: true  // enable/disable redux-devtools
    }),

    // faster code reload on changes
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

    // // extracts common javascript into a separate file (works)
    // new webpack.optimize.CommonsChunkPlugin('common', 'common.[hash].js')
);

// enable webpack development server
config.entry.main = [
    `webpack-hot-middleware/client?path=http://localhost:${appConfig.webpack.devserver.port}/__webpack_hmr`,
    'react-hot-loader/patch',
    config.entry.main
];

// network path for static files: fetch all statics from webpack development server
config.output.publicPath =
    `http://localhost:${appConfig.webpack.devserver.port}${config.output.publicPath}`;

export default config;
