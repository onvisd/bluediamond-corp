import axios from 'axios';

import {setCached} from '../services/cache';
import config from '../../config';

const apiBase = 'https://cdn.contentful.com';
const {spaceId, accessToken} = config.services.api;

export default (api) => {
    api.get('/home', (req, res) =>
        axios.get(
            `${apiBase}/spaces/${spaceId}/entries?` +
            `access_token=${accessToken}&content_type=homepageModule`
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
