import axios from 'axios';
import gql from 'graphql-tag';

import config from '../../config';

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
            `
        }).then((result) => result.data.shop.products.edges);

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
            `
        }).then((result) => result.data.shop.products.edges);

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
            `
        }).then((result) => result.data.shop.productByHandle);

    const getSmartLabel = (id) =>
        axios.get(`https://smartlabel-api.labelinsight.com/api/v3/${id}`)
        .then((response) => response.data)
        .catch((err) => {
            console.trace(err);
            return 'No Smart Label data found';
        });

    const getYotpo = (id) =>
        axios.get(
            `https://api.yotpo.com/v1/widget/${config.yotpo.key}` +
            `/products/${id}/reviews.json`
        )
        .then((response) => response.data)
        .catch((err) => {
            console.trace(err);
            return 'No YotPo data found';
        });

    api.get('/store/products', async (req, res) => {
        try {
            const products = await getProducts();

            if(products)
                res.status(200).send(products);
            else
                res.status(401).send({message: 'No products found!'});
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });

    api.get('/store/product/:slug', async (req, res) => {
        try {
            const theProduct = await getProduct(req.params.slug);

            if(theProduct) {
                const product = {...theProduct};
                const tags = product.tags;
                const productTags = JSON.stringify(tags);
                const productType = product.productType;

                const getLabel = (str) => str.match(/smartLabel:(\d*)/)[1];
                const getProductId = (str) => str.match(/id:(\d*)/)[1];

                if(tags.length > 0 && /smartLabel:(\d*)/.test(productTags)) {
                    const smartLabelId = getLabel(productTags);
                    const smartLabel = await getSmartLabel(smartLabelId);
                    const amendSmartLabel = typeof smartLabel === 'string'
                        ? {error: smartLabel}
                        : smartLabel;
                    product.smartLabel = {...amendSmartLabel};
                }

                if(tags.length > 0 && /id:(\d*)/.test(productTags)) {
                    const productId = getProductId(productTags);
                    const yotpo = await getYotpo(productId);
                    const amendYotpo = typeof yotpo === 'string'
                        ? {error: yotpo}
                        : yotpo;
                    product.reviews = {...amendYotpo.response};
                }

                if(productType) {
                    const productsByType = await getProductsByType(productType);
                    const amendRelated = typeof productsByType === 'string'
                        ? {error: productsByType}
                        : productsByType;
                    product.related = [...amendRelated];
                }

                res.cache(true).send(product);
            } else {
                res.status(401).send({message: 'No product found!'});
            }
        } catch (err) {
            console.trace(err);
            res.status(500).send(err.message);
        }
    });
};
