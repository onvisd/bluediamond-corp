import axios from 'axios';

import {setCached} from '../services/cache';

export default (api, spaceId) => {
    api.get('/brand', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${spaceId}/entries?` +
            'select=sys.id,fields.slug,fields.name&' +
            `access_token=${req.apiParams.token}&content_type=brand`
        )
        .then((response) => {
            setCached('brand', response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );

    api.get('/brand/:slug', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${spaceId}/entries?` +
            `fields.slug=${req.params.slug}&` +
            `access_token=${req.apiParams.token}&content_type=brand`
        )
        .then((response) => {
            setCached(`brand_${req.params.slug}`, response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
