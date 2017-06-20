import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import classnames from 'classnames';

import {connector, getRecipes} from 'state/recipes';
import {connector as navConnector, setNavigationStyle} from 'state/navigation';

import Title from 'components/Title';
import RecipeCard from 'components/API/RecipeCard';
import Button from 'components/Button';

import styles from './styles.module.css';

import HeroImage from 'images/backgrounds/recipe-hero.jpg';

@preload(async ({dispatch}) => {
    const recipes = await dispatch(getRecipes());
    dispatch(setNavigationStyle({className: 'brand--blue'}));

    return recipes;
})
@connect(
    (state) => ({
        ...connector(state.recipes),
        ...navConnector(state.navigation)
    }),
    {getRecipes, setNavigationStyle}
)
export default class RecipeIndex extends Component {
    state = {
        totalCardCount: 0,
        visibleCardCount: 6,
        perPage: 6,
        filter: null,
        sort: null
    };

    handleLoadMore = () => {
        this.setState((state) => ({
            visibleCardCount: state.visibleCardCount + state.perPage
        }));
    }

    handleFilter = () => {
        this.setState(() => ({
            filter: this.restriction.value === 'null' ? null : this.restriction.value
        }));
    };

    handleSort = () => {
        this.setState(() => ({
            sort: this.sort.value === 'null' ? null : this.sort.value
        }));
    };

    renderRecipeCards = () => {
        const {recipes} = this.props;
        const {visibleCardCount, filter, sort} = this.state;

        let cards = recipes.items.slice(0, visibleCardCount);

        const filterCards = (card) =>
            card.fields.dietaryRestrictions &&
            card.fields.dietaryRestrictions.indexOf(filter) !== -1;

        const sortCards = (field) => {
            const difficultyLevels = {easy: 0, medium: 1, hard: 2};

            let getCardField = (card) => card.fields[field];
            if(sort === 'name')
                getCardField = (card) => card.fields.name.toUpperCase();
            if(sort === 'difficulty')
                getCardField = (card) => difficultyLevels[card.fields.difficulty.toLowerCase()];
            if(sort === 'cooktime')
                getCardField = (card) => card.fields.cookTime;

            return (cardA, cardB) => {
                if(getCardField(cardA) > getCardField(cardB)) return 1;
                if(getCardField(cardA) < getCardField(cardB)) return -1;
                return 0;
            };
        };

        if(filter) cards = cards.filter(filterCards);
        if(sort) cards = cards.sort(sortCards(sort));

        return cards.map((card) => (
            <RecipeCard
                data={{entry: card, assets: recipes.includes.Asset}}
                key={`card${card.sys.id}`}
            />
        ));
    }

    componentWillMount() {
        this.setState(() => ({
            totalCardCount: this.props.recipes.items.length
        }));

        this.props.setNavigationStyle({className: 'brand--blue'});
    }

    componentWillUpdate(nextProps) {
        if(!nextProps.navigation.style.className)
            this.props.setNavigationStyle({className: 'brand--blue'});
    }

    componentWillUnmount() {
        this.props.setNavigationStyle({});
    }

    render() {
        const {visibleCardCount, totalCardCount} = this.state;

        return (
            <section className="content">
                <Title>Recipes</Title>
                <div className={styles.hero} style={{backgroundImage: `url(${HeroImage})`}}>
                    <div className={styles.heroInner}>
                        <h2>Creativity Never Came So Smoothly</h2>
                    </div>
                </div>
                <div className={`l--container ${styles.container}`}>
                    <div className="l--row l--align-center">
                        <div className={`l--col-12-at-s l--col-5 ${styles.filter}`}>
                            <h3 className={styles.title}>
                                All recipes
                                <small> ({totalCardCount})</small>
                            </h3>
                        </div>
                        <div className="l--col-12-at-s l--col-7 form--group">
                            <div className="form--select">
                                <select
                                    onChange={this.handleFilter}
                                    ref={(restriction) => {
                                        this.restriction = restriction;
                                    }}
                                >
                                    <option value="null">Dietary Restrictions</option>
                                    <option value="Non-Diary">Non-Dairy</option>
                                    <option value="Gluten Free">Gluten Free</option>
                                </select>
                            </div>
                            <div className="form--select">
                                <select
                                    onChange={this.handleSort}
                                    ref={(sort) => {
                                        this.sort = sort;
                                    }}
                                >
                                    <option value="null">Sort by &hellip;</option>
                                    <option value="name">Name</option>
                                    <option value="cooktime">Cook Time</option>
                                    <option value="difficulty">Difficulty</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={`l--row ${styles.list}`}>
                        {this.renderRecipeCards()}
                    </div>
                    <div className={classnames({isHidden: visibleCardCount >= totalCardCount})}>
                        <div className="l--row l--mar-top-m l--mar-btm-m">
                            <div className="l--col-12 t--align-center">
                                <Button onClick={this.handleLoadMore} theme="blueLight">
                                    Load more recipes
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
