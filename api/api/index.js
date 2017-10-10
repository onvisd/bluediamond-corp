import {Router} from 'express';
import requireAll from 'require-all';
import * as contentfulSdk from 'contentful';
import ApolloClient, {createNetworkInterface} from 'apollo-client';

// Polyfill fetch for node
import fetch from 'node-fetch'; // eslint-disable-line no-shadow
global.fetch = fetch;

import config from '../../config';
import {getCached} from '../services/cache';
import '../services/retry';

export default () => {
    const api = Router();
    const apiBase = {
        prod: 'https://cdn.contentful.com',
        prev: 'https://preview.contentful.com'
    };
    const {spaceId, accessToken, previewToken} = config.services.api;

    const client = contentfulSdk.createClient({
        space: spaceId,
        accessToken
    });

    const contentful = {spaceId, client};

    const apolloClient = new ApolloClient({
        networkInterface: createNetworkInterface({
            uri: `https://${config.shopify.storeName}.myshopify.com/api/graphql`,
            opts: {
                headers: {
                    'X-Shopify-Storefront-Access-Token': config.shopify.apiToken
                }
            }
        })
    });

    const clients = {
        contentful,
        apolloClient
    };

	// perhaps expose some API metadata at the root
    api.get('/', (req, res) => {
        res.json({version: '1.0'});
    });

    // check the cache before hitting the endpoints
    if(process.env.NODE_ENV === 'production') {
        api.use(getCached);
    } else {
        api.use((req, res, next) => {
            res.cache = () => res;
            next();
        });
    }

    // setup the route params
    api.use((req, res, next) => {
        req.apiParams = {
            base: req.query.preview ? apiBase.prev : apiBase.prod,
            token: req.query.preview ? previewToken : accessToken
        };

        next();
    });

    requireAll({
        dirname: __dirname,
        filter: /^(?!index)(.+)\.js$/,
        recursive: false,
        resolve: (endpoint) => endpoint.default(api, clients)
    });

    return api;
};
