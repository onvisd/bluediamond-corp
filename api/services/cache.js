import redis from 'redis';

import config from '../../config';
import logger from '../services/logger';

let redisClient;
if(process.env.NODE_ENV === 'production')
    redisClient = redis.createClient(config.redis.port);

const slugify = (str) => str.replace(/\//g, '_').replace(/[^A-Za-z0-9]/, '_');

const key = (req) => `${slugify(req.path.slice(1))}_${
    slugify(Object.keys(req.query).map((q) => `${q}=${req.query[q]}`).join('='))
}`;

export const setCached = (req, data, exp) => {
    if(process.env.NODE_ENV !== 'production')
        return;

    const expiresIn = exp || 3600; // default cache length of 1 hour
    if(typeof data !== 'string')
        data = JSON.stringify(data);
    return redisClient.setex(key(req), expiresIn, data);
};

export const getCached = (req, res, next) => {
    if(req.query.preview) {
        res.cache = () => res;
        return next();
    }

    redisClient.get(key(req), (err, data) => {
        if(err) {
            logger.error('Problem getting cache', err, err.message);
            res.status(500).send(err.message);
        } else if(data === null) {
            res.cache = (shouldCache) => {
                res._cache = shouldCache;
                return res;
            };

            const send = res.send.bind(res);
            res.send = (out) => {
                // If a good response is going out, cache it.
                if(res.statusCode === 200 && res._cache)
                    setCached(req, out);

                return send(out);
            };

            return next();
        } else {
            res.status(200).send(JSON.parse(data));
        }
    });
};

export const getCachedShopify = async (keyString, shopifyQuery, callback) => {
    if(process.env.NODE_ENV !== 'production') {
        const shopifyResult = await shopifyQuery();
        callback(shopifyResult);
    }

    redisClient.get(keyString, async (err, data) => {
        if(data)
            return callback(JSON.parse(data));
        else if(err)
            logger.error('Problem getting cache', err, err.message);

        const shopifyResult = await shopifyQuery();

        const expiration = 3600 * 72; // 3 days
        redisClient.setex(keyString, expiration, JSON.stringify(shopifyResult));
        callback(shopifyResult);
    });
};

export const delCached = (req) => {
    redisClient.del(key(req));
};

export const clearCached = () => {
    redisClient.flushall();
};
