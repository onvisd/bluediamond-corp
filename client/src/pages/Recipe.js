import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector, getRecipe} from '../redux/recipe';

@preload(({dispatch, parameters}) => dispatch(getRecipe(parameters.slug)))
@connect(
    (state) => ({...connector(state.recipe)}),
    {getRecipe}
)
export default class Recipe extends Component {
    render() {
        return (
            <section className="content">
                <Title>Recipe</Title>
                {JSON.stringify(this.props.recipe)}
            </section>
        );
    }
}
