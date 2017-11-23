import axios from 'axios';
import gql from 'graphql-tag';
import ImgixClient from 'imgix-core-js';

import config from '../../config';
import logger from '../services/logger';
import {getCachedShopify} from '../services/cache';
import compareOptions from '../tools/compareProductOptions';

const maxPageoptions = 16;

const imgixClient = new ImgixClient({
    host: config.imgix.host,
    secureURLToken: config.imgix.secureURLToken
});

const paramToFilter = (param) => {
    try {
        return param.split('|');
    } catch (e) {
        return [];
    }
};

const formatFilters = (productType, tags, options, collections) => {
    return {
        collections: paramToFilter(collections),
        productType: paramToFilter(productType),
        tags: paramToFilter(tags),
        options: paramToFilter(options)
    };
};

const getOptions = (product, type) => {
    let options = [];

    for (let i = 0; i < product.node.options.length; i++) {
        const option = product.node.options[i];
        const name = option.name;

        if(name === type) // get specfic options based on it's name
            options = options.concat(option.values);
    }

    return options;
};

const escapeRegEx = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');

const unslugify = (str) => {
    const toUpperCase = str.charAt(0).toUpperCase();
    const toCapsCase = str.slice(1).toLowerCase();
    const newStr = (match, group1) => ` ${group1.toUpperCase()}`;
    const replace = toCapsCase.replace(/[-|_](.)/g, newStr);
    return `${toUpperCase}${replace}`;
};


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
                                    collections(first: 250) {
                                        edges {
                                            node {
                                                title
                                            }
                                        }
                                    }
                                    options(first: 250) {
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
                                    variants(first: 250) {
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

    const getCachedProducts = async (callback) =>
        getCachedShopify('shopify-all-products', getProducts, callback);

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
                                    collections(first: 250) {
                                        edges {
                                            node {
                                                title
                                            }
                                        }
                                    }
                                    options(first: 250) {
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
                                    variants(first: 250) {
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
                            collections(first: 250) {
                                edges {
                                    node {
                                        title
                                    }
                                }
                            }
                            options(first: 250) {
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
                            variants(first: 250) {
                                edges {
                                    node {
                                        id
                                        title
                                        weight
                                        availableForSale
                                        price
                                        compareAtPrice
                                        image {
                                            id
                                            src
                                            altText
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

    const filterByTag = (arr) => {
        const items = [];

        for (let i = 0; i < arr.length; i++) {
            const item = JSON.stringify(arr[i]).match(new RegExp('flavor:([^,"]*)', 'g'));

            if(item)
                items.push(item[0].split(':')[1].replace('"', ''));
        }

        return items;
    };

    const filterByOption = (arr) => {
        const options = arr.reduce((a, b) => a.concat(b), []);
        const items = [];

        for (let i = 0; i < options.length; i++) {
            const option = options[i];

            if(option)
                items.push(option.values);
        }

        return items.reduce((a, b) => a.concat(b), []);
    };

    const filterByCollection = (arr) => {
        const collections = arr.reduce((a, b) => a.concat(b), []);
        const items = [];

        for (let i = 0; i < collections.length; i++) {
            const collection = collections[i].node;
            items.push(collection.title);
        }

        return items;
    };


    const buildFilterResult = (arr) => {
        arr = arr.filter((item) => item !== '');
        return new Set(arr);
    };


    const filterProduct = (skipFilter, filter, search) => (product) => {
        const title = product.node.title;
        const type = product.node.productType;
        const tags = JSON.stringify(product.node.tags);

        let tag = '';
        if(/flavor:([^,"]*)/.test(tags)) tag = tags.match(/flavor:([^,"]*)/)[1];

        const options = getOptions(product, 'Size');

        let brandMatch = (skipFilter === 'productType');
        for (let i = 0; i < filter.productType.length; i++) {
            if(type.match(filter.productType[i]))
                brandMatch = filter.productType[i];
        }

        let typeMatch = (skipFilter === 'tags');
        for (let i = 0; i < filter.tags.length; i++) {
            if(tag && tag.match(filter.tags[i]))
                typeMatch = filter.tags[i];
        }

        let optionsMatch = (skipFilter === 'options');
        for (let i = 0; i < filter.options.length; i++) {
            if(compareOptions(options, filter.options[i]))
                optionsMatch = filter.options[i];
        }

        const collections = product.node.collections.edges.map((col) => col.node.title);

        let categoryMatch = (skipFilter === 'collections');
        for (let i = 0; i < filter.collections.length; i++) {
            if(collections.indexOf(filter.collections[i]) > -1)
                categoryMatch = filter.collections[i];
        }

        let searchMatch = false;
        if(title.toLowerCase().match(escapeRegEx(unslugify(search).toLowerCase())))
            searchMatch = true;

        if((brandMatch || !filter.productType.length) &&
            (typeMatch || !filter.tags.length) &&
            (optionsMatch || !filter.options.length) &&
            (categoryMatch || !filter.collections.length) &&
            (searchMatch || !search.length)
        )
            return true;

        return false;
    };

    // Sorts the available cards
    const sortProduct = (sort) => {
        let getProductField = (product) => product[sort];

        if(sort === 'name')
            getProductField = (product) => product.node.title.toUpperCase();

        if(sort === 'brand')
            getProductField = (product) => product.node.productType.toUpperCase();

        return (productA, productB) => {
            if(getProductField(productA) > getProductField(productB)) return 1;
            if(getProductField(productA) < getProductField(productB)) return -1;
            return 0;
        };
    };

    const filteredProductOpts = (filterType, filteredProducts) => {
        let items;

        if(filterType === 'productType') {
            items =
                filteredProducts.map((product) => product.node[filterType]);
        }

        if(filterType === 'tags') {
            items =
                filterByTag(filteredProducts.map((product) => product.node[filterType]));
        }

        if(filterType === 'options') {
            items =
                filterByOption(filteredProducts.map((product) => product.node[filterType]));
        }

        if(filterType === 'collections') {
            items = filterByCollection(filteredProducts.map((product) => (
                product.node[filterType].edges)
            ));
        }

        return buildFilterResult(items);
    };

    api.get('/store/filters', async(req, res) => {
        try {
            const {productType, tags, options, collections} = req.query;
            let {search} = req.query;
            const queryFilters = formatFilters(productType, tags, options, collections);
            search = search ? search.trim() : '';

            getCachedProducts((products) => {
                const filters = {
                    productType: new Set(queryFilters.productType),
                    tags: new Set(queryFilters.tags),
                    options: new Set(queryFilters.options),
                    collections: new Set(queryFilters.collections)
                };

                if(products) {
                    Object.keys(filters).forEach((filterType) => {
                        const filteredProducts =
                            products.filter(filterProduct(filterType, queryFilters, search));

                        const filteredOptions =
                            filteredProductOpts(filterType, filteredProducts);

                        filters[filterType] =
                            new Set([...filteredOptions, ...filters[filterType]]);
                    });
                }

                if(filters)
                    res.cache(true).send(filters);
                else
                    res.status(401).send({message: 'No filters found!'});
            });
        } catch (err) {
            console.trace(err);
            logger.error('Problem getting shopify product filters', err, err.body);
            res.status(500).send(err.message);
        }
    });

    api.get('/store/products', async (req, res) => {
        try {
            const {productType, tags, options, collections, sort} = req.query;
            let {search, page} = req.query;
            const filters = formatFilters(productType, tags, options, collections);
            const images = {};
            search = search ? search.trim() : '';
            page = parseInt(page) || 0;

            getCachedProducts((products) => {
                products = products.filter(filterProduct(null, filters, search));

                const total = products.length;
                if(sort)
                    products = products.sort(sortProduct(sort));

                products = products.slice(
                        page * maxPageoptions,
                        (page * maxPageoptions) + maxPageoptions
                    );

                products.forEach((product) => {
                    product.node.images.edges.forEach((image) => {
                        if(!images[image.node.id])
                            images[image.node.id] = {};

                        [128, 256, 512, 1024, 1536, 2048].map((imgOpts) => {
                            images[image.node.id][imgOpts] = imgixClient.buildURL(image.node.src, {
                                w: imgOpts,
                                h: imgOpts,
                                fit: 'max',
                                bg: 'fff',
                                auto: 'compress'
                            });
                        });
                    });
                });

                const nextPage = page + 1;

                if(products)
                    res.cache(true).send({products, images, total, nextPage});
                else
                    res.status(401).send({message: 'No products found!'});
            });
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

                            [128, 256, 512, 1024, 1536, 2048].map((options) => {
                                images[image.node.id][options] = imgixClient.buildURL(
                                    image.node.src, {
                                        w: options,
                                        h: options,
                                        fit: 'max',
                                        bg: 'fff',
                                        auto: 'compress'
                                    }
                                );
                            });
                        });
                    });
                }

                productData.images.edges.forEach((image) => {
                    if(!images[image.node.id])
                        images[image.node.id] = {};

                    [128, 256, 512, 1024, 1536, 2048].map((options) => {
                        images[image.node.id][options] = imgixClient.buildURL(image.node.src, {
                            w: options,
                            h: options,
                            fit: 'max',
                            bg: 'fff',
                            auto: 'compress'
                        });
                    });
                });
                product.images = images;

                const variants = [];
                productData.variants.edges.forEach((variant) => {
                    let image = {};

                    if(variant && variant.node.image) {
                        [128, 256, 512, 1024, 1536, 2048].map((size) => {
                            image[size] = imgixClient.buildURL(variant.node.image.src, {
                                w: size,
                                h: size,
                                fit: 'max',
                                bg: 'fff',
                                auto: 'compress'
                            });
                        });
                    } else {
                        image = {};
                    }

                    variant = {...variant, node: {...variant.node}};
                    variant.node.image = image;
                    variants.push(variant);
                });
                product.variants = variants;

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
