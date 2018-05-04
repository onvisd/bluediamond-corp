// This is the base Webpack configuration file

const path = require('path');
const webpack = require('webpack');

// project folder
const rootFolder = path.resolve(__dirname, '..');

const config = {
    // Resolve all relative paths from the project root folder
    context: rootFolder,

    // Each "entry" can be divided into multiple chunks.
    // Why multiple "entries" might be used?
    // For example, for completely different website parts,
    // like the public user-facing part and the private "admin" part.
    entry: {
        // The "main" entry
        main: './src/app.entry.js',

        // Entry point for Product Locator add-on code
        'product-locator': './src/productLocator/entry.js'
    },

    output: {
        // Filesystem path for static files
        path: path.resolve(rootFolder, 'build/assets'),

        // Network path for static files
        publicPath: '/assets/',

        // Specifies the name of each output entry file
        filename: '[name].[hash:8].js',

        // Specifies the name of each (non-entry) chunk file
        chunkFilename: '[name].[hash:8].js'
    },

    resolve: {
        alias: {
            pages: path.resolve(__dirname, '../src/pages/'),
            components: path.resolve(__dirname, '../src/components/'),
            state: path.resolve(__dirname, '../src/state/'),
            tools: path.resolve(__dirname, '../src/tools'),
            images: path.resolve(__dirname, '../assets/images/'),
            fonts: path.resolve(__dirname, '../assets/fonts/')
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            failOnError: true
                        }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                exclude: /\.module\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.module\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[folder]__[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.(jpg|png|woff|woff2|eot)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // Any png-image or woff-font below or equal to
                            // 10K will be converted to inline base64 instead
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /\.(svg)$/,
                use: [
                    'react-svgdom-loader',
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                {removeViewBox: false}
                            ]
                        }
                    }
                ]
            }
        ]
    },

    plugins: []
};

config.plugins.push(
    new webpack.LoaderOptionsPlugin({
        test: /\.(css)$/,
        debug: true,
        options: {
            // A temporary workaround for `css`.
            // Can also supply `query.context` parameter.
            context: config.context
        }
    })
);

module.exports = config;
