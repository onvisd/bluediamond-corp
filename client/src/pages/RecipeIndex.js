import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';

import {connector, getRecipes} from '../redux/recipes';
import RecipeCard from '../components/API/RecipeCard';

@preload(({dispatch}) => dispatch(getRecipes()))
@connect(
    (state) => ({...connector(state.recipes)}),
    {getRecipes}
)
export default class RecipeIndex extends Component {
    render() {
        const {recipes} = this.props;
        const items = recipes.items;

        const cardsWithData = items.map((card) => ({
            entry: card,
            assets: recipes.includes.Asset
        }));

        return (
            <section className="content">
                {cardsWithData.map((card) =>
                    <RecipeCard data={card} key={`card${card.entry.sys.id}`} />
                )}
            </section>
        );
    }
}
