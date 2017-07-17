export default (api, {contentful}) => {
    const getBrands = () =>
        contentful.client.getEntries({
            content_type: 'brand', // eslint-disable-line camelcase
            select: [
                'fields.name',
                'fields.slug',
                'fields.themeColor',
                'fields.categories',
                'fields.mobileNavImage',
                'fields.priority'
            ].join()
        })
        .then((entries) => entries.items);

    const getProducts = (brand) =>
        contentful.client.getEntries({
            content_type: 'product', // eslint-disable-line camelcase
            'fields.brand': brand
        })
        .then((entries) => entries.items.map((entry) => entry));

    const getCompanyNavTiles = () =>
        contentful.client.getEntries({
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

            res.cache(true).send(data);
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });
};
