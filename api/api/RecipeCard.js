import axios from 'axios';

import config from '../../config';

const apiBase = 'https://cdn.contentful.com';
const {spaceId, accessToken} = config.services.api;

export default (api) => {
    api.get('/recipeCard', (req, res) =>
        axios.get(
            `${apiBase}/spaces/${spaceId}/entries?` +
            `access_token=${accessToken}&content_type=recipeCard`
        )
        .then((response) => res.send(response.data))
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
