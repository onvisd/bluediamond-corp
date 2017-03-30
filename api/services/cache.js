import {redisClient} from '../app';

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
    const expiresIn = exp || 3600; // default cache length of 1 hour
    redisClient.setex(key, expiresIn, JSON.stringify(data));
};

export const delCached = (key) => {
    redisClient.del(key);
};
