import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Layout from './pages/Layout';
import Page from './pages/Page';
import GenericError from './pages/Error';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import RecipeIndex from './pages/RecipeIndex';
import HistoryIndex from './pages/History';
import Craft from './pages/Craft';
import Manifesto from './pages/Manifesto';
import Brand from './pages/Brand';
import Contact from './pages/Contact';
import Store from './pages/Store';
import StoreProduct from './pages/StoreProduct';

export default (
    <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="store" component={Store} />
        <Route path="/store/products/:slug" component={StoreProduct} />
        <Route path="/manifesto" component={Manifesto} />
        <Route path="/craft" component={Craft} />
        <Route path="/history" component={HistoryIndex} />
        <Route path="/recipes" component={RecipeIndex} />
        <Route path="/recipes/:slug" component={Recipe} />
        <Route path="/brand/:slug" component={Brand} />
        <Route path="/contact" component={Contact} />
        <Route path="/404" component={NotFound} status={404} />
        <Route path="/error" component={GenericError} />
        <Route path="*" component={Page} />
    </Route>
);
