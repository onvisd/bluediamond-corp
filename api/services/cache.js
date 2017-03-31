import redis from 'redis';

import config from '../../config';

let redisClient;
if(process.env.NODE_ENV === 'production')
    redisClient = redis.createClient(config.redis.port);

export const getCached = (req, res, next) => {
    const key = req.path.slice(1).replace(/\//g, '_');

    redisClient.get(key, (err, data) => {
        if(err)
            res.status(500).send(err.message);
        else if(data === null)
            return next();
        else
            res.send(JSON.parse(data));
    });
};

export const setCached = (key, data, exp) => {
    if(process.env.NODE_ENV !== 'production') {
        const expiresIn = exp || 3600; // default cache length of 1 hour
        return redisClient.setex(key, expiresIn, JSON.stringify(data));
    }

    return;
};

export const delCached = (key) => {
    redisClient.del(key);
};
