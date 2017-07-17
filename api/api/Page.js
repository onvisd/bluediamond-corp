import axios from 'axios';

const contentTypes = [
    'page',
    'pageWithSidebar',
    'fullScreenPage'
];

const requestSlugFromType = (req, res, spaceId, typeIndex) => {
    axios.get(
        `${req.apiParams.base}/spaces/${spaceId}/entries?` +
        `include=2&fields.slug=${req.params.slug}&` +
        `access_token=${req.apiParams.token}&content_type=${contentTypes[typeIndex]}`
    )
    .then((response) => {
        if(response.data.items.length)
            res.cache(true).send(response.data);
        else if(typeIndex + 1 < contentTypes.length)
            requestSlugFromType(req, res, spaceId, typeIndex + 1);
        else
            res.status(404).send({ok: false, error: 'not found'});
    })
    .catch((err) => {
        console.trace(err);
        res.status(500).send(err.message);
    });
};

export default (api, {contentful}) => {
    api.get('/page/:slug', (req, res) => requestSlugFromType(req, res, contentful.spaceId, 0));
};
