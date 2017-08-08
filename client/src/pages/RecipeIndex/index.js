import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import classnames from 'classnames';
import ReactGA from 'react-ga';

import {connector, getRecipes} from 'state/recipes';
import {connector as navConnector, setNavigationStyle} from 'state/navigation';

import Title from 'components/Title';
import RecipeCard from 'components/API/RecipeCard';
import Button from 'components/Button';

import styles from './styles.module.css';

import HeroImage from 'images/backgrounds/recipe-hero.jpg';

@preload(async ({dispatch}) => {
    await Promise.all([
        dispatch(getRecipes({skip: 0, sort: 'sys.createdAt'})),
        dispatch(setNavigationStyle({className: 'brand--blue'}))
    ]);
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
        recipes: [],
        assets: [],
        totalCardCount: 0,
        skip: 6,
        perPage: 6,
        filter: null,
        sort: 'sys.createdAt',
        loading: false
    };

    handleLoadMore = () => {
        this.setState((state) => ({
            skip: state.skip + state.perPage,
            loading: true
        }));

        this.getNextRecipes();

        ReactGA.event({
            category: 'interaction',
            action: 'click',
            label: 'Recipes Load More'
        });
    }

    handleFilter = () => {
        this.setState(() => ({
            filter: this.restriction.value === '' ? null : this.restriction.value
        }));

        ReactGA.event({
            category: 'interaction',
            action: 'click',
            label: `Recipes Dietary - ${this.restriction.value || 'None'}`
        });
    };

    handleSort = () => {
        this.setState(() => ({
            sort: this.sort.value === '' ? null : this.sort.value,
            recipes: [],
            assets: [],
            loading: true
        }));

        this.props.getRecipes({skip: 0, sort: this.sort.value})
            .then((result) => {
                this.setState(() => ({
                    sort: this.sort.value === '' ? null : this.sort.value,
                    recipes: [...result.items],
                    assets: [...result.includes.Asset],
                    loading: false
                }));
            })
            .catch((err) => console.trace(err));

        ReactGA.event({
            category: 'interaction',
            action: 'click',
            label: `Recipes Sort - ${this.sort.value || 'None'}`
        });
    };

    renderRecipeCards = () => {
        const {recipes, filter} = this.state;

        let cards = recipes;

        const filterCards = (card) =>
            card.fields.consumerSymbols &&
            card.fields.consumerSymbols.indexOf(filter) !== -1;

        if(filter) cards = cards.filter(filterCards);

        return cards.map((card, i) => (
            <RecipeCard
                data={{entry: card, assets: this.state.assets}}
                key={`card${card.sys.id}${i}`}
            />
        ));
    }

    componentWillMount() {
        this.setState(() => ({
            totalCardCount: this.props.recipes.total,
            recipes: this.props.recipes.items,
            assets: this.props.recipes.includes.Asset
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

    getNextRecipes() {
        return this.props.getRecipes({skip: this.state.skip, sort: this.state.sort})
            .then((result) => {
                this.setState((state) => ({
                    recipes: [...state.recipes, ...result.items],
                    assets: [...state.assets, ...result.includes.Asset],
                    loading: false
                }));
            })
            .catch((err) => console.trace(err));
    }

    render() {
        const {skip, totalCardCount, loading} = this.state;

        return (
            <section className="content">
                <Title>Recipes</Title>
                <div className={styles.hero} style={{backgroundImage: `url(${HeroImage})`}}>
                    <div className={styles.heroInner}>
                        <h2>Creativity Never Came So Smoothly</h2>
                    </div>
                </div>
                <div className={`l--container ${styles.container}`}>
                    <div className={`l--row l--align-center ${styles.filter}`}>
                        <div className="l--col-12-at-s l--col-5">
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
                                    <option value="">Dietary Restrictions</option>
                                    <option value="Dairy-Free">Dairy-Free</option>
                                    <option value="Gluten-Free">Gluten-Free</option>
                                    <option value="Vegan">Vegan</option>
                                </select>
                            </div>
                            <div className="form--select">
                                <select
                                    onChange={this.handleSort}
                                    ref={(sort) => {
                                        this.sort = sort;
                                    }}
                                    defaultValue="sys.createdAt"
                                >
                                    <option value="">Sort by &hellip;</option>
                                    <option value="sys.createdAt">Date</option>
                                    <option value="fields.name">Name</option>
                                    <option value="fields.cookTime">Cook Time</option>
                                    <option value="fields.difficulty">Difficulty</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className={`l--row ${styles.list}`}>
                        {this.renderRecipeCards()}
                    </div>
                    <div className={classnames({isHidden: skip >= totalCardCount})}>
                        <div className="l--row l--mar-top-m l--mar-btm-m">
                            <div className="l--col-12 t--align-center">
                                <Button
                                  onClick={this.handleLoadMore}
                                  theme="blueLight"
                                  type="button"
                                  disabled={loading === true}
                                >
                                    {loading ? 'Loading...' : 'Load more recipes'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
