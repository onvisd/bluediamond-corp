import express from 'express';
import webpack from 'webpack';

import webpackConfig from './webpack.config.client.development';
import appConfig from '../../config';

const compiler = webpack(webpackConfig);
const devserver = new express();

// http://webpack.github.io/docs/webpack-dev-server.html
devserver.use(require('webpack-dev-middleware')(compiler, {
    quiet: true, // don’t output anything to the console
    noInfo: true, // suppress boring information
    // adds the HotModuleReplacementPlugin and switch the server to hot mode.
    // Note: make sure you don’t add HotModuleReplacementPlugin twice
    hot: true,
    inline: true, // also adds the webpack/hot/dev-server entry

    // You can use it in two modes:
    // watch mode (default): The compiler recompiles on file change.
    // lazy mode: The compiler compiles on every request to the entry point.
    lazy: false,

    // network path for static files: fetch all statics from webpack development server
    publicPath: webpackConfig.output.publicPath,

    headers: {'Access-Control-Allow-Origin': '*'},
    stats: 'errors-only'
}));

devserver.use(require('webpack-hot-middleware')(compiler));

devserver.listen(appConfig.webpack.devserver.port, (error) => {
    if(error)	{
        console.error(error.stack || error);
        throw error;
    }

    console.log('[webpack-dev-server] Running');
});
