/* eslint-disable camelcase */

import axios from 'axios';
import logger from '../services/logger';

import config from '../../config';

export default (api) => {
    const getYotpo = (id, params) =>
        axios.get(
            `https://api.yotpo.com/v1/widget/${config.yotpo.key}` +
            `/products/${id}/reviews.json` +
            `?per_page=${params.perPage}&page=${params.page}&sort=${params.sort}` +
            `&direction=${params.direction}`,
            {
                timeout: 3000,
                retry: 5,
                retryDelay: 1000
            }
        )
        .then((response) => response.data)
        .catch((err) => {
            console.trace(err);
            logger.error('No YotPo data found', err, err.body);

            // Return an empty response so we don't fail because of a review load error
            return {
                status: {
                    code: 200,
                    message: 'OK'
                },
                response: {
                    pagination: {
                        page: 1,
                        per_page: 5,
                        total: 0
                    },
                    bottomline: {
                        total_review: 0,
                        average_score: 0,
                        star_distribution: null,
                        custom_fields_bottomline: null
                    },
                    products: [],
                    product_tags: null,
                    reviews: []
                }
            };
        });

    api.get('/store/product/:slug/reviews', async (req, res) => {
        try {
            const params = {
                perPage: 5,
                page: req.query.page,
                sort: 'date',
                direction: 'descending'
            };

            const reviews = await getYotpo(req.query.id, params);

            if(reviews)
                res.cache(true).send(reviews.response);
            else
                res.status(404).send({ok: false, error: 'Reviews not found.'});
        } catch (err) {
            console.trace(err);
            logger.error('Problem getting yotpo reviews', err, err.body);
            res.status(500).send(err.message);
        }
    });

    api.post('/store/product/:slug/review', (req, res) => {
        axios.post('https://api.yotpo.com/v1/widget/reviews', {
            appkey: config.yotpo.appKey,
            domain: 'https://bdgrowers.myshopify.com',
            sku: req.body.sku,
            product_title: req.body.product_title, // eslint-disable-line
            product_url: req.body.product_url, // eslint-disable-line
            display_name: req.body.display_name, // eslint-disable-line
            email: req.body.email,
            review_content: req.body.review_content, // eslint-disable-line
            review_title: req.body.review_title, // eslint-disable-line
            review_score: req.body.review_score // eslint-disable-line
        })
        .then((response) => res.send({
            ok: true,
            res: response.data
        }))
        .catch((err) => res.status(500).send({
            ok: false,
            error: err.response.data
        }));
    });
};
