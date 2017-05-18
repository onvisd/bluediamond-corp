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
            setCached('store_products', response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );

    const getProductsByType = (query) =>
        axios.get(
            `https://${config.shopify.key}:${config.shopify.pass}` +
            '@bdgrowers.myshopify.com/admin/' +
            `products.json?product_type=${query}`
        )
        .then((response) => response.data)
        .catch((err) => {
            console.trace(err);
            return 'No Shopify data found';
        });

    const getProduct = (slug) =>
        axios.get(
            `https://${config.shopify.key}:${config.shopify.pass}` +
            '@bdgrowers.myshopify.com/admin/' +
            `products.json?handle=${slug}`
        )
        .then((response) => response.data)
        .catch((err) => {
            console.trace(err);
            return 'No Shopify data found';
        });

    const getSmartLabel = (smartLabelId) =>
        axios.get(`https://smartlabel-api.labelinsight.com/api/v2/${smartLabelId}`)
        .then((response) => response.data)
        .catch((err) => {
            console.trace(err);
            return 'No Smart Label data found';
        });

    const getYotpo = (productId) =>
        axios.get(
            `https://api.yotpo.com/v1/widget/${config.yotpo.key}` +
            `/products/${productId}/reviews.json`
        )
        .then((response) => response.data)
        .catch((err) => {
            console.trace(err);
            return 'No YotPo data found';
        });

    api.get('/store/products/:slug', async (req, res) => {
        try {
            const product = await getProduct(req.params.slug);

            if(product.products.length) {
                const productId = product.products[0].id;
                const smartLabelId = product.products[0].tags.match(/smartLabel:(\d*)/)[1];
                const productType = product.products[0].product_type;

                const yotpo = await getYotpo(productId);
                const smartLabel = await getSmartLabel(smartLabelId);
                const productsByType = await getProductsByType(productType);

                const amendSmartLabel = typeof smartLabel === 'string'
                    ? {error: smartLabel}
                    : smartLabel;

                const amendYotpo = typeof yotpo === 'string'
                    ? {error: yotpo}
                    : yotpo;

                const amendRelated = typeof productsByType === 'string'
                    ? {error: productsByType}
                    : productsByType;

                product.products[0].smartLabel = {id: smartLabelId, ...amendSmartLabel};
                product.products[0].reviews = {id: productId, ...amendYotpo};
                product.products[0].related = {type: productType, ...amendRelated};

                setCached(`store_products_${req.params.slug}`, product);
                res.send(product);
            } else {
                res.status(404).send({ok: false, error: 'not found'});
            }
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });
};
