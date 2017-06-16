import {setCached} from '../services/cache';

export default (api, spaceId, client) => {
    const getBrands = () =>
        client.getEntries({
            content_type: 'brand', // eslint-disable-line camelcase
            select: [
                'fields.name',
                'fields.slug',
                'fields.themeColor',
                'fields.categories',
                'fields.mobileNavImage'
            ].join()
        })
        .then((entries) => entries.items);

    const getProducts = (brand) =>
        client.getEntries({
            content_type: 'product', // eslint-disable-line camelcase
            'fields.brand': brand
        })
        .then((entries) => entries.items.map((entry) => entry));

    const getCompanyNavTiles = () =>
        client.getEntries({
            content_type: 'pageModuleRelatedPageLink' // eslint-disable-line camelcase
        })
        .then((entries) => entries.items);

    api.get('/navigation', async (req, res) => {
        try {
            const brands = await getBrands(req.apiParams);
            const companyNavTiles = await getCompanyNavTiles(req.apiParams);

            for (let i = 0; i < brands.length; i++)
                brands[i].fields.products = await getProducts(brands[i].fields.name);

            const data = {
                brands,
                companyNavTiles
            };

            setCached('navigation', data);
            res.send(data);
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });
};
