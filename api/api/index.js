import {Router} from 'express';

import setupBrand from './Brand';
import setupHome from './Home';
import setupPage from './Page';
import setupProduct from './Product';
import setupRecipe from './Recipe';

export default () => {
    const api = Router();

	// perhaps expose some API metadata at the root
    api.get('/', (req, res) => {
        res.json({version: '1.0'});
    });

    setupBrand(api);
    setupHome(api);
    setupPage(api);
    setupProduct(api);
    setupRecipe(api);

    return api;
};
