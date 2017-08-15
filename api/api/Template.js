import axios from 'axios';
import logger from '../services/logger';

export default (api, {contentful}) => {
    api.get('/template/:name', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${contentful.spaceId}/entries?` +
            `access_token=${req.apiParams.token}` +
            `&content_type=${req.params.name}Template`
        )
        .then((response) => {
            res.cache(true).status(200).send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            logger.error('Problem getting contentful template', err, err.body);
            res.status(500).send(err.message);
        })
    );
};
