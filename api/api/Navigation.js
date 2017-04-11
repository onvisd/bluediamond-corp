import axios from 'axios';

import {setCached} from '../services/cache';

export default (api, spaceId) => {
    api.get('/navigation', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${spaceId}/entries?` +
            `include=3&content_type=brand&access_token=${req.apiParams.token}`
        )
        .then((response) => {
            if(response.data.items.length) {
                setCached('navigation', response.data);
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
