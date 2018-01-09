import axios from 'axios';
import logger from '../services/logger';

import arrayPush from '../tools/arrayPush';
import concatItems from '../tools/concatItems';

export default (api, {contentful}) => {
    const getRecipeFilters = () =>
        contentful.client.getEntries({
            content_type: 'recipe', // eslint-disable-line camelcase
            limit: 500
        })
        .then((response) => {
            const items = response.items;
            const includes = response.includes;

            // Define the filterable item object
            const filterSelections = {
                category: [],
                seasonal: [],
                dietary: [],
                almondBreezeFlavor: [],
                featured: [],
                difficulty: [],
                ingredients: []
            };

            // Get all the available filterable items from API
            items.map((item) => {
                const flavorNames = [];

                includes.Entry.forEach((entry) => {
                    if(entry.sys.contentType.sys.id === 'product')
                        flavorNames.push({id: entry.sys.id, name: entry.fields.name});
                });

                arrayPush(item.fields.category, filterSelections.category);
                arrayPush(item.fields.seasonal, filterSelections.seasonal);
                arrayPush(item.fields.consumerSymbols, filterSelections.dietary);
                arrayPush(flavorNames, filterSelections.almondBreezeFlavor);
                arrayPush(item.fields.featuredIn, filterSelections.featured);
                arrayPush(item.fields.difficulty, filterSelections.difficulty);
            });

            // Concat & remove duplicates
            Object.keys(filterSelections).map((key) => {
                if(key === 'almondBreezeFlavor')
                    filterSelections[key] = concatItems(filterSelections[key], 'id');

                filterSelections[key] = concatItems(filterSelections[key]);

                // Remove 'N/A'
                const i = filterSelections[key].indexOf('N/A');
                if(i !== -1)
                    filterSelections[key].splice(i, 1);
            });

            // Send to client
            return filterSelections;
        })
        .catch((err) => {
            console.trace(err);
            logger.error('Problem getting recipe filters', err, err.body);
            return 'Problem getting recipe filters';
        });

    api.get('/recipes', (req, res) => {
        // Build the search query
        const query = {
            content_type: 'recipe', // eslint-disable-line camelcase
            resolveLinks: true,
            skip: req.query.skip || 0,
            limit: req.query.limit || 9,
            order: req.query.sort || 'fields.featured,sys.createdAt',
            select: [
                'fields.name',
                'fields.slug',
                'fields.featured',
                'fields.featuredIn',
                'fields.category',
                'fields.seasonal',
                'fields.consumerSymbols',
                'fields.cardBackgroundImage',
                'fields.servingSize',
                'fields.cookTime',
                'fields.difficulty',
                'fields.tags',
                'fields.includedProducts'
            ]
        };

        if(req.query.search)
            query['fields.tags[match]'] = req.query.search;

        if(req.query.dietaryFilters)
            query['fields.consumerSymbols[in]'] = req.query.dietaryFilters;

        if(req.query.category)
            query['fields.category[in]'] = req.query.category;

        if(req.query.seasonal)
            query['fields.seasonal[in]'] = req.query.seasonal;

        if(req.query.featured)
            query['fields.featuredIn[in]'] = req.query.featured;

        if(req.query.difficulty)
            query['fields.difficulty[in]'] = req.query.difficulty;

        if(req.query.almondBreezeFlavor)
            query['fields.includedProducts.sys.id[in]'] = req.query.almondBreezeFlavor;

        // Get the recipes based on the query
        contentful.client.getEntries(query)
        .then((response) => {
            res.cache(true).send(response);
        })
        .catch((err) => {
            console.trace(err);
            logger.error('Problem getting recipes', err, err.body);
            res.status(500).send(err.message);
        });
    });

    api.get('/recipe/filters', async (req, res) => {
        try {
            const filters = await getRecipeFilters();
            if(filters)
                res.cache(true).send(filters);
            else
                res.status(401).send({message: 'No filters found!'});
        } catch (err) {
            console.trace(err);
            logger.error('Problem getting recipe filters', err, err.body);
            res.status(500).send(err.message);
        }
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
