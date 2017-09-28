import axios from 'axios';
import gql from 'graphql-tag';
import ImgixClient from 'imgix-core-js';

import config from '../../config';
import logger from '../services/logger';

const imgixClient = new ImgixClient({
    host: config.imgix.host,
    secureURLToken: config.imgix.secureURLToken
});

export default (api, {apolloClient}) => {
    const getProducts = () =>
        apolloClient.query({
            query: gql`
                query {
                    shop {
                        products(first: 250) {
                            edges {
                                node {
                                    id
                                    handle
                                    productType
                                    tags
                                    vendor
                                    title
                                    descriptionHtml
                                    collections(first: 3) {
                                        edges {
                                            node {
                                                title
                                            }
                                        }
                                    }
                                    options(first: 3) {
                                        id
                                        name
                                        values
                                    }
                                    images(first: 10) {
                                        edges {
                                            node {
                                                id
                                                src
                                                altText
                                            }
                                        }
                                    }
                                    variants(first: 3) {
                                        edges {
                                            node {
                                                id
                                                title
                                                weight
                                                availableForSale
                                                price
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `,
            fetchPolicy: 'network-only'
        })
        .then((result) => result.data.shop.products.edges)
        .catch((err) => logger.error('Problem getting shopify products', err, err.body));

    const getProductsByType = (type) =>
        apolloClient.query({
            query: gql`
                query {
                    shop {
                        products(first: 6, query:"productType=${type}") {
                            edges {
                                node {
                                    id
                                    handle
                                    productType
                                    tags
                                    vendor
                                    title
                                    descriptionHtml
                                    collections(first: 3) {
                                        edges {
                                            node {
                                                title
                                            }
                                        }
                                    }
                                    options(first: 3) {
                                        id
                                        name
                                        values
                                    }
                                    images(first: 10) {
                                        edges {
                                            node {
                                                id
                                                src
                                                altText
                                            }
                                        }
                                    }
                                    variants(first: 3) {
                                        edges {
                                            node {
                                                id
                                                title
                                                weight
                                                availableForSale
                                                price
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            `,
            fetchPolicy: 'network-only'
        })
        .then((result) => result.data.shop.products.edges)
        .catch((err) => logger.error('Problem getting shopify producByType', err, err.body));

    const getProduct = (slug) =>
        apolloClient.query({
            query: gql`
                query {
                    shop {
                        productByHandle(handle: "${slug}") {
                            id
                            handle
                            productType
                            tags
                            vendor
                            title
                            descriptionHtml
                            collections(first: 3) {
                                edges {
                                    node {
                                        title
                                    }
                                }
                            }
                            options(first: 25) {
                                id
                                name
                                values
                            }
                            images(first: 10) {
                                edges {
                                    node {
                                        id
                                        src
                                        altText
                                    }
                                }
                            }
                            variants(first: 4) {
                                edges {
                                    node {
                                        id
                                        title
                                        weight
                                        availableForSale
                                        price
                                    }
                                }
                            }
                        }
                    }
                }
            `,
            fetchPolicy: 'network-only'
        })
        .then((result) => result.data.shop.productByHandle)
        .catch((err) => logger.error('Problem getting shopify producByHandle', err, err.body));

    const getSmartLabel = (id) =>
        axios.get(`https://smartlabel-api.labelinsight.com/api/v3/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            console.trace(err);
            logger.error('No Smart Label data found', err, err.body);
            return 'No Smart Label data found';
        });

    const getYotpo = (id) =>
        axios.get(
            `https://api.yotpo.com/v1/widget/${config.yotpo.key}` +
            `/products/${id}/reviews.json`,
            {
                timeout: 3000
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
                        per_page: 5, // eslint-disable-line
                        total: 0
                    },
                    bottomline: {
                        total_review: 0, // eslint-disable-line
                        average_score: 0, // eslint-disable-line
                        star_distribution: null, // eslint-disable-line
                        custom_fields_bottomline: null // eslint-disable-line
                    },
                    products: [],
                    product_tags: null, // eslint-disable-line
                    reviews: []
                }
            };
        });

    api.get('/store/products', async (req, res) => {
        try {
            const products = await getProducts();
            const images = {};

            products.forEach((product) => {
                product.node.images.edges.forEach((image) => {
                    if(!images[image.node.id])
                        images[image.node.id] = {};

                    [128, 256, 512, 1024, 1536, 2048].map((size) => {
                        images[image.node.id][size] = imgixClient.buildURL(image.node.src, {
                            w: size,
                            h: size,
                            fit: 'max',
                            bg: 'fff'
                        });
                    });
                });
            });

            if(products)
                res.status(200).send({products, images});
            else
                res.status(401).send({message: 'No products found!'});
        } catch (err) {
            console.trace(err);
            logger.error('Problem getting shopify products', err, err.body);
            res.status(500).send(err.message);
        }
    });

    api.get('/store/product/:slug', async (req, res) => {
        try {
            const productData = await getProduct(req.params.slug);
            const images = {};

            if(productData) {
                const product = {product: productData};
                const tags = productData.tags;
                const productTags = JSON.stringify(tags);
                const productType = productData.productType;

                const getLabel = (str) => str.match(/smartLabel:(\d*)/)[1];
                const getProductId = (str) => str.match(/id:(\d*)/)[1];

                if(tags.length > 0 && /smartLabel:(\d*)/.test(productTags)) {
                    const smartLabelId = getLabel(productTags);
                    if(smartLabelId) {
                        const smartLabel = await getSmartLabel(smartLabelId);
                        const smartLabelData = typeof smartLabel === 'string'
                            ? {error: smartLabel}
                            : smartLabel;
                        product.smartLabel = smartLabelData;
                    } else {
                        product.smartLabel = {error: 'No SmartLabel ID'};
                    }
                }

                if(tags.length > 0 && /id:(\d*)/.test(productTags)) {
                    const productId = getProductId(productTags);
                    const yotpo = await getYotpo(productId);
                    product.reviews = yotpo.response;
                }

                if(productType) {
                    const productsByType = await getProductsByType(productType);
                    const relatedProductsData = typeof productsByType === 'string'
                        ? {error: productsByType}
                        : productsByType;
                    product.related = relatedProductsData;
                }

                if(product.related && !product.related.error) {
                    product.related.forEach((prod) => {
                        prod.node.images.edges.forEach((image) => {
                            if(!images[image.node.id])
                                images[image.node.id] = {};

                            [128, 256, 512, 1024, 1536, 2048].map((size) => {
                                images[image.node.id][size] = imgixClient.buildURL(
                                    image.node.src, {
                                        w: size,
                                        h: size,
                                        fit: 'max',
                                        bg: 'fff'
                                    }
                                );
                            });
                        });
                    });
                }

                productData.images.edges.forEach((image) => {
                    if(!images[image.node.id])
                        images[image.node.id] = {};

                    [128, 256, 512, 1024, 1536, 2048].map((size) => {
                        images[image.node.id][size] = imgixClient.buildURL(image.node.src, {
                            w: size,
                            h: size,
                            fit: 'max',
                            bg: 'fff'
                        });
                    });
                });
                product.images = images;

                res.cache(true).send(product);
            } else {
                res.status(404).send({ok: false, error: 'not found'});
            }
        } catch (err) {
            console.trace(err);
            logger.error('Problem getting shopify product', err, err.body);
            res.status(500).send(err.message);
        }
    });
};
