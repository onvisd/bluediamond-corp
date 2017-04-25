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

export default (
    <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        <Route path="history" component={HistoryIndex} />
        <Route path="recipes" component={RecipeIndex} />
        <Route path="recipe/:slug" component={Recipe} />
        <Route path="404" component={NotFound} status={404} />
        <Route path="error" component={GenericError} />
        <Route path="*" component={Page} />
    </Route>
);
