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

export default (api, {contentful}) => {
    const getBrand = (slug) =>
        contentful.client.getEntries({
            limit: 1,
            content_type: 'brand', // eslint-disable-line camelcase
            'fields.slug': slug,
            select: 'fields'
        })
        .then((entries) => entries.items[0])
        .catch((err) => logger.error('Problem getting brand from contentful', err, err.body));

    const getProducts = (brand) =>
        contentful.client.getEntries({
            content_type: 'product', // eslint-disable-line camelcase
            'fields.brand': brand
        })
        .then((entries) => entries.items.map((entry) => entry))
        .catch((err) => logger.error('Problem getting products from contentful', err, err.body));

    const getRandomProducts = () =>
        contentful.client.getEntries({
            content_type: 'product' // eslint-disable-line camelcase
        })
        .then((entries) => getRandomEntries(6, entries))
        .catch((err) => logger.error(
          'Problem getting random products from contentful', err, err.body));

    const getSmartLabel = (smartLabelId) =>
        axios.get(`https://smartlabel-api.labelinsight.com/api/v3/${smartLabelId}`)
        .then((response) => response.data)
        .catch((err) => logger.error('No smartlabel found', err, err.body));

    api.get('/brands/:slug', async (req, res) => {
        try {
            const brand = await getBrand(req.params.slug);
            const products = await getProducts(brand.name);
            const randomProducts = await getRandomProducts();

            for (let i = 0; i < products.length; i++) {
                const smartLabel = await getSmartLabel(products[i].fields.smartLabel);

                products[i].fields = {...products[i].fields};

                if(smartLabel) {
                    const amend = typeof smartLabel === 'string'
                        ? {error: smartLabel}
                        : smartLabel;

                    products[i].fields.smartLabel = {id: products[i].fields.smartLabel, ...amend};
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
