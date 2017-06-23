import axios from 'axios';

import {setCached} from '../services/cache';

export default (api, {contentful}) => {
    api.get('/recipes', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${contentful.spaceId}/entries?` +
            `access_token=${req.apiParams.token}&content_type=recipe` +
            '&limit=100'
        )
        .then((response) => {
            setCached('recipes', response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );

    api.get('/recipes/:slug', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${contentful.spaceId}/entries?` +
            `fields.slug=${req.params.slug}&` +
            `access_token=${req.apiParams.token}&content_type=recipe`
        )
        .then((response) => {
            setCached(`recipes_${req.params.slug}`, response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
