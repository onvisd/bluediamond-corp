import axios from 'axios';
import logger from '../services/logger';

export default (api, {contentful}) => {
    api.get('/home', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${contentful.spaceId}/entries?` +
            `access_token=${req.apiParams.token}&content_type=homepageModule`
        )
        .then((response) => {
            res.cache(true).send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            logger.error('Problem getting the homepage', err, err.message);
            res.status(500).send(err.message);
        })
    );
};
