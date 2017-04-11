import axios from 'axios';

import {setCached} from '../services/cache';

export default (api, spaceId) => {
    api.get('/page/:slug', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${spaceId}/entries?` +
            `include=2&fields.slug=${req.params.slug}&` +
            `access_token=${req.apiParams.token}&content_type=page`
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
