import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import classnames from 'classnames';
import debounce from 'lodash/debounce';

import {connector, getRecipes} from 'state/recipes';
import {connector as recipeFilterConnector, getRecipeFilters} from 'state/recipeFilters';
import {connector as navConnector, setNavigationStyle} from 'state/navigation';

import Title from 'components/Title';
import Meta from 'components/Meta';
import RecipeCard from 'components/API/RecipeCard';
import Button from 'components/Button';
import ProductFilter from 'components/ProductFilter';

import addQuery from 'tools/addQuery';
import removeQuery from 'tools/removeQuery';
import searchViaParam from 'tools/searchViaParam';
import filterViaParam from 'tools/filterViaParam';

import styles from './styles.module.css';

import HeroImage from 'images/backgrounds/recipe-hero.jpg';

const parseIntQueryParam = (param, location, defaultVal) => {
    const value = searchViaParam(param, location.query);
    return parseInt(value) || defaultVal;
};

const initGetFilter = (location) => {
    const query = location.query;
    const result = {};

    Object.keys(query).map(function(filterTitle) {
        const param = new Set(filterViaParam(filterTitle, query));
        const filters = {};

        const options = query[filterTitle].split('|');

        options.map(function(f) {
            // handle special case where 'Dairy-Free' is unslugified to 'Dairy Free'
            filters[f] = param.has(f.replace('-', ' '));
        });

        result[filterTitle] = filters;
    });

    return result;
};

@preload(async ({dispatch, location}) => {
    await Promise.all([
        dispatch(getRecipes({
            search: searchViaParam('search', location.query),
            skip: parseIntQueryParam('skip', location, 0),
            limit: parseIntQueryParam('perPage', location, 9),
            sort: '-fields.featured,sys.createdAt',
            filters: initGetFilter(location)
        })),
        dispatch(getRecipeFilters(location.search)),
        dispatch(setNavigationStyle({className: 'brand--blue'}))
    ]);
})
@connect(
    (state) => ({
        responsive: state.responsive,
        ...connector(state.recipes),
        ...recipeFilterConnector(state.recipeFilters),
        ...navConnector(state.navigation)
    }),
    {getRecipes, getRecipeFilters, setNavigationStyle}
)
export default class RecipeIndex extends Component {
    filterSelections = () => this.props.getRecipeFilters()
        .then((result) => result)
        .catch((err) => console.trace(err));

    initFilterState = (location, filterList) => {
        const query = location.query;
        const result = {};

        Object.keys(filterList).map(function(filterTitle) {
            const param = new Set(filterViaParam(filterTitle, query));
            let filters = {};

            if(filterTitle === 'almondBreezeFlavor') {
                filters = [];

                filterList[filterTitle].map(function(f) {
                    filters.push({
                        ...f,
                        checked: param.has(f.id)
                    });
                });
            } else {
                filterList[filterTitle].map(function(f) {
                    // handle special case where 'Dairy-Free' is unslugified to 'Dairy Free'
                    filters[f] = param.has(f.replace('-', ' '));
                });
            }

            result[filterTitle] = filters;
        });

        return result;
    };

    state = {
        assets: [],
        skip: parseIntQueryParam('skip', this.props.location, 0),
        perPage: parseIntQueryParam('perPage', this.props.location, 9),
        filter: null,
        filtersSelectedCount: 0,
        search: searchViaParam('search', this.props.location.query),
        searchVisible: false,
        sort: '-fields.featured,sys.createdAt',
        loading: false,
        hideFilters: true,
        filters: [],
        allFilters: []
    };

    setGetRecipesResultsState = (result, filters, filtersSelectedCount, sort, skip, perPage) => { // eslint-disable-line
        let assets = [];

        if(result.includes)
            assets = [...result.includes.Asset];

        this.setState(() => ({
            filters,
            filtersSelectedCount,
            sort,
            skip,
            perPage,
            assets,
            search: this.search.value,
            loading: false
        }));
    };

    setPage = (page) => {
        const {perPage} = this.state;
        const {total} = this.props.recipes;

        let newSkip = (page - 1) * perPage;
        if(newSkip > total)
            newSkip = total;

        this.getNextRecipes(newSkip, perPage);
    };

    prevPage = () => {
        const {perPage} = this.state;
        let newSkip = this.props.recipes.skip - perPage;
        if(newSkip < 0)
            newSkip = 0;
        this.getNextRecipes(newSkip, perPage);
    };

    nextPage = () => {
        const {perPage} = this.state;
        const {skip, total} = this.props.recipes;

        let newSkip = skip + perPage;
        if(newSkip > total)
            newSkip = total - 1;

        this.getNextRecipes(newSkip, perPage);
    };

    handleLoadMore = () => {
        this.setState((state) => ({
            skip: state.skip + state.perPage,
            loading: true
        }));

        this.getNextRecipes();

        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'interaction',
                action: 'click',
                label: 'Recipes Load More'
            });
        }
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

    handlePerPage = () => {
        const {skip} = this.props.recipes;
        const newPerPage = parseInt(this.perPage.value);
        const newSkip = skip - (skip % newPerPage);

        this.setState(() => ({
            perPage: newPerPage
        }));

        this.getNextRecipes(newSkip, newPerPage);
    };

    handleSort = () => {
        const {filters, filtersSelectedCount, search, perPage} = this.state;
        const sort = this.sort.value === '' ? null : this.sort.value;

        addQuery({sort});

        this.setState(() => ({
            loading: true
        }));

        this.props.getRecipes({skip: 0, sort, search, filters, limit: perPage})
            .then((result) =>
                this.setGetRecipesResultsState(
                    result, filters, filtersSelectedCount, sort, 0, perPage
                )
            )
            .catch((err) => console.trace(err));

        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'interaction',
                action: 'click',
                label: `Recipes Sort - ${this.sort.value || 'None'}`
            });
        }
    };

    handleFilterChange = (filterTitle) => (e) => {
        const {filters, filtersSelectedCount, sort, perPage, search} = this.state;
        const checked = e.currentTarget.checked;
        const filterList = filters[filterTitle];
        const filterQuery = [];

        if(Array.isArray(filterList)) {
            const targetFilter = filterList.find((f) => f.id === e.target.value);

            if(targetFilter)
                targetFilter.checked = checked;

            filterList.filter((filter) => filter.checked).forEach((filter) => {
                filterQuery.push(filter.id);
            });
        } else {
            filterList[e.target.value] = checked;

            Object.keys(filterList).forEach((filter) => {
                if(filters[filterTitle][filter])
                    filterQuery.push(filter);
            });
        }

        if(filterQuery.length > 0)
            addQuery({[filterTitle]: filterQuery.join('|')});
        else
            removeQuery(filterTitle);

        const flavorFilter = {};
        filters.almondBreezeFlavor.forEach((f) => {
            flavorFilter[f.id] = f.checked;
        });

        this.props.getRecipes({
            skip: 0,
            sort,
            search,
            filters: Object.assign({}, filters, {
                almondBreezeFlavor: flavorFilter
            }),
            limit: perPage
        })
            .then((result) =>
                this.setGetRecipesResultsState(
                    result, filters, filtersSelectedCount, sort, 0, perPage
                )
            )
            .catch((err) => console.trace(err));

        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'interaction',
                action: 'click',
                label: e.target.value
            });
        }
    };

    clearFilter = (filterTitle) => () => {
        const {filters, filtersSelectedCount, sort, search, perPage} = this.state;

        Object.keys(filters[filterTitle]).map((filter) => {
            if(filterTitle === 'almondBreezeFlavor')
                filters[filterTitle][filter].checked = false;
            else
                filters[filterTitle][filter] = false;
        });

        removeQuery(filterTitle);

        const flavorFilter = {};
        filters.almondBreezeFlavor.forEach((f) => {
            flavorFilter[f.id] = f.checked;
        });

        this.props.getRecipes({
            skip: 0,
            sort,
            search,
            filters: Object.assign({}, filters, {
                almondBreezeFlavor: flavorFilter
            }),
            limit: perPage
        })
            .then((result) =>
                this.setGetRecipesResultsState(
                    result, filters, filtersSelectedCount, sort, 0, perPage
                )
            )
            .catch((err) => console.trace(err));
    };

    selectedFilters = (filterTitle) => {
        const {filters} = this.state;
        const selectedFilters = [];

        Object.keys(filters[filterTitle]).map((filter) => {
            const targetFilter = filters[filterTitle][filter];

            if(typeof targetFilter === 'object') {
                if(targetFilter.checked)
                    selectedFilters.push(targetFilter.id);
            } else if(filters[filterTitle][filter]) {
                selectedFilters.push(filter);
            }
        });

        return selectedFilters;
    };

    handleFilterApply = () => {
        const {filters, search, sort, perPage} = this.state;

        const flavorFilter = {};
        filters.almondBreezeFlavor.forEach((f) => {
            flavorFilter[f.id] = f.checked;
        });

        this.props.getRecipes({
            skip: 0,
            sort,
            search,
            filters: Object.assign({}, filters, {
                almondBreezeFlavor: flavorFilter
            }),
            limit: perPage
        })
            .then((result) =>
                this.setGetRecipesResultsState(
                    result, filters, this.filtersSelectedCount(), sort, 0, perPage
                )
            )
            .catch((err) => console.trace(err));
    };

    handleFilterClear = () => {
        const {filters, filtersSelectedCount, search, sort, perPage} = this.state;

        Object.keys(filters).map(function(filterTitle) {
            Object.keys(filters[filterTitle]).map(function(filterOption) {
                filters[filterTitle][filterOption] = false;
            });
        });

        const flavorFilter = {};
        filters.almondBreezeFlavor.forEach((f) => {
            flavorFilter[f.id] = f.checked;
        });

        this.props.getRecipes({
            skip: 0,
            sort,
            search,
            filters: Object.assign({}, filters, {
                almondBreezeFlavor: flavorFilter
            }),
            limit: perPage
        })
            .then((result) =>
                this.setGetRecipesResultsState(
                    result, filters, filtersSelectedCount, sort, 0, perPage
                )
            )
            .catch((err) => console.trace(err));
    };

    handleSearchDebounce = () => {
        this.setState({
            search: this.search.value
        });

        this.handleSearch();
    };

    handleSearch = () => {
        const {filters, filtersSelectedCount, sort, perPage} = this.state;
        const search = this.search.value;

        if(search === '')
            removeQuery('search');
        else
            addQuery({search});

        const flavorFilter = {};
        if(filters.almondBreezeFlavor) {
            filters.almondBreezeFlavor.forEach((f) => {
                flavorFilter[f.id] = f.checked;
            });
        }

        this.props.getRecipes({
            skip: 0,
            sort,
            search,
            filters: Object.assign({}, filters, {
                almondBreezeFlavor: flavorFilter
            }),
            limit: perPage
        })
            .then((result) =>
                this.setGetRecipesResultsState(
                    result, filters, filtersSelectedCount, sort, 0, perPage
                )
            )
            .catch((err) => console.trace(err));

        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'interaction',
                action: 'search',
                label: search
            });
        }
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
        const {filter} = this.state;

        let cards = this.props.recipes.items;

        const filterCards = (card) =>
            card.fields.consumerSymbols &&
            card.fields.consumerSymbols.indexOf(filter) !== -1;

        if(filter) cards = cards.filter(filterCards);

        if(cards.length === 0) {
            return (
                <div className={`l--row l--align-center ${styles.list}`}>
                    <div className={classnames('l--col-12', styles.noResultsLabel)}>
                        No Results
                    </div>
                    <div className="l--col-12'">
                        <a href="/recipes">
                            <Button theme="blue" type="button">
                                Clear Filters
                            </Button>
                        </a>
                    </div>
                </div>
            );
        }

        return (
            <div className={`l--row l--align-left ${styles.list}`}>
                {cards.map((card, i) => (
                    <RecipeCard
                        data={{entry: card, assets: this.state.assets}}
                        key={`card${card.sys.id}${i}`}
                    />
                ))}
            </div>
        );
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
        let assets = {};
        if(this.props.recipes.includes)
            assets = this.props.recipes.includes.Asset;

        this.setState(() => ({
            allFilters: this.props.recipeFilters,
            filters: this.initFilterState(this.props.location, this.props.recipeFilters),
            assets
        }));

        this.props.setNavigationStyle({className: 'brand--blue'});
    }

    componentWillUpdate(nextProps) {
        if(!nextProps.navigation.style.className)
            this.props.setNavigationStyle({className: 'brand--blue'});
    }

    componentWillReceiveProps(nextProps) { // eslint-disable-line id-length
        this.setState(() => ({
            filters: this.initFilterState(nextProps.location, nextProps.recipeFilters),
            assets: nextProps.recipes.includes ? nextProps.recipes.includes.Asset : {}
        }));
    }

    componentWillUnmount() {
        this.props.setNavigationStyle({});
    }

    componentDidMount() {
        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'floodlight',
                activity: 'indiv0'
            });
        }
        this.handleSearch = debounce(this.handleSearch, 300);
    }

    getNextRecipes(newSkip, newPerPage) {
        const {filters, filtersSelectedCount, search, sort} = this.state;

        this.setState({
            loading: true
        });

        addQuery({skip: newSkip, perPage: newPerPage});

        const flavorFilter = {};
        filters.almondBreezeFlavor.forEach((f) => {
            flavorFilter[f.id] = f.checked;
        });

        this.props.getRecipes({
            skip: newSkip,
            limit: newPerPage,
            sort,
            search,
            filters: Object.assign({}, filters, {
                almondBreezeFlavor: flavorFilter
            })})
            .then((result) => {
                this.setGetRecipesResultsState(
                    result, filters, filtersSelectedCount, sort, newSkip, newPerPage
                );
                this.setState((state) => ({
                    skip: result.skip,
                    assets: [...state.assets, ...result.includes.Asset],
                    loading: false
                }));
            })
            .catch((err) => console.trace(err));

        this.search.scrollIntoView({behavior: 'smooth'});
    }

    renderNavButtons = () => {
        const {perPage} = this.state;
        const {skip, total} = this.props.recipes;

        if(skip === 'undefined' || total === 'undefined')
            return <div/>;

        const currentPage = Math.floor(skip / perPage) + 1;
        const lastPage = Math.ceil(total / perPage);

        let start;
        let end;
        if(currentPage - 2 < 1) {
            start = 1;
            end = start + 4;
        } else if(currentPage + 2 > lastPage) {
            end = lastPage;
            start = lastPage - 4;
        } else {
            start = currentPage - 2;
            end = currentPage + 2;
        }

        if(start < 1)
            start = 1;
        if(end > lastPage)
            end = lastPage;

        const pages = [];
        for (let i = start; i <= end; i++) {
            const pageIndex = i;
            pages.push(
                <a
                    key={`page-${pageIndex}`}
                    onClick={() => this.setPage(pageIndex)}
                    className={classnames(
                        styles.pageButton,
                        {
                            [styles.currentPage]: pageIndex === currentPage
                        }
                    )}
                >
                    <span
                        className={classnames(
                            styles.pageButtonContainer,
                            {
                                [styles.currentPage]: pageIndex === currentPage
                            }
                        )}
                    >
                        {pageIndex}
                    </span>
                </a>
            );
        }

        return (
            <div className="l--col-12-at-m l--col-7-at-l t--align-center">
                {
                    skip >= perPage
                        ? <a className={styles.navButton} onClick={this.prevPage}>&lt; Prev</a>
                        : null
                }
                {pages}
                {
                    skip < total - perPage
                        ? <a className={styles.navButton} onClick={this.nextPage}>Next &gt;</a>
                        : null
                }
            </div>
        );
    };

    render() {
        const {
            hideFilters,
            search,
            searchVisible,
            perPage,
            allFilters
        } = this.state;
        const {responsive, recipes} = this.props;

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
                    },
                    {
                        name: 'description',
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
                            {Object.keys(allFilters)
                                .filter((key) => allFilters[key].length !== 0)
                                .map((key, idx) => {
                                    const filterList = this.state.filters[key];

                                    let filters;
                                    if(Array.isArray(filterList))
                                        filters = filterList;
                                    else
                                        filters = Object.keys(filterList);


                                    let title = '';
                                    switch (key) {
                                        case 'almondBreezeFlavor':
                                            title = 'Almond Breeze';
                                            break;
                                        case 'lunchDinner':
                                            title = 'Lunch & Dinner';
                                            break;
                                        case 'easyMeals':
                                            title = 'Easy Meals';
                                            break;
                                        default:
                                            title = key.charAt(0).toUpperCase() + key.slice(1);
                                            break;
                                    }

                                    return (
                                        <ProductFilter
                                            key={`recipeFilter${idx}`}
                                            title={title}
                                            filter="collections"
                                            filters={filters}
                                            query="values"
                                            initState={this.selectedFilters(key)}
                                            onClear={this.clearFilter(key)}
                                            onClick={this.handleFilterChange(key)}
                                            dropdown={responsive.small}
                                        />
                                    );
                                })
                            }
                        </div>
                        <div className="l--col-auto">
                            <div className={`l--row l--align-center ${styles.filter}`}>
                                <div className="l--col-12-at-s l--col-4">
                                    <h3 className={styles.title}>
                                        All recipes
                                        <small> ({recipes.total})</small>
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
                                    <label className={styles.formLabel} htmlFor="search">
                                        <span>Search</span>
                                        <input
                                            className={classnames(styles.searchInput, {
                                                [styles.visible]: searchVisible
                                            })}
                                            name="search"
                                            onChange={this.handleSearchDebounce}
                                            ref={(input) => {
                                                this.search = input;
                                            }}
                                            type="text"
                                            placeholder="Search..."
                                            title="Type search term here"
                                            value={search}
                                        />
                                    </label>
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
                            {this.renderRecipeCards()}
                            <div>
                                <div className="l--row l--mar-top-m l--mar-btm-m">
                                    <div className="l--col-12-at-m l--col-4-at-l t--align-center">
                                        <label
                                          className={classnames('form--select', styles.formLabel)}
                                          htmlFor="perPage"
                                        >
                                            <span>Results per page</span>
                                            <select
                                                ref={(page) => {
                                                    this.perPage = page;
                                                }}
                                                name="perPage"
                                                onChange={this.handlePerPage}
                                                className={styles.resultCountSelect}
                                                value={perPage}
                                            >
                                                <option value={9}>9 results per page</option>
                                                <option value={15}>15 results per page</option>
                                                <option value={24}>24 results per page</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div className="l--col-1 t--align-center"/>
                                    {this.renderNavButtons()}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        );
    }
}
