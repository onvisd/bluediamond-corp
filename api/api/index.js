import {Router} from 'express';
import requireAll from 'require-all';
import * as contentful from 'contentful';

import config from '../../config';
import {getCached} from '../services/cache';

export default () => {
    const api = Router();
    const apiBase = {
        prod: 'https://cdn.contentful.com',
        prev: 'https://preview.contentful.com'
    };
    const {spaceId, accessToken, previewToken} = config.services.api;

    const client = contentful.createClient({
        space: spaceId,
        accessToken
    });

	// perhaps expose some API metadata at the root
    api.get('/', (req, res) => {
        res.json({version: '1.0'});
    });

    // check the cache before hitting the endpoints
    if(process.env.NODE_ENV === 'production')
        api.use(getCached);

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
        resolve: (endpoint) => endpoint.default(api, spaceId, client)
    });

    return api;
};
