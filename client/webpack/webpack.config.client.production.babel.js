import path from 'path';

import webpack from 'webpack';
import baseconfig from './webpack.config.client';
import CleanPlugin from 'clean-webpack-plugin';

// With `development: false` all CSS will be extracted into a file
// named '[name]-[contenthash].css' using `extract-text-webpack-plugin`
// (this behaviour can be disabled with `css_bundle: false`)
// (the filename can be customized with `css_bundle: "filename.css"`)
const config = baseconfig({development: false});

config.devtool = 'source-map';

config.output.filename = '[name].[chunkhash:8].js';
config.output.chunkFilename = '[name].[chunkhash:8].js';

config.plugins.push(

    // clears the output folder
    new CleanPlugin(
        [path.relative(config.context, config.output.path)],
        {root: config.context}
    ),

    // environment variables
    new webpack.DefinePlugin({
        'process.env': {
            // Useful to reduce the size of client-side libraries, e.g. react
            // Use 'development' to see non-minified React errors
            NODE_ENV: JSON.stringify('production')
        },

        // Just so that it doesn't throw "_development_tools_ is not defined"
        REDUX_DEVTOOLS: false
    }),

    // For production mode
    // https://moduscreate.com/webpack-2-tree-shaking-configuration/
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),

    // Assign the module and chunk ids by occurrence count.
    new webpack.optimize.OccurrenceOrderPlugin(),

    // extracts common javascript into a separate file
    new webpack.optimize.CommonsChunkPlugin({
        name: 'react-lib',
        minChunks: (m) => /node_modules\/(?:react)/.test(m.context)
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
    }),

    // Compresses javascript files
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);

export default config;
