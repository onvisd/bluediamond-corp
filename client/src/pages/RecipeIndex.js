import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';

import {connector, getRecipeCards} from '../redux/recipeCard';
import RecipeCard from '../components/API/RecipeCard';

@preload(({dispatch}) => dispatch(getRecipeCards()))
@connect(
    (state) => ({...connector(state.recipeCards)}),
    {getRecipeCards}
)
export default class RecipeIndex extends Component {
    render() {
        const {recipeCards} = this.props;
        const items = recipeCards.items;

        const cardsWithData = items.map((card) => ({
            entry: card,
            assets: recipeCards.includes.Asset
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
