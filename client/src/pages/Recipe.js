import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector, getRecipe} from '../redux/recipe';

import RecipeHead from '../components/API/RecipeHead';
import RecipeStep from '../components/API/RecipeStep';
import ProductCard from '../components/API/ProductCard';
import RecipeCard from '../components/API/RecipeCard';

@preload(({dispatch, parameters}) => dispatch(getRecipe(parameters.slug)))
@connect(
    (state) => ({...connector(state.recipe)}),
    {getRecipe}
)
export default class Recipe extends Component {
    render() {
        const {recipe} = this.props;
        const item = recipe.items[0];
        const assets = recipe.includes.Asset;

        const stepEntries = {};
        const productEntries = {};
        const recipeEntries = {};

        recipe.includes.Entry.forEach((entry) => {
            if(entry.sys.contentType.sys.id === 'recipeStep')
                stepEntries[entry.sys.id] = entry;
            else if(entry.sys.contentType.sys.id === 'product')
                productEntries[entry.sys.id] = entry;
            else if(entry.sys.contentType.sys.id === 'recipe')
                recipeEntries[entry.sys.id] = entry;
        });

        const steps = item.fields.steps.map((step) => stepEntries[step.sys.id]);
        const includedProducts = item.fields.includedProducts
                                    .map((product) => productEntries[product.sys.id]);
        const includedRecipes = item.fields.relatedRecipes
                                    .map((recipeItem) => recipeEntries[recipeItem.sys.id]);

        return (
            <section className="content">
                <Title>{`Recipe: ${item.fields.name}`}</Title>
                <RecipeHead data={recipe} />
                <div className="l--container">
                    <div className="l--row">
                        <div className="l--col-12-at-s l--col-8">
                            <p><strong>Directions</strong></p>
                            <ol className="t--list-unstyled">
                                {steps.map((step, idx) => <RecipeStep data={step} key={`step${idx}`} />)}
                            </ol>
                        </div>
                        <div className="l--col-12-at-s l--col-4">
                            <p><strong>Blue Diamond products included</strong></p>
                            {includedProducts.map((product, idx) => <ProductCard data={{
                                items: [product],
                                includes: recipe.includes
                            }} key={`product${idx}`} />)}
                        </div>
                    </div>
                    <div className="l--row">
                        <div className="l--col-12">
                            <h3>Related Recipes</h3>
                            <div className="l--row recipeCards--container">
                                {includedRecipes.map((recipeItem, idx) => <RecipeCard data={{
                                    entry: recipeItem,
                                    assets: assets.filter((asset) => asset.sys.id ===
                                    recipeItem.fields.cardBackgroundImage.sys.id)
                                }} key={`recipe${idx}`} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
