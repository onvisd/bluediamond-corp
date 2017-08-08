import axios from 'axios';

export default (api, {contentful}) => {
    api.get('/recipes', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${contentful.spaceId}/entries?` +
            `access_token=${req.apiParams.token}&content_type=recipe` +
            `&limit=6${
                typeof req.query.skip === 'undefined' ? '' : `&skip=${req.query.skip}`
            }${
                typeof req.query.sort === 'undefined' ? '' : `&order=${req.query.sort}`
            }`
        )
        .then((response) => {
            res.cache(true).send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );

    api.get('/recipes/:slug', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${contentful.spaceId}/entries?` +
            `fields.slug=${req.params.slug}&` +
            `access_token=${req.apiParams.token}&content_type=recipe`
        )
        .then((response) => {
            res.cache(true).send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send(err.message);
        })
    );
};
