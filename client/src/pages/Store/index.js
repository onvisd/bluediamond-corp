import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import classnames from 'classnames';
import ReactGA from 'react-ga';

import {connector as navConnector, setNavigationStyle} from 'state/navigation';

import {setStoreNavigation} from 'state/storeNavigation';
import {connector as storeNavigationConnector} from 'state/storeNavigation';

import {getStoreProducts} from 'state/storeProducts';
import {connector as storeConnector} from 'state/storeProducts';

import {getStoreFilters} from 'state/storeFilters';
import {connector as storeFilterConnector} from 'state/storeFilters';

import {setStoreSearch} from 'state/storeSearch';
import {connector as storeSearchConnector} from 'state/storeSearch';

import slugify from 'tools/slugify';
import unslugify from 'tools/unslugify';
import filterViaParam from 'tools/filterViaParam';
import searchViaParam from 'tools/searchViaParam';
import sortViaParam from 'tools/searchViaParam';
import getOptions from 'tools/getProductOptions';
import compareOptions from 'tools/compareProductOptions';
import addQuery from 'tools/addQuery';
import removeQuery from 'tools/removeQuery';
import callFloodlight from 'tools/callFloodlight';

import Title from 'components/Title';
import Meta from 'components/Meta';
import StoreHero from 'components/StoreHero';
import ProductFilter from 'components/ProductFilter';
import StoreProductCard from 'components/API/StoreProductCard';
import Button from 'components/Button';
import styles from './styles.module.css';

import Hero from 'images/store/hero.jpg';

const escapeRegEx = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');

@preload(async ({dispatch, location}) => {
    const query = location.query;

    await Promise.all([
        dispatch(getStoreFilters()),
        dispatch(getStoreProducts()),
        dispatch(setStoreSearch({
            visibleCardCount: Math.floor(location.query.visible) || 16,
            perPage: Math.floor(location.query.perPage) || 16,
            filter: {
                brands: filterViaParam('brands', query),
                types: filterViaParam('types', query),
                sizes: filterViaParam('sizes', query),
                categories: filterViaParam('categories', query)
            },
            sort: searchViaParam('sort', query),
            search: sortViaParam('search', query)
        }))
    ]);
})
@connect(
    (state) => ({
        responsive: state.responsive,
        ...navConnector(state.navigation),
        ...storeSearchConnector(state.storeSearch),
        ...storeNavigationConnector(state.storeNavigation),
        ...storeConnector(state.store),
        ...storeFilterConnector(state.storeFilters)
    }),
    {setStoreSearch, getStoreProducts, getStoreFilters, setNavigationStyle, setStoreNavigation}
)
export default class Store extends Component {
    componentDidMount() {
        callFloodlight.load('4035228', 'fy18s0', 'store0');
    }

    componentWillMount() {
        this.props.setStoreNavigation(true);
        this.props.setNavigationStyle({className: 'brand--dark'});
    }

    componentWillUpdate(nextProps) {
        if(!nextProps.isStorePage)
            this.props.setStoreNavigation(true);
        if(!nextProps.navigation.style.className)
            this.props.setNavigationStyle({className: 'brand--dark'});
    }

    componentWillUnmount() {
        this.props.setStoreNavigation(false);
        this.props.setNavigationStyle({});
    }

    // Loads more products
    handleLoadMore = () => {
        const {visibleCardCount, perPage} = this.props.query;

        this.props.setStoreSearch({
            ...this.props.query,
            visibleCardCount: visibleCardCount + perPage
        });
    }

    // Handles updating the sort state
    handleSort = () => {
        const sort = this.sort.value === '' ? null : this.sort.value;

        this.props.setStoreSearch({
            ...this.props.query,
            sort
        });

        const slug = slugify(sort);

        if(sort) addQuery({sort: slug});
        else removeQuery('sort');

        ReactGA.event({
            category: 'interaction',
            action: 'filter',
            label: sort
        });
    };

    // Handles updating the search state
    handleSearch = () => {
        const search = this.search.value;

        this.props.setStoreSearch({
            ...this.props.query,
            search
        });

        const slug = slugify(search);

        if(search) addQuery({search: slug});
        else removeQuery('search');

        ReactGA.event({
            category: 'interaction',
            action: 'search',
            label: search
        });
    };

    setSlugs = (filterType, filters) => {
        const slugs = [];
        for (let i = 0; i < filters.length; i++)
            slugs.push(slugify(filters[i]));

        const slug = slugs.join('|') || null;

        if(slug) addQuery({[filterType]: slug});
        else removeQuery(filterType);
    };

    clearFilter = (filterType) => () => {
        const {filter} = this.props.query;

        const filters = filter[filterType].slice();

        // remove everything in the array
        filters.length = 0;

        this.props.setStoreSearch({
            ...this.props.query,
            filter: {...filter, [filterType]: filters}
        });

        this.setSlugs(filterType, filters);
    };

    // Handles parsing & adding filter data
    handleFilter = (filterType) => (e) => {
        const {filter} = this.props.query;

        const target = e.target;
        const filters = filter[filterType].slice();
        const index = filters.indexOf(target.value);

        if(!target.checked || index !== -1)
            filters.splice(index, 1);
        else if(target.checked)
            filters.push(target.value);

        this.props.setStoreSearch({
            ...this.props.query,
            filter: {...filter, [filterType]: filters}
        });

        this.setSlugs(filterType, filters);
    };

    // Matches card data with filters stored in state
    filterCards = (skipFilter) => (card) => {
        const {filter, search} = this.props.query;
        const title = card.node.title;
        const type = card.node.productType;
        const tags = JSON.stringify(card.node.tags);

        let tag = '';
        if(/flavor:([^,"]*)/.test(tags)) tag = tags.match(/flavor:([^,"]*)/)[1];

        const sizes = getOptions(card, 'Size');

        let brandMatch = (skipFilter === 'brands');
        for (let i = 0; i < filter.brands.length; i++) {
            if(type.match(filter.brands[i]))
                brandMatch = filter.brands[i];
        }

        let typeMatch = (skipFilter === 'types');
        for (let i = 0; i < filter.types.length; i++) {
            if(tag && tag.match(filter.types[i]))
                typeMatch = filter.types[i];
        }

        let sizeMatch = (skipFilter === 'sizes');
        for (let i = 0; i < filter.sizes.length; i++) {
            if(compareOptions(sizes, filter.sizes[i]))
                sizeMatch = filter.sizes[i];
        }

        const collections = card.node.collections.edges.map((col) => col.node.title);

        let categoryMatch = (skipFilter === 'categories');
        for (let i = 0; i < filter.categories.length; i++) {
            if(collections.indexOf(filter.categories[i]) > -1)
                categoryMatch = filter.categories[i];
        }

        let searchMatch = false;
        if(title.toLowerCase().match(escapeRegEx(unslugify(search).toLowerCase())))
            searchMatch = true;

        if((brandMatch || !filter.brands.length) &&
            (typeMatch || !filter.types.length) &&
            (sizeMatch || !filter.sizes.length) &&
            (categoryMatch || !filter.categories.length) &&
            (searchMatch || !search.length)
        ) {
            ReactGA.plugin.execute('ec', 'addImpression', {
                id: card.node.handle,
                name: card.node.title,
                brand: card.node.productType,
                category: categoryMatch || '',
                variant: sizeMatch || ''
            });

            return true;
        }

        return false;
    };

    // Sorts the available cards
    sortCards = (field) => {
        const {sort} = this.props.query;
        let getCardField = (card) => card[field];

        if(sort === 'name')
            getCardField = (card) => card.node.title.toUpperCase();

        if(sort === 'brand')
            getCardField = (card) => card.node.productType.toUpperCase();

        return (cardA, cardB) => {
            if(getCardField(cardA) > getCardField(cardB)) return 1;
            if(getCardField(cardA) < getCardField(cardB)) return -1;
            return 0;
        };
    };

    trackProduct = (card) => {
        ReactGA.plugin.execute('ec', 'addProduct', {
            id: card.node.handle,
            name: card.node.title,
            brand: card.node.productType
        });

        ReactGA.plugin.execute('ec', 'setAction', 'click', {
            list: 'Search Results'
        });
    }

    render() {
        const {filters, products, responsive} = this.props;
        const {visibleCardCount, filter, sort, search} = this.props.query;

        let cards = products.products;
        const allCards = cards;

        if(filter || search)
            cards = cards.filter(this.filterCards(null));
        if(sort)
            cards = cards.sort(this.sortCards(sort));

        return (
            <section className="content">
                <Title>Store</Title>
                <Meta>{[
                    {
                        property: 'og:title',
                        content: 'Blue Diamond Online Store'
                    },
                    {
                        property: 'og:description',
                        content: 'Almond Snacks and Gifts for Any Occasion'
                    },
                    {
                        property: 'og:image',
                        content: Hero
                    }
                ]}</Meta>
                <StoreHero
                    image={Hero}
                    title="Almond Snacks and Gifts for Any Occasion"
                    buttonText="Go To Sale"
                    buttonUrl="/store/product/other-test-product"
                />
                <div className={styles.container}>
                    <div className="l--row">
                        <div className={`l--col-3 ${styles.filters}`}>
                            <p className={`t--type-incidental ${styles.refine}`}>Refine by:</p>
                            <ProductFilter
                                title="Gifts"
                                products={products.products}
                                filteredProducts={allCards.filter(this.filterCards('categories'))}
                                filter="collections"
                                filters={filters.collections}
                                query="values"
                                initState={filter.categories}
                                onClear={this.clearFilter('categories')}
                                onClick={this.handleFilter('categories')}
                                dropdown={responsive.small}
                            />
                            <ProductFilter
                                title="Products"
                                products={products.products}
                                filteredProducts={allCards.filter(this.filterCards('brands'))}
                                filter="productType"
                                filters={filters.productType}
                                initState={filter.brands}
                                onClear={this.clearFilter('brands')}
                                onClick={this.handleFilter('brands')}
                                dropdown={responsive.small}
                            />
                            <ProductFilter
                                title="Flavor"
                                products={products.products}
                                filteredProducts={allCards.filter(this.filterCards('types'))}
                                filter="tags"
                                filters={filters.tags}
                                query="flavor"
                                initState={filter.types}
                                onClear={this.clearFilter('types')}
                                onClick={this.handleFilter('types')}
                                dropdown={responsive.small}
                            />
                            <ProductFilter
                                title="Size"
                                products={products.products}
                                filteredProducts={allCards.filter(this.filterCards('sizes'))}
                                filter="options"
                                filters={filters.options}
                                query="values"
                                initState={filter.sizes}
                                onClear={this.clearFilter('sizes')}
                                onClick={this.handleFilter('sizes')}
                                dropdown={responsive.small}
                            />
                        </div>
                        <div className={`l--col-auto ${styles.products}`}>
                            <div className={`l--row ${styles.search}`}>
                                <div className="l--col-5">
                                    <div className="form--select noMargin">
                                        <select
                                            onChange={this.handleSort}
                                            ref={(select) => {
                                                this.sort = select;
                                            }}
                                            defaultValue=""
                                            title="Select a field to sort by"
                                        >
                                            <option value="" disabled>Sort by</option>
                                            <option value="name">Name</option>
                                            <option value="brand">Brand</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={`l--col-2 ${styles.searchSpacer}`}>
                                    &nbsp;
                                </div>
                                <div className="l--col-5">
                                    <input
                                        onChange={this.handleSearch}
                                        ref={(input) => {
                                            this.search = input;
                                        }}
                                        type="text"
                                        placeholder="Search"
                                        title="Type search term here"
                                    />
                                </div>
                            </div>
                            <div className="l--row">
                                <div className="l--col-12 t--align-center">
                                    <h3 className={styles.title}>
                                        {cards.length === products.length
                                            ? 'All Products'
                                            : 'Matching Products'}
                                        <small> ({cards.length})</small>
                                    </h3>
                                </div>
                            </div>
                            <div className={styles.cards}>
                                {cards.slice(0, visibleCardCount).map((card) => (
                                    <StoreProductCard
                                        data={card.node}
                                        images={card.node.images.edges.length
                                            ? products.images[card.node.images.edges[0].node.id]
                                            : null
                                        }
                                        key={`card${card.node.id}`}
                                        onClick={() => this.trackProduct(card)}
                                    />
                                ))}
                            </div>
                            <div className={classnames({
                                isHidden: visibleCardCount >= cards.length
                            })}>
                                <div className="l--row l--mar-top-m l--mar-btm-m">
                                    <div className="l--col-12 t--align-center">
                                        <Button onClick={this.handleLoadMore}>
                                            Load More Products
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
