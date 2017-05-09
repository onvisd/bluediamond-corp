import axios from 'axios';

import config from '../../config';

import {setCached} from '../services/cache';

export default (api) => {
    api.get('/store/products', (req, res) =>
        axios.get(
            `https://${config.shopify.key}:${config.shopify.pass}` +
            '@bdgrowers.myshopify.com/admin/' +
            'products.json'
        )
        .then((response) => {
            setCached('storeProducts', response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
