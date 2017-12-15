import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import classnames from 'classnames';
import ReactGA from 'react-ga';
import debounce from 'lodash/debounce';

import {connector, getRecipes} from 'state/recipes';
import {connector as navConnector, setNavigationStyle} from 'state/navigation';

import Title from 'components/Title';
import Meta from 'components/Meta';
import RecipeCard from 'components/API/RecipeCard';
import Button from 'components/Button';
import ProductFilter from 'components/ProductFilter';

import addQuery from 'tools/addQuery';
import removeQuery from 'tools/removeQuery';
import filterViaParam from 'tools/filterViaParam';
import callFloodlight from 'tools/callFloodlight';

import styles from './styles.module.css';

import HeroImage from 'images/backgrounds/recipe-hero.jpg';


const filterSelections = {
    category: ['Smoothies & Shakes', 'Soups & Chillis', 'Cakes, Pies & Cookies', 'Ice Cream & Popscicles',
        'Pancake, Waffles & Muffins', 'Breads & Biscuits', 'Pasta', 'Slow Cooker', 'No Bake & Overnight', 'Drinks',
        'Appetizers & Sides', 'Main Dishes', 'Breakfast', 'Lunch', 'Dinner', 'Desserts'
    ],
    seasonal: ['Spring', 'Summer', 'Fall', 'Winter', 'Tailgate & Superbowl', 'Parties', 'Holiday', 'Easter',
        'Fourth of July', 'Halloween', 'St. Pattty', 'V-Day'
    ],
    dietary: ['Dairy-Free', 'Gluten-Free', 'Vegan'],
    almondBreezeFlavor: ['Unsweetened', 'Original', 'Vanilla', 'Chocolate', 'Hint of Honey'],
    featured: ['Food Festival', 'TV / Website', 'Magazine', 'Food Blogger'],
    difficulty: ['Easy', 'Medium', 'Hard'],
    ingredients: ['Chicken', 'Beef', 'Shrimp', 'Fish']
};

const initFilterState = (location) => {
    const query = location.query;
    const result = {};

    Object.keys(filterSelections).map(function(filterTitle) {
        const param = new Set(filterViaParam(filterTitle, query));
        const filters = {};
        filterSelections[filterTitle].map(function(f) {
            // handle special case where 'Dairy-Free' is unslugified to 'Dairy Free'
            filters[f] = param.has(f.replace('-', ' '));
        });
        result[filterTitle] = filters;
    });

    return result;
};

@preload(async ({dispatch, location}) => {
    await Promise.all([
        dispatch(getRecipes({skip: 0, sort: 'sys.createdAt', filters: initFilterState(location)})),
        dispatch(setNavigationStyle({className: 'brand--blue'}))
    ]);
})
@connect(
    (state) => ({
        responsive: state.responsive,
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
        skip: 9,
        perPage: 9,
        filter: null,
        filtersSelectedCount: 0,
        search: '',
        searchVisible: false,
        sort: 'sys.createdAt',
        loading: false,
        hideFilters: true,
        filters: initFilterState(this.props.location)
    };

    setGetRecipesResultsState = (result, filters, filtersSelectedCount, sort) => {
        let assets = [];

        if(result.includes)
            assets = [...result.includes.Asset];

        this.setState(() => ({
            filters,
            filtersSelectedCount,
            sort,
            recipes: [...result.items],
            assets,
            totalCardCount: result.total,
            loading: false
        }));
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
    };

    filtersSelectedCount = () => {
        const {filters} = this.state;

        let count = 0;
        Object.keys(filters).map(function(filter) {
            const filterOptions = filters[filter];
            Object.keys(filterOptions).map(function(filterOption) {
                if(filterOptions[filterOption])
                    count += 1;
            });
        });

        return count;
    };

    handleSort = () => {
        const {filters, filtersSelectedCount, search} = this.state;
        const sort = this.sort.value === '' ? null : this.sort.value;

        addQuery({sort});

        this.setState(() => ({
            loading: true
        }));

        this.props.getRecipes({skip: 0, sort, search, filters})
            .then((result) =>
                this.setGetRecipesResultsState(result, filters, filtersSelectedCount, sort)
            )
            .catch((err) => console.trace(err));

        ReactGA.event({
            category: 'interaction',
            action: 'click',
            label: `Recipes Sort - ${this.sort.value || 'None'}`
        });
    };

    handleFilterChange = (filterTitle) => (e) => {
        const {filters, filtersSelectedCount, sort, search} = this.state;
        const checked = e.currentTarget.checked;
        filters[filterTitle][e.target.value] = checked;

        const filterQuery = [];
        Object.keys(filters[filterTitle]).map(function(filter) {
            if(filters[filterTitle][filter])
                filterQuery.push(filter);
        });

        if(filterQuery.length > 0)
            addQuery({[filterTitle]: filterQuery.join('|')});
        else
            removeQuery(filterTitle);

        this.props.getRecipes({skip: 0, sort, search, filters})
            .then((result) =>
                this.setGetRecipesResultsState(result, filters, filtersSelectedCount, sort)
            )
            .catch((err) => console.trace(err));

        ReactGA.event({
            category: 'interaction',
            action: 'click',
            label: e.target.value
        });
    };

    clearFilter = (filterTitle) => () => {
        const {filters, filtersSelectedCount, sort, search} = this.state;

        Object.keys(filters[filterTitle]).map(function(filter) {
            filters[filterTitle][filter] = false;
        });

        removeQuery(filterTitle);

        this.props.getRecipes({skip: 0, sort, search, filters})
            .then((result) =>
                this.setGetRecipesResultsState(result, filters, filtersSelectedCount, sort)
            )
            .catch((err) => console.trace(err));
    };

    selectedFilters = (filterTitle) => {
        const {filters} = this.state;
        const selectedFilters = [];
        Object.keys(filters[filterTitle]).map(function(filter) {
            if(filters[filterTitle][filter])
                selectedFilters.push(filter);
        });

        return selectedFilters;
    };

    handleFilterApply = () => {
        const {filters, search, sort} = this.state;

        this.props.getRecipes({skip: 0, sort, search, filters})
            .then((result) =>
                this.setGetRecipesResultsState(result, filters, this.filtersSelectedCount(), sort)
            )
            .catch((err) => console.trace(err));
    };

    handleFilterClear = () => {
        const {filters, filtersSelectedCount, search, sort} = this.state;

        Object.keys(filters).map(function(filterTitle) {
            Object.keys(filters[filterTitle]).map(function(filterOption) {
                filters[filterTitle][filterOption] = false;
            });
        });

        this.props.getRecipes({skip: 0, sort, search, filters})
            .then((result) =>
                this.setGetRecipesResultsState(result, filters, filtersSelectedCount, sort)
            )
            .catch((err) => console.trace(err));
    };

    handleSearchDebounce = () => {
        this.handleSearch();
    };

    handleSearch = () => {
        const {filters, filtersSelectedCount, sort} = this.state;
        const search = this.search.value;

        if(search === '')
            removeQuery('search');
        else
            addQuery({search});

        this.props.getRecipes({skip: 0, sort, search, filters})
            .then((result) =>
                this.setGetRecipesResultsState(result, filters, filtersSelectedCount, sort)
            )
            .catch((err) => console.trace(err));
    };

    handleSearchVisibility = () => {
        const {searchVisible} = this.state;

        this.setState({
            searchVisible: !searchVisible
        });
    };

    renderFiltersSelectedCount = () => {
        const {filtersSelectedCount} = this.state;

        if(filtersSelectedCount > 0)
            return (<div className={styles.filtersSelectedCount}>{filtersSelectedCount}</div>);

        return <div/>;
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
    };

    renderFilterSelect = (title) => {
        const filters = this.state.filters[title];
        const {selected, visible} = filters;
        const selectedCount = selected ? selected.length : 0;

        return (
            <div>
                {title}
                <Button
                    onClick={() => this.toggleFilterDropdown(title)}
                    theme="gray"
                    type="button"
                >
                    {selectedCount} Selected
                </Button>
                <div
                    className={classnames('filterDropdown', {
                        [styles.visible]: visible
                    })}
                >
                    dropdown
                </div>
            </div>
        );
    };

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

    componentDidMount() {
        callFloodlight.load('4035228', 'fy18s0', 'indiv0');
        this.handleSearch = debounce(this.handleSearch, 300);
    }

    getNextRecipes() {
        const {filters, skip, sort} = this.state;

        return this.props.getRecipes({skip, sort, filters})
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
        const {skip, totalCardCount, loading, hideFilters, searchVisible} = this.state;
        const {responsive} = this.props;

        return (
            <section className="content">
                <Title>Recipes</Title>
                <Meta>{[
                    {
                        name: 'keywords',
                        content:
                            'Blue Diamond,Blue Diamond Almonds,Almond,Almond Nuts,Almond Snack,' +
                            'Almond Milk,Snack Nuts,Almond Breeze,Nut Thins,Almond Flavors,' +
                            'Almond Milk,Nut Milk,Almond Recipes,Nut Recipes,' +
                            'Almond Cooking,Nut Cooking,Almond Baking,Nut Baking,Almond Dessert,' +
                            'Nuts Dessert,Recipes,Recipes,Blue Diamond Recipes' +
                            'Blue Diamond Recipes,Blue Diamond Almonds Recipes,' +
                            'Blue Diamond Almonds Recipes,Almond Milk Recipe,Snack Nut Recipes,' +
                            'Almond Breeze Recipes,Nut Milk Recipes,'
                    },
                    {
                        property: 'og:title',
                        content: 'Almond Breeze Recipes - Blue Diamond Growers'
                    },
                    {
                        property: 'og:description',
                        content: (
                            'Find the perfect recipe or smoothie idea using the filters below. ' +
                            'Whether it&#39;s chocolate, coconut, vanilla, or something with a ' +
                            'touch of honey, you&#39;ll find dozens of ideas including low ' +
                            'calorie, low cholesterol, and dairy free recipes.'
                        )
                    }
                ]}</Meta>
                <div className={styles.hero} style={{backgroundImage: `url(${HeroImage})`}}>
                    <div className={styles.heroInner}>
                        <h2>Creativity Never Came So Smoothly</h2>
                    </div>
                </div>
                <div className={`l--container ${styles.container}`}>
                    <div className="l--row">
                        <div className={`l--col-3 ${styles.leftFilters}`}>
                            <p className={`t--type-incidental ${styles.refine}`}>Refine by:</p>
                            <ProductFilter
                                title="Category"
                                filter="collections"
                                filters={Object.keys(this.state.filters.category)}
                                query="values"
                                initState={this.selectedFilters('category')}
                                onClear={this.clearFilter('category')}
                                onClick={this.handleFilterChange('category')}
                                dropdown={responsive.small}
                            />
                            <ProductFilter
                                title="Seasonal"
                                filter="collections"
                                filters={Object.keys(this.state.filters.seasonal)}
                                query="values"
                                initState={this.selectedFilters('seasonal')}
                                onClear={this.clearFilter('seasonal')}
                                onClick={this.handleFilterChange('seasonal')}
                                dropdown={responsive.small}
                            />
                            <ProductFilter
                                title="Dietary"
                                filter="collections"
                                filters={Object.keys(this.state.filters.dietary)}
                                query="values"
                                initState={this.selectedFilters('dietary')}
                                onClear={this.clearFilter('dietary')}
                                onClick={this.handleFilterChange('dietary')}
                                dropdown={responsive.small}
                            />
                            <ProductFilter
                                title="Almond Breeze"
                                filter="collections"
                                filters={Object.keys(this.state.filters.almondBreezeFlavor)}
                                query="values"
                                initState={this.selectedFilters('almondBreezeFlavor')}
                                onClear={this.clearFilter('almondBreezeFlavor')}
                                onClick={this.handleFilterChange('almondBreezeFlavor')}
                                dropdown={responsive.small}
                            />
                            <ProductFilter
                                title="Featured"
                                filter="collections"
                                filters={Object.keys(this.state.filters.featured)}
                                query="values"
                                initState={this.selectedFilters('featured')}
                                onClear={this.clearFilter('featured')}
                                onClick={this.handleFilterChange('featured')}
                                dropdown={responsive.small}
                            />
                            <ProductFilter
                                title="Difficulty"
                                filter="collections"
                                filters={Object.keys(this.state.filters.difficulty)}
                                query="values"
                                initState={this.selectedFilters('difficulty')}
                                onClear={this.clearFilter('difficulty')}
                                onClick={this.handleFilterChange('difficulty')}
                                dropdown={responsive.small}
                            />
                            <ProductFilter
                                title="Ingredients"
                                filter="collections"
                                filters={Object.keys(this.state.filters.ingredients)}
                                query="values"
                                initState={this.selectedFilters('ingredients')}
                                onClear={this.clearFilter('ingredients')}
                                onClick={this.handleFilterChange('ingredients')}
                                dropdown={responsive.small}
                            />
                        </div>
                        <div className="l--col-12-at-s l--col-9">
                            <div className={`l--row l--align-center ${styles.filter}`}>
                                <div className="l--col-12-at-s l--col-4">
                                    <h3 className={styles.title}>
                                        All recipes
                                        <small> ({totalCardCount})</small>
                                    </h3>
                                </div>
                                <div className="l--col-12-at-s l--col-8 form--group">
                                    <div className={classnames('form--select', styles.hideSort)}>
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
                                    <div>
                                        <input
                                            className={classnames(styles.searchInput, {
                                                [styles.visible]: searchVisible
                                            })}
                                            onChange={this.handleSearchDebounce}
                                            ref={(input) => {
                                                this.search = input;
                                            }}
                                            type="text"
                                            placeholder="Search..."
                                            title="Type search term here"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={classnames(styles.filtersContainer, {
                                [styles.visible]: hideFilters
                            })}>
                                <div className={classnames(styles.filters, 'l--col-12')}>
                                    <div className={classnames(styles.filters, 'l--row')}>
                                        <div className={classnames(styles.filtersTitle, 'l--col-12')}>
                                            Recipe Filters
                                        </div>
                                        <div className={classnames(styles.filtersButtonsContainer, 'l--col-12')}>
                                            <span
                                                className={styles.clearFilter}
                                                onClick={this.handleFilterClear}>
                                                Clear Filters
                                            </span>
                                            <Button
                                                theme="blue"
                                                type="button"
                                                onClick={this.handleFilterApply}
                                            >
                                                Apply
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`l--row l--align-left ${styles.list}`}>
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
                    </div>

                </div>
            </section>
        );
    }
}
