import logger from '../services/logger';

const contentTypes = ['page', 'pageWithSidebar', 'fullScreenPage'];

export default (api, {contentful}) => {
    const getProducts = (category) =>
        contentful.client
            .getEntries({
                content_type: 'product', // eslint-disable-line camelcase
                'fields.brandCategory': category
            })
            .then((entries) => entries.items.map((entry) => entry))
            .catch((err) =>
                logger.error('Problem getting products from contentful', err, err.body)
            );

    const requestSlugFromType = (req, res, spaceId, typeIndex) =>
        contentful.client
            .getEntries({
                content_type: contentTypes[typeIndex], // eslint-disable-line camelcase
                include: 2,
                'fields.slug': req.params.slug
            })
            .then(async (data) => {
                if(data.items.length) {
                    const fields = data.items[0].fields;

                    const brandCategoryMdles = fields.modules.filter(
                        (mdle) => mdle.sys.contentType.sys.id === 'pageModuleBrandCategory'
                    );

                    if(brandCategoryMdles.length) {
                        const products = {};

                        for (const brandCategoryMdle of brandCategoryMdles) {
                            products[brandCategoryMdle.fields.title] = await getProducts(
                                brandCategoryMdle.fields.brandCategory.fields.name
                            );
                        }

                        res.cache(true).send({
                            ...data,
                            items: [
                                {
                                    ...data.items[0],
                                    fields: {
                                        ...fields,
                                        modules: fields.modules.map((mdle) => {
                                            if(
                                                mdle.sys.contentType.sys.id ===
                                                'pageModuleBrandCategory'
                                            ) {
                                                return {
                                                    ...mdle,
                                                    fields: {
                                                        ...mdle.fields,
                                                        products: products[mdle.fields.title]
                                                    }
                                                };
                                            }

                                            return mdle;
                                        })
                                    }
                                }
                            ]
                        });
                    } else {
                        res.cache(true).send(data);
                    }
                } else if(typeIndex + 1 < contentTypes.length) {
                    requestSlugFromType(req, res, spaceId, typeIndex + 1);
                } else {
                    res.status(404).send({ok: false, error: 'not found'});
                }
            })
            .catch((err) => {
                console.trace(err);
                logger.error('Problem getting page', err, err.body);
                res.status(500).send(err.message);
            });

    api.get('/page/:slug', (req, res) => requestSlugFromType(req, res, contentful.spaceId, 0));
};
