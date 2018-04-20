import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import classnames from 'classnames';

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
import addQuery from 'tools/addQuery';
import removeQuery from 'tools/removeQuery';

import Title from 'components/Title';
import Meta from 'components/Meta';
import StoreHero from 'components/StoreHero';
import ProductFilter from 'components/ProductFilter';
import StoreProductCard from 'components/API/StoreProductCard';
import Button from 'components/Button';
import styles from './styles.module.css';

import HeroDesktop from 'images/store/hero-2880x1024.jpg';
import HeroSmallDesktop from 'images/store/hero-2048x1024.jpg';
import HeroTablet from 'images/store/hero-1536x1024.jpg';
import HeroMobile from 'images/store/hero-750x750.jpg';

@preload(async ({dispatch, location}) => {
    const query = location.query;

    await Promise.all([
        dispatch(getStoreFilters(
            {
                productType: filterViaParam('productType', query),
                tags: filterViaParam('tags', query),
                options: filterViaParam('options', query),
                collections: filterViaParam('collections', query)
            },
            sortViaParam('search', query)
        )),
        dispatch(getStoreProducts(
            {
                productType: filterViaParam('productType', query),
                tags: filterViaParam('tags', query),
                options: filterViaParam('options', query),
                collections: filterViaParam('collections', query)
            },
            sortViaParam('search', query),
            sortViaParam('sort', query),
            query.page
        )),
        dispatch(setStoreSearch({
            visibleCardCount: Math.floor(query.visible) || 16,
            currentPage: 0,
            perPage: Math.floor(query.perPage) || 16,
            filter: {
                productType: filterViaParam('productType', query),
                tags: filterViaParam('tags', query),
                options: filterViaParam('options', query),
                collections: filterViaParam('collections', query)
            },
            sort: searchViaParam('sort', query),
            search: sortViaParam('search', query)
        }))
    ]).then(() => {
        // These are synchronous actions, so we don't need to wait for them
        dispatch(setStoreNavigation(true));
        dispatch(setNavigationStyle({className: 'brand--dark'}));
    });
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
        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'floodlight',
                activity: 'store0'
            });
        }
    }

    componentWillMount() {
        this.trackImpressions();
    }

    componentWillUpdate(nextProps) {
        if(!nextProps.isStorePage)
            this.props.setStoreNavigation(true);
        if(!nextProps.navigation.style.className)
            this.props.setNavigationStyle({className: 'brand--dark'});

        if(nextProps.query !== this.props.query) {
            const {filter, search, sort, currentPage} = nextProps.query;

            this.props.getStoreProducts(
                filter,
                search,
                sort,
                currentPage
            );

            this.props.getStoreFilters(filter, search);
        }

        this.trackImpressions(true);
    }

    componentWillUnmount() {
        this.props.setStoreNavigation(false);
        this.props.setNavigationStyle({});
    }

    // Loads more products
    handleLoadMore = () => {
        const {visibleCardCount, perPage, currentPage} = this.props.query;

        this.props.setStoreSearch({
            ...this.props.query,
            visibleCardCount: visibleCardCount + perPage,
            currentPage: currentPage + 1
        });
        addQuery({page: currentPage + 1});
    };

    // Handles updating the sort state
    handleSort = () => {
        const sort = this.sort.value === '' ? null : this.sort.value;

        this.props.setStoreSearch({
            ...this.props.query,
            sort,
            visibleCardCount: this.props.query.perPage,
            currentPage: 0
        });

        const slug = slugify(sort);

        if(sort) addQuery({sort: slug});
        else removeQuery('sort');

        removeQuery('page');

        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'interaction',
                action: 'filter',
                label: sort
            });
        }
    };

    // Handles updating the search state
    handleSearch = () => {
        const search = this.search.value;

        this.props.setStoreSearch({
            ...this.props.query,
            search,
            visibleCardCount: this.props.query.perPage,
            currentPage: 0
        });

        const slug = slugify(search);

        if(search) addQuery({search: slug});
        else removeQuery('search');

        removeQuery('page');

        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'interaction',
                action: 'search',
                label: search
            });
        }
    };

    clearFilter = (filterType) => () => {
        const {filter, perPage} = this.props.query;

        const filters = filter[filterType].slice();

        // remove everything in the array
        filters.length = 0;

        removeQuery(filterType, 'page');

        this.props.setStoreSearch({
            ...this.props.query,
            filter: {...filter, [filterType]: filters},
            visibleCardCount: perPage,
            currentPage: 0
        });
    };

    // Handles parsing & adding filter data
    handleFilter = (filterType) => (e) => {
        const {filter, perPage} = this.props.query;

        const target = e.target;
        const filters = filter[filterType].slice();
        const index = filters.indexOf(target.value);

        if(!target.checked || index !== -1)
            filters.splice(index, 1);
        else if(target.checked)
            filters.push(target.value);

        this.props.setStoreSearch({
            ...this.props.query,
            filter: {...filter, [filterType]: filters},
            visibleCardCount: perPage,
            currentPage: 0
        });

        const slugs = [];
        for (let i = 0; i < filters.length; i++)
            slugs.push(slugify(filters[i]));

        const slug = slugs.join('|') || null;

        if(slug) addQuery({[filterType]: slug});
        else removeQuery(filterType);

        removeQuery('page');
    };

    trackProduct = (card) => {
        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'productClick',
                ecommerce: {
                    click: {
                        actionField: {list: 'Search Results'}
                    },
                    products: [{
                        id: card.node.handle,
                        name: card.node.title,
                        brand: card.node.productType
                    }]
                }
            });
        }
    }

    trackImpressions = (asEvent) => {
        const {products} = this.props;
        const {visibleCardCount} = this.props.query;
        const cards = products.products;

        if(typeof window !== 'undefined' && window.dataLayer && cards !== this._prevCards) {
            const impressions = [];
            cards.slice(0, visibleCardCount).forEach((card, index) => {
                impressions.push({
                    id: card.node.handle,
                    name: card.node.title,
                    brand: card.node.productType,
                    position: index
                });
            });

            const data = {ecommerce: {impressions}};
            if(asEvent)
                data.event = 'storeFilter';
            window.dataLayer.push(data);
        }
        this._prevCards = cards;
    }

    render() {
        const {filters, products, responsive, getProductsPending} = this.props;
        const {visibleCardCount, filter, search} = this.props.query;

        const cards = products.products;
        const total = products.total;
        const unslugifiedSearch = unslugify(search);

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
                        content: HeroSmallDesktop
                    },
                    {
                        property: 'description',
                        content: 'Almond Snacks and Gifts for Any Occasion'
                    }
                ]}</Meta>
                <StoreHero
                    desktopImage={HeroDesktop}
                    smallDesktopImage={HeroSmallDesktop}
                    tabletImage={HeroTablet}
                    mobileImage={HeroMobile}
                />
                <div className={styles.container}>
                    <div className="l--row">
                        <div className={`l--col-3 ${styles.filters}`}>
                            <p className={`t--type-incidental ${styles.refine}`}>Refine by:</p>
                            <ProductFilter
                                title="Gifts"
                                filter="collections"
                                filters={filters.collections}
                                query="values"
                                initState={filter.collections}
                                onClear={this.clearFilter('collections')}
                                onClick={this.handleFilter('collections')}
                                dropdown={responsive.small}
                            />
                            <ProductFilter
                                title="Products"
                                filter="productType"
                                filters={filters.productType}
                                initState={filter.productType}
                                onClear={this.clearFilter('productType')}
                                onClick={this.handleFilter('productType')}
                                dropdown={responsive.small}
                            />
                            <ProductFilter
                                title="Flavor"
                                filter="tags"
                                filters={filters.tags}
                                query="flavor"
                                initState={filter.tags}
                                onClear={this.clearFilter('tags')}
                                onClick={this.handleFilter('tags')}
                                dropdown={responsive.small}
                            />
                            <ProductFilter
                                title="Size"
                                filter="options"
                                filters={filters.options}
                                query="values"
                                initState={filter.options}
                                onClear={this.clearFilter('options')}
                                onClick={this.handleFilter('options')}
                                dropdown={responsive.small}
                            />
                        </div>
                        <div className={`l--col-auto ${styles.products}`}>
                            <div className={`l--row ${styles.search}`}>
                                <div className="l--col-5">
                                    <input
                                        onChange={this.handleSearch}
                                        ref={(input) => {
                                            this.search = input;
                                        }}
                                        value={unslugifiedSearch}
                                        type="text"
                                        placeholder="Search"
                                        title="Type search term here"
                                    />
                                </div>
                                <div className={`l--col-7 ${styles.searchSpacer}`}>
                                    &nbsp;
                                </div>
                            </div>
                            <div className="l--row">
                                <div className="l--col-12 t--align-center">
                                    <h3 className={styles.title}>
                                        {cards.length === products.length
                                            ? 'All Products'
                                            : 'Matching Products'}
                                        <small> ({total})</small>
                                    </h3>
                                </div>
                            </div>
                            <div className={styles.cards}>
                                {cards.map((card) => (
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
                                isHidden: visibleCardCount >= total
                            })}>
                                <div className="l--row l--mar-top-m l--mar-btm-m">
                                    <div className="l--col-12 t--align-center">
                                        <Button
                                            onClick={this.handleLoadMore}
                                            className={classnames(styles.loadMore, {
                                                [styles.disabled]: getProductsPending
                                            })}
                                        >
                                            {getProductsPending
                                                ? 'Loading…'
                                                : 'Load More Products'
                                            }
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tracking pixel */}
                <img
                    src="https://r.turn.com/r/beacon?b2=dOm1o2qL7unskeoSfY7ialWAOyhtfOHhe3zQFUms8RRTNbIEOf2fo1LxMUNzxLfqsjLMl8773--xtutTwGUmYQ&cid="
                    alt=""
                />
            </section>
        );
    }
}
