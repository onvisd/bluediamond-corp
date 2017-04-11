import axios from 'axios';

import {setCached} from '../services/cache';

export default (api, spaceId) => {
    api.get('/product/:slug', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${spaceId}/entries?` +
            `fields.slug=${req.params.slug}&` +
            `access_token=${req.apiParams.token}&content_type=product`
        )
        .then((response) => {
            setCached(`product_${req.params.slug}`, response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
