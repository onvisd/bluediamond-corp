import axios from 'axios';
import logger from '../services/logger';

const getRandomEntries = (count, entries) => {
    if(entries.total > count) {
        const randomIndices = [];
        while (randomIndices.length < count) {
            const random = Math.floor(Math.random() * entries.total);

            if(randomIndices.indexOf(random) !== -1) continue;
            randomIndices[randomIndices.length] = random;
        }

        return randomIndices.map((d) => entries.items[d]);
    }

    return entries.items;
};

export default (api) => {
    const getBrand = (slug, client) =>
        client.getEntries({
            limit: 1,
            content_type: 'brand', // eslint-disable-line camelcase
            'fields.slug': slug,
            select: 'fields'
        })
        .then((entries) => entries.items[0])
        .catch((err) => logger.error('Problem getting brand from contentful', err, err.body));

    const getProducts = (brand, client) =>
        client.getEntries({
            content_type: 'product', // eslint-disable-line camelcase
            'fields.brand': brand
        })
        .then((entries) => entries.items.map((entry) => entry))
        .catch((err) => logger.error('Problem getting products from contentful', err, err.body));

    const getRandomProducts = (client) =>
        client.getEntries({
            content_type: 'product' // eslint-disable-line camelcase
        })
        .then((entries) => getRandomEntries(6, entries))
        .catch((err) => logger.error(
          'Problem getting random products from contentful', err, err.body));

    const getSmartLabel = (smartLabelId) =>
        axios.get(`https://smartlabel-api.labelinsight.com/api/v3/${smartLabelId}`)
        .then((response) => response.data)
        .catch((err) => logger.error('No Smart Label found', err, err.body));

    api.get('/brands/:slug', async (req, res) => {
        try {
            const brand = await getBrand(req.params.slug, req.client);

            if(!brand)
                return res.status(404).send({ok: false, error: 'Brand not found'});

            const products = await getProducts(brand.name, req.client);
            const randomProducts = await getRandomProducts(req.client);

            for (let i = 0; i < products.length; i++) {
                products[i].fields = {...products[i].fields};

                if(products[i].fields.smartLabel) {
                    const smartLabel = await getSmartLabel(products[i].fields.smartLabel);

                    const amend = typeof smartLabel === 'string'
                        ? {error: smartLabel}
                        : smartLabel;

                    products[i].fields.smartLabel = {id: products[i].fields.smartLabel, ...amend};
                } else {
                    products[i].fields.smartLabel = {error: 'No Smart Label data'};
                }
            }

            brand.fields.products = products;
            brand.fields.moreProducts = randomProducts;

            res.cache(true).status(200).send({fields: brand.fields});
        } catch (err) {
            console.trace(err);
            logger.error('Problem getting brands/:slug', err, err.body);
            res.status(404).send({ok: false, error: 'Brand not found'});
        }
    });
};
