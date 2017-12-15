import axios from 'axios';
import logger from '../services/logger';

export default (api, {contentful}) => {
    api.get('/recipes', (req, res) => {
        axios.get(
            `${req.apiParams.base}/spaces/${contentful.spaceId}/entries?` +
            `access_token=${req.apiParams.token}&content_type=recipe` +
            `&limit=${req.query.limit || 9}${
                typeof req.query.skip === 'undefined' ? '' : `&skip=${req.query.skip}`
            }${
                typeof req.query.sort === 'undefined' || !req.query.sort
                    ? '&order=fields.featured'
                    : `&order=${req.query.sort}`
            }${
                typeof req.query.search === 'undefined'
                    ? ''
                    : `&fields.name[match]=${req.query.search}`
            }${
                typeof req.query.dietaryFilters === 'undefined'
                    ? ''
                    : `&fields.consumerSymbols[in]=${req.query.dietaryFilters}`
            }${
                typeof req.query.almondBreezeFlavor === 'undefined'
                    ? ''
                    : `&fields.includedProducts[in]=${req.query.almondBreezeFlavor}`
            }${
                typeof req.query.category === 'undefined'
                    ? ''
                    : `&fields.category[in]=${encodeURIComponent(req.query.category)}`
            }${
                typeof req.query.seasonal === 'undefined'
                    ? ''
                    : `&fields.seasonal[in]=${req.query.seasonal}`
            }${
                typeof req.query.almondBreezeFlavor === 'undefined'
                    ? ''
                    : `&fields.includedProducts.sys.id[in]=${req.query.almondBreezeFlavor}`
            }${
                typeof req.query.featuredIn === 'undefined'
                    ? ''
                    : `&fields.featuredIn[in]=${req.query.featuredIn}`
            }${
                typeof req.query.difficulty === 'undefined'
                    ? ''
                    : `&fields.difficulty[in]=${req.query.difficulty}`
            }${
                typeof req.query.ingredients === 'undefined'
                    ? ''
                    : `&fields.tags[in]=${req.query.ingredients}`
            }`
        )
        .then((response) => {
            res.cache(true).send(response.data);
        })
        .catch((err) => {
            console.trace(err);
            logger.error('Problem getting recipes', err, err.body);
            res.status(500).send(err.message);

        });
    });

    api.get('/recipes/:slug', (req, res) =>
        axios.get(
            `${req.apiParams.base}/spaces/${contentful.spaceId}/entries?` +
            `fields.slug=${req.params.slug}&` +
            `access_token=${req.apiParams.token}&content_type=recipe`
        )
        .then((response) => {
            if(response.data.items.length)
                res.cache(true).send(response.data);
            else
                res.status(404).send({ok: false, error: 'not found'});
        })
        .catch((err) => {
            console.trace(err);
            logger.error('Problem getting recipe', err, err.body);
            res.status(500).send(err.message);
        })
    );
};
