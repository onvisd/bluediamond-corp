import {clearCached} from '../services/cache';

const {
    SECURED_API_TOKEN
} = process.env;

export default (api) => {
    api.post('/cache/clear', (req, res) => {
        if(req.query.token !== SECURED_API_TOKEN && req.body.token !== SECURED_API_TOKEN)
            return res.status(403).send({ok: false, err: 'Invalid token.'});

        clearCached();
        res.send({ok: true});
    });
};
