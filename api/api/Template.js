import axios from 'axios';

import {setCached} from '../services/cache';

export default (api, {contentful}) => {
    api.get('/template/:name', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${contentful.spaceId}/entries?` +
            `access_token=${req.apiParams.token}` +
            `&content_type=${req.params.name}Template`
        )
        .then((response) => {
            setCached(`template_${req.params.name}`, response.data);
            res.send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
