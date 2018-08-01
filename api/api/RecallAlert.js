import logger from '../services/logger';

export default (api, {contentful}) => {
    const getRecalls = () =>
        contentful.client.getEntries({
            content_type: 'recallAlertBar', // eslint-disable-line camelcase
            select: [
                'fields.name',
                'fields.content',
                'fields.showAlert'
            ].join()
        })
        .then((entries) => entries.items)
        .catch((err) => logger.error('Problem getting recalls', err, err.body));

    api.get('/recalls', async (req, res) => {
        try {
            const recalls = await getRecalls(req.apiParams);
            res.cache(true).send(recalls);
        } catch (err) {
            console.trace(err);
            logger.error('Problem getting recalls', err, err.body);
            res.status(500).send(err.message);
        }
    });
};
