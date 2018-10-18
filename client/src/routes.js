import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Layout from './pages/Layout';
import Page from './pages/Page';
import GenericError from './pages/Error/500';
import NotFound from './pages/Error/404';
import Home from './pages/Home';
import Recipe from './pages/Recipe';
import RecipeIndex from './pages/RecipeIndex';
import HistoryIndex from './pages/History';
import Craft from './pages/Craft';
import Manifesto from './pages/Manifesto';
import FoodService from './pages/FoodService';
import Brand from './pages/Brand';
import BrandCategory from './pages/BrandCategory';
import Contact from './pages/Contact';
import Store from './pages/Store';
import Reset from './pages/ResetPassword';
import StoreProduct from './pages/StoreProduct';
import Press from './pages/Press';
import Signin from './pages/Signin';
import Account from './pages/Account';
import FAQs from './pages/FAQs';
import ProductLocator from './pages/ProductLocator';
import Holiday from './pages/Holiday/Home';
import HolidayRecipes from './pages/Holiday/Recipes';

export default (
    <div>
        <Route path="/holiday" component={Holiday} />
        <Route path="/holiday/recipes" component={HolidayRecipes} />
        <Route path="/" component={Layout}>
            <IndexRoute component={Home} />
            <Route path="/store/product/:slug" component={StoreProduct} />
            <Route path="/store" component={Store} />
            <Route path="/foodservice" component={FoodService} />
            <Route path="/manifesto" component={Manifesto} />
            <Route path="/craft" component={Craft} />
            <Route path="/history" component={HistoryIndex} />
            <Route path="/recipes" component={RecipeIndex} />
            <Route path="/recipes/:slug" component={Recipe} />
            <Route path="/brand/:slug" component={Brand} />
            <Route
                path="/brand/:brandSlug/:categorySlug"
                component={BrandCategory}
            />
            <Route
                path="/brand/:brandSlug/:categorySlug/:productSlug"
                component={BrandCategory}
            />
            <Route path="/contact" component={Contact} />
            <Route path="/faqs" component={FAQs} />
            <Route path="/press" component={Press} />
            <Route path="/product-locator" component={ProductLocator} />
            <Route path="/reset" component={Reset} />
            <Route path="/signin" component={Signin} />
            <Route path="/account/:view" component={Account} />
            <Route path="/404" component={NotFound} status={404} />
            <Route path="/error" component={GenericError} />
            <Route path="*" component={Page} />
        </Route>
    </div>
);
