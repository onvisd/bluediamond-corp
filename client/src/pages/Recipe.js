import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector, getRecipe} from '../redux/recipe';

import RecipeHead from '../components/API/RecipeHead';
import RecipeStep from '../components/API/RecipeStep';
import ProductCard from '../components/API/ProductCard';

@preload(({dispatch, parameters}) => dispatch(getRecipe(parameters.slug)))
@connect(
    (state) => ({...connector(state.recipe)}),
    {getRecipe}
)
export default class Recipe extends Component {
    render() {
        const {recipe} = this.props;
        const item = recipe.items[0];

        const stepEntries = {};
        const productEntries = {};
        recipe.includes.Entry.forEach((entry) => {
            if(entry.sys.contentType.sys.id === 'recipeStep')
                stepEntries[entry.sys.id] = entry;
            else if(entry.sys.contentType.sys.id === 'product')
                productEntries[entry.sys.id] = entry;
        });

        const steps = item.fields.steps.map((step) => stepEntries[step.sys.id]);
        const includedProducts = item.fields.includedProducts
                                    .map((product) => productEntries[product.sys.id]);

        return (
            <section className="content">
                <Title>{`Recipe: ${item.fields.name}`}</Title>
                <RecipeHead data={recipe} />
                <div>
                    <h2>Directions</h2>
                    <ol>
                        {steps.map((step, idx) => <RecipeStep data={step} key={`step${idx}`} />)}
                    </ol>
                </div>
                <div>
                    <h2>Included Products</h2>
                    <ol>
                        {includedProducts.map((product, idx) => <ProductCard data={{
                            items: [product],
                            includes: recipe.includes
                        }} key={`product${idx}`} />)}
                    </ol>
                </div>
            </section>
        );
    }
}
