import {clearCached} from '../services/cache';

const {
    SECURED_API_TOKEN
} = process.env;

export default (api) => {
    api.get('/cache/clear', (req, res) => {
        if(req.query.token !== SECURED_API_TOKEN)
            return res.status(403).send({ok: false, err: 'Invalid token.'});

        clearCached();
        res.send({ok: true});
    });
};
