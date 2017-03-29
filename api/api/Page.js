import axios from 'axios';

import config from '../../config';

const apiBase = 'https://cdn.contentful.com';
const {spaceId, accessToken} = config.services.api;

export default (api) => {
    api.get('/page/:slug', (req, res) =>
        axios.get(
            `${apiBase}/spaces/${spaceId}/entries?` +
            `include=2&fields.slug=${req.params.slug}&` +
            `access_token=${accessToken}&content_type=page`
        )
        .then((response) => res.send(response.data))
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
