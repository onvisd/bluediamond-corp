import {Router} from 'express';

export default () => {
    const api = Router();

	// perhaps expose some API metadata at the root
    api.get('/', (req, res) => {
        res.json({version: '1.0'});
    });

    return api;
};
