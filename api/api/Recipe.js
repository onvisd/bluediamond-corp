import axios from 'axios';
import logger from '../services/logger';
import ImgixClient from 'imgix-core-js';

import config from '../../config';
import arrayPush from '../tools/arrayPush';
import concatItems from '../tools/concatItems';

const imgixClient = new ImgixClient({
    host: config.imgix.host,
    secureURLToken: config.imgix.secureURLToken
});

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
                featured: [],
                breakfast: [],
                lunchDinner: [],
                desserts: [],
                holiday: [],
                easyMeals: [],
                almondBreezeFlavor: [],
                dietary: []
            };

            // Get all the available filterable items from API
            items.map((item) => {
                const flavorNames = [];

                includes.Entry.forEach((entry) => {
                    if(entry.sys.contentType.sys.id === 'product')
                        flavorNames.push({id: entry.sys.id, name: entry.fields.name});
                });

                arrayPush(item.fields.featuredIn, filterSelections.featured);
                arrayPush(item.fields.breakfastCategories, filterSelections.breakfast);
                arrayPush(item.fields.lunchDinnerCategories, filterSelections.lunchDinner);
                arrayPush(item.fields.dessertsCategories, filterSelections.desserts);
                arrayPush(item.fields.holidayCategories, filterSelections.holiday);
                arrayPush(item.fields.easyMealsCategories, filterSelections.easyMeals);
                arrayPush(flavorNames, filterSelections.almondBreezeFlavor);
                arrayPush(item.fields.consumerSymbols, filterSelections.dietary);
            });

            Object.keys(filterSelections).map((key) => {
                // Concat & remove duplicates
                if(key === 'almondBreezeFlavor')
                    filterSelections[key] = concatItems(filterSelections[key], 'id');
                filterSelections[key] = concatItems(filterSelections[key]);

                // Remove 'N/A'
                const i = filterSelections[key].indexOf('N/A');
                if(i !== -1)
                    filterSelections[key].splice(i, 1);

                // Replace '-' with a comma
                if(key !== 'almondBreezeFlavor') {
                    filterSelections[key].map((keyValue, idx) => {
                        filterSelections[key][idx] =
                            filterSelections[key][idx].replace(' - ', ', ');
                    });
                }

                // Alphabetize
                filterSelections[key] = filterSelections[key].sort();
                if(key === 'almondBreezeFlavor') {
                    filterSelections[key] = filterSelections[key].sort((a, b) => {
                        if(a.name < b.name)
                            return -1;
                        else if(a.name > b.name)
                            return 1;

                        return 0;
                    });
                }
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
            order: req.query.sort || '-fields.featured,sys.createdAt',
            select: [
                'fields.name',
                'fields.slug',
                'fields.featured',
                'fields.featuredIn',
                'fields.breakfastCategories',
                'fields.lunchDinnerCategories',
                'fields.dessertsCategories',
                'fields.holidayCategories',
                'fields.easyMealsCategories',
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

        if(req.query.featured)
            query['fields.featuredIn[in]'] = req.query.featured;

        if(req.query.breakfast)
            query['fields.breakfastCategories[in]'] = req.query.breakfast;

        if(req.query.lunchDinner)
            query['fields.lunchDinnerCategories[in]'] = req.query.lunchDinner;

        if(req.query.desserts)
            query['fields.dessertsCategories[in]'] = req.query.desserts;

        if(req.query.holiday)
            query['fields.holidayCategories[in]'] = req.query.holiday;

        if(req.query.easyMeals)
            query['fields.easyMealsCategories[in]'] = req.query.easyMeals;

        if(req.query.almondBreezeFlavor)
            query['fields.includedProducts.sys.id[in]'] = req.query.almondBreezeFlavor;

        if(req.query.dietaryFilters)
            query['fields.consumerSymbols[in]'] = req.query.dietaryFilters;

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
            if(response.data.items.length) {
                const {includes} = response.data;
                const {fields} = response.data.items[0];

                const entryById = {};
                includes.Entry.forEach((asset) => {
                    entryById[asset.sys.id] = asset.fields;
                });

                const assetsById = {};
                includes.Asset.forEach((asset) => {
                    assetsById[asset.sys.id] = asset.fields;
                });

                const productImages = {};

                if(fields.includedProducts) {
                    fields.includedProducts.forEach((product) => {
                        const image = entryById[product.sys.id].productPhotos[0].sys.id;

                        const images = {};
                        [128, 256, 512, 1024, 1536, 2048].map((imgOpts) => {
                            images[imgOpts] = imgixClient.buildURL(
                                `http:${assetsById[image].file.url}`,
                                {
                                    w: imgOpts,
                                    h: imgOpts,
                                    fit: 'max',
                                    bg: 'fff',
                                    auto: 'compress'
                                }
                            );
                        });

                        productImages[product.sys.id] = images;
                    });
                }

                response.data.productImages = productImages;
                res.cache(true).send(response.data);
            } else {
                res.status(404).send({ok: false, error: 'not found'});
            }
        })
        .catch((err) => {
            console.trace(err);
            logger.error('Problem getting recipe', err, err.body);
            res.status(500).send(err.message);
        })
    );
};
