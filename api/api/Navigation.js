import axios from 'axios';

import {setCached} from '../services/cache';
import config from '../../config';

const apiBase = 'https://cdn.contentful.com';
const {spaceId, accessToken} = config.services.api;

export default (api) => {
    api.get('/navigation', (req, res) =>
        axios.get(
            `${apiBase}/spaces/${spaceId}/entries?` +
            `include=3&content_type=brand&access_token=${accessToken}`
        )
        .then((response) => {
            if(response.data.items.length) {
                setCached(`page_${req.params.slug}`, response.data);
                res.send(response.data);
            } else {
                res.status(404).send({ok: false, error: 'not found'});
            }
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
