import {Router} from 'express';

import {getCached} from '../services/cache';

import setupBrand from './Brand';
import setupHome from './Home';
import setupPage from './Page';
import setupProduct from './Product';
import setupRecipe from './Recipe';
import setupRecipeCard from './RecipeCard';
import setupNavigation from './Navigation';

export default () => {
    const api = Router();

	// perhaps expose some API metadata at the root
    api.get('/', (req, res) => {
        res.json({version: '1.0'});
    });

    // check the cache before hitting the endpoints
    if(process.env.NODE_ENV === 'production')
        api.use(getCached);

    setupBrand(api);
    setupHome(api);
    setupPage(api);
    setupProduct(api);
    setupRecipe(api);
    setupRecipeCard(api);
    setupNavigation(api);

    return api;
};
