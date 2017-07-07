import axios from 'axios';
import moment from 'moment';
import async from 'async';
import fs from 'fs';
import path from 'path';

const growerIDCacheFile = path.join(__dirname, '..', '..', 'grower_ids.cache');

const diff = (a, b) => b.filter((i) => a.indexOf(i) < 0);

const parseCacheFile = (data) => {
    const growerData = {};

    data.split('\n').forEach((line) => {
        if(line) {
            const idPr = line.split(':');
            growerData[idPr[0]] = idPr[1];
        }
    });

    return growerData;
};

export default (api, {contentful}) => {
    const {
        SHOPIFY_STORE_NAME,
        SHOPIFY_GROWER_API_KEY,
        SHOPIFY_GROWER_API_PASS,
        SECURED_API_TOKEN
    } = process.env;

    const today = moment().format('MM/DD/YYYY');

    const createDiscount = (id, discount, done) =>
        axios.post(
            `https://${SHOPIFY_STORE_NAME}.myshopify.com/admin/price_rules.json`,
            {
                /* eslint-disable camelcase */
                price_rule: {
                    title: `Grower Discount ${today}`,
                    target_type: 'line_item',
                    target_selection: 'all',
                    allocation_method: 'across',
                    value_type: 'percentage',
                    value: discount,
                    once_per_customer: false,
                    usage_limit: null,
                    customer_selection: 'all',
                    prerequisite_subtotal_range: null,
                    prerequisite_shipping_price_range: null,
                    starts_at: moment().toISOString(),
                    ends_at: null
                }
                /* eslint-enable camelcase */
            },
            {
                auth: {
                    username: SHOPIFY_GROWER_API_KEY,
                    password: SHOPIFY_GROWER_API_PASS
                }
            }
        )
        .then((response) =>
            axios.post(
                `https://${SHOPIFY_STORE_NAME}.myshopify.com` +
                `/admin/price_rules/${response.data.price_rule.id}/discount_codes.json`,
                {
                    /* eslint-disable camelcase */
                    discount_code: {
                        code: id
                    }
                    /* eslint-enable camelcase */
                },
                {
                    auth: {
                        username: SHOPIFY_GROWER_API_KEY,
                        password: SHOPIFY_GROWER_API_PASS
                    }
                }
            )
            .then(() => response.data.price_rule.id)
        )
        .then((pr) => {
            fs.appendFile(growerIDCacheFile, `${id}:${pr}\n`);
            setTimeout(() => done(), 1000); // ensure that we don't execute more than 2 per second
        })
        .catch((err) => {
            console.trace(err);
            done(err);
        });

    const removeDiscount = (pr, done) =>
        axios.delete(
            `https://${SHOPIFY_STORE_NAME}.myshopify.com` +
            `/admin/price_rules/${pr}.json`,
            {
                auth: {
                    username: SHOPIFY_GROWER_API_KEY,
                    password: SHOPIFY_GROWER_API_PASS
                }
            }
        )
        .then(() => {
            setTimeout(() => done(), 1000); // ensure that we don't execute more than 2 per second
        })
        .catch((err) => {
            console.trace(err);
            done(err);
        });

    const queue = async.queue((task, done) => {
        if(task.type === 'create')
            createDiscount(task.id, task.discount, done);
        else if(task.type === 'remove')
            removeDiscount(task.pr, done);
    }, 2);

    const getDiscountList = (apiParams) =>
        axios.get(
            `${apiParams.base}/spaces/${contentful.spaceId}/entries?` +
            `access_token=${apiParams.token}&content_type=growerDiscount`
        )
        .then((response) => response.data);

    api.get('/grower_discount/list', (req, res) => {
        if(req.query.token !== SECURED_API_TOKEN)
            return res.status(403).send({ok: false, err: 'Invalid token.'});

        return getDiscountList(req.apiParams)
            .then((data) => res.send(data.items[0].fields.growerIDs));
    });

    api.get('/grower_discount/clear', (req, res) => {
        if(req.query.token !== SECURED_API_TOKEN)
            return res.status(403).send({ok: false, err: 'Invalid token.'});

        new Promise((resolve, reject) => {
            fs.readFile(
                growerIDCacheFile,
                'utf8',
                (err, data) => {
                    if(err) {
                        if(err.code === 'ENOENT')
                            data = '';
                        else
                            reject(err);
                    }

                    if(!data)
                        data = '';

                    resolve(parseCacheFile(data));
                }
            );
        })
        .then((ids) => {
            queue.push(Object.keys(ids).map((id) => ({type: 'remove', pr: ids[id]})));
            fs.writeFile(growerIDCacheFile, '');
            res.send({ok: true});
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send({ok: false, err: err.message});
        });
    });

    api.get('/grower_discount', (req, res) => {
        if(req.query.token !== SECURED_API_TOKEN)
            return res.status(403).send({ok: false, err: 'Invalid token.'});

        let currentGrowerIDs;

        new Promise((resolve, reject) => {
            fs.readFile(
                growerIDCacheFile,
                'utf8',
                (err, data) => {
                    if(err) {
                        if(err.code === 'ENOENT')
                            data = '';
                        else
                            reject(err);
                    }

                    if(!data)
                        data = '';

                    currentGrowerIDs = parseCacheFile(data);
                    resolve();
                }
            );
        })
        .then(() => getDiscountList(req.apiParams))
        .then((data) => {
            const existingGrowerIDList = Object.keys(currentGrowerIDs);
            const newGrowerIDList = data.items[0].fields.growerIDs.split('\n');
            const discount = data.items[0].fields.discount;

            const newIDs = diff(existingGrowerIDList, newGrowerIDList);
            const removedIDs = diff(newGrowerIDList, existingGrowerIDList);

            const unchanged = existingGrowerIDList
                .filter((id) => newIDs.indexOf(id) < 0 && removedIDs.indexOf(id) < 0)
                .map((id) => `${id}:${currentGrowerIDs[id]}`)
                .join('\n');

            fs.writeFile(growerIDCacheFile, unchanged, () => {
                // Update cache file to only include unchanged IDs, then queue new IDs

                queue.push(newIDs.map((id) => ({type: 'create', id, discount})));
            });

            queue.push(removedIDs.map((id) => ({type: 'remove', pr: currentGrowerIDs[id]})));

            return res.send({ok: true});
        })
        .catch((err) => {
            console.trace(err);
            res.status(500).send({ok: false, err: err.message});
        });
    });
};
