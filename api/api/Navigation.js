import axios from 'axios';

import {setCached} from '../services/cache';

export default (api, spaceId) => {
    const getBrands = (apiParams) =>
        axios.get(
            `${apiParams.base}/spaces/${spaceId}/entries?` +
            `include=3&content_type=brand&access_token=${apiParams.token}`
        )
        .then((response) => response.data);

    const getCompanyNavTiles = (apiParams) =>
        axios.get(
            `${apiParams.base}/spaces/${spaceId}/entries?` +
            `include=3&content_type=pageModuleRelatedPageLink&access_token=${apiParams.token}`
        )
        .then((response) => response.data);

    api.get('/navigation', async (req, res) => {
        try {
            const brands = await getBrands(req.apiParams);
            const companyNavTiles = await getCompanyNavTiles(req.apiParams);

            const data = {
                brands,
                companyNavTiles
            };

            if(brands.items.length) {
                setCached('navigation', data);
                res.send(data);
            } else {
                res.status(404).send({ok: false, error: 'not found'});
            }
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });
};
