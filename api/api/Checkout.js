import axios from 'axios';

import config from '../../config';

import {setCached} from '../services/cache';

export default (api) => {
    const getCartByToken = (query) =>
        axios.get(
            `https://${config.shopify.key}:${config.shopify.pass}` +
            '@bdgrowers.myshopify.com/admin/' +
            `checkouts/${query}.json`
        )
        .then((response) => response.data)
        .catch((err) => {
            console.trace(err);
            return 'No Shopify data found';
        });

    api.get('/store/checkout/:slug', async (req, res) => {
        try {
            const cart = await getCartByToken(req.params.slug);

            if(cart.length) {
                setCached(`store_cart_${req.params.slug}`, cart);
                res.send(cart);
            } else {
                res.status(404).send({ok: false, error: 'not found'});
            }
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });
};
