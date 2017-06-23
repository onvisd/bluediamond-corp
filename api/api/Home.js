import axios from 'axios';

import {setCached} from '../services/cache';

export default (api, {contentful}) => {
    api.get('/home', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${contentful.spaceId}/entries?` +
            `access_token=${req.apiParams.token}&content_type=homepageModule`
        )
        .then((response) => {
            setCached('home', response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
