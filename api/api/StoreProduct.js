import axios from 'axios';

import config from '../../config';

import {setCached} from '../services/cache';

export default (api) => {
    api.get('/store/product/:slug', (req, res) =>
        axios.get(
            `https://${config.shopify.key}:${config.shopify.pass}` +
            '@bdgrowers.myshopify.com/admin/' +
            `products.json?handle=${req.params.slug}`
        )
        .then((response) => {
            setCached(`storeProduct_${req.params.slug}`, response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
