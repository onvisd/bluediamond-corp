import axios from 'axios';

import config from '../../config';

const apiBase = 'https://cdn.contentful.com';
const {spaceId, accessToken} = config.services.api;

export default (api) => {
    api.get('/recipe/:slug', (req, res) =>
        axios.get(
            `${apiBase}/spaces/${spaceId}/entries?` +
            `fields.slug=${req.params.slug}&` +
            `access_token=${accessToken}&content_type=recipe`
        )
        .then((response) => res.send(response.data))
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
