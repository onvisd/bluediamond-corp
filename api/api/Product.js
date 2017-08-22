import axios from 'axios';
import logger from '../services/logger';

export default (api, {contentful}) => {
    const getProduct = (apiParams, slug) =>
        axios.get(
            `${apiParams.base}/spaces/${contentful.spaceId}/entries?` +
            `fields.slug=${slug}&` +
            `access_token=${apiParams.token}&content_type=product`
        )
        .then((response) => response.data)
        .catch((err) => logger.error('Problem getting product', err, err.body));

    const getSmartLabel = (smartLabelId) =>
        axios.get(`https://smartlabel-api.labelinsight.com/api/v3/${smartLabelId}`)
        .then((response) => response.data)
        .catch((err) => {
            console.trace(err);
            logger.error('No Smart Label data found', err, err.body);
            return 'No Smart Label data found';
        });

    api.get('/product/:slug', async (req, res) => {
        try {
            const product = await getProduct(req.apiParams, req.params.slug);

            const smartLabelId = product.items[0].fields.smartLabel;
            const smartLabel = await getSmartLabel(smartLabelId);
            const amend = typeof smartLabel === 'string'
                ? {error: smartLabel}
                : smartLabel;

            product.items[0].fields.smartLabel = {id: smartLabelId, ...amend};

            res.cache(true).send(product);
        } catch (err) {
            console.trace(err);
            logger.error('Problem getting contentful product page', err, err.body);
            res.status(404).send({ok: false, error: 'not found'});
        }
    });
};
