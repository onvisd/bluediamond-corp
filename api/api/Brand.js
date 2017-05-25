import axios from 'axios';

import {setCached} from '../services/cache';

export default (api, spaceId, client) => {
    const getBrand = (slug) =>
        client.getEntries({
            limit: 1,
            content_type: 'brand', // eslint-disable-line camelcase
            'fields.slug': slug,
            select: 'fields'
        })
        .then((entries) => entries.items[0]);

    const getProducts = (brand) =>
        client.getEntries({
            content_type: 'product', // eslint-disable-line camelcase
            'fields.brand': brand
        })
        .then((entries) => entries.items.map((entry) => entry));

    const getRandomProducts = () =>
        client.getEntries({
            content_type: 'product' // eslint-disable-line camelcase
        })
        .then((entries) => {
            if(entries.total > 6) {
                const randomIndices = [];
                while (randomIndices.length < 6) {
                    const random = Math.floor(Math.random() * entries.total);

                    if(randomIndices.indexOf(random) !== -1) continue;
                    randomIndices[randomIndices.length] = random;
                }

                return randomIndices.map((d) => entries.items[d]);
            }

            return entries.items;
        });

    const getSmartLabel = (smartLabelId) =>
        axios.get(`https://smartlabel-api.labelinsight.com/api/v2/${smartLabelId}`)
        .then((response) => response.data)
        .catch(() => 'No Smart Label data found');

    api.get('/brands/:slug', async (req, res) => {
        try {
            const brand = await getBrand(req.params.slug);
            const products = await getProducts(brand.name);
            const randomProducts = await getRandomProducts();

            for (let i = 0; i < products.length; i++) {
                const smartLabel = await getSmartLabel(products[i].fields.smartLabel);

                const amend = typeof smartLabel === 'string'
                    ? {error: smartLabel}
                    : smartLabel;

                products[i].fields = {
                    ...products[i].fields,
                    smartLabel: {id: products[i].fields.smartLabel, ...amend}
                };
            }

            brand.fields.products = products;
            brand.fields.moreProducts = randomProducts;

            setCached(`brands_${req.params.slug}`, {fields: brand.fields});
            res.status(200).send({fields: brand.fields});
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });
};
