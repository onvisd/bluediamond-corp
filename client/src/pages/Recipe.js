import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector, getRecipe} from '../redux/recipe';

import RecipeHead from '../components/API/RecipeHead';
import RecipeStep from '../components/API/RecipeStep';

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
        recipe.includes.Entry.forEach((entry) => {
            if(entry.sys.contentType.sys.id === 'recipeStep')
                stepEntries[entry.sys.id] = entry;
        });

        const steps = item.fields.steps.map((step) => stepEntries[step.sys.id]);

        return (
            <section className="content">
                <Title>{`Recipe: ${item.fields.name}`}</Title>
                <RecipeHead data={recipe} />
                {steps.map((step) => <RecipeStep data={step} />)}
            </section>
        );
    }
}
