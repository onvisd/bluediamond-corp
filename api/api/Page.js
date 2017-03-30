import axios from 'axios';

import {setCached} from '../services/cache';
import config from '../../config';

const apiBase = 'https://cdn.contentful.com';
const {spaceId, accessToken} = config.services.api;

export default (api) => {
    api.get('/page/:slug', (req, res) =>
        axios.get(
            `${apiBase}/spaces/${spaceId}/entries?` +
            `include=2&fields.slug=${req.params.slug}&` +
            `access_token=${accessToken}&content_type=page`
        )
        .then((response) => {
            setCached(`page_${req.params.slug}`, response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
