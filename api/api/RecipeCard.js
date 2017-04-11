import axios from 'axios';

import {setCached} from '../services/cache';

export default (api, spaceId) => {
    api.get('/recipeCard', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${spaceId}/entries?` +
            `access_token=${req.apiParams.token}&content_type=recipeCard`
        )
        .then((response) => {
            setCached('recipeCard', response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
