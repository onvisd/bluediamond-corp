import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import classnames from 'classnames';

import {getStoreProducts} from 'state/storeProducts';
import {connector as storeConnector} from 'state/storeProducts';

import Title from 'components/Title';
import StoreHero from 'components/StoreHero';
import ProductFilter from 'components/ProductFilter';
import StoreProductCard from 'components/API/StoreProductCard';
import Button from 'components/Button';
import styles from './styles.module.css';

import Hero from 'images/store/hero.jpg';

const escapeRegEx = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');

@preload(({dispatch}) => dispatch(getStoreProducts()))
@connect(
    (state) => ({...storeConnector(state.store)}),
    {getStoreProducts}
)
export default class Store extends Component {
    state = {
        totalCardCount: 0,
        visibleCardCount: 15,
        perPage: 15,
        filter: {
            brands: [],
            types: [],
            sizes: [],
            categories: []
        },
        sort: null,
        search: ''
    };

    handleLoadMore = () => {
        this.setState((state) => ({
            visibleCardCount: state.visibleCardCount + state.perPage
        }));
    }

    handleFilter = (filterType) => (e) => {
        const target = e.target;
        const filters = this.state.filter[filterType].slice();
        const index = filters.indexOf(target.value);

        if(!target.checked || index !== -1)
            filters.splice(index, 1);
        else if(target.checked)
            filters.push(target.value);

        const filter = {...this.state.filter, [filterType]: filters};

        this.setState({filter});
    };

    handleSort = () => {
        this.setState(() => ({
            sort: this.sort.value === '' ? null : this.sort.value
        }));
    };

    handleSearch = () => {
        this.setState(() => ({
            search: this.search.value
        }));
    };

    getOptions = (card, type) => {
        let options = [];

        for (let i = 0; i < card.node.options.length; i++) {
            const option = card.node.options[i];
            const name = option.name;

            if(name === type) // get specfic options based on it's name
                options = options.concat(option.values);
        }

        return options;
    }

    compareOptions = (arr, index) => {
        if(!arr || !arr.length)
            return false;

        let match = false;

        for (let i = 0; i < arr.length; i++) {
            if(arr[i].match(escapeRegEx(index)))
                match = true;
        }

        return match;
    }

    filterCards = (card) => {
        const {filter, search} = this.state;
        const title = card.node.title;
        const type = card.node.productType;
        const tags = JSON.stringify(card.node.tags);

        let tag = '';
        if(/flavor:([^,"]*)/.test(tags)) tag = tags.match(/flavor:([^,"]*)/)[1];

        const sizes = this.getOptions(card, 'Size');

        let brandMatch = false;
        for (let i = 0; i < filter.brands.length; i++) {
            if(type.match(filter.brands[i]))
                brandMatch = true;
        }

        let typeMatch = false;
        for (let i = 0; i < filter.types.length; i++) {
            if(tag && tag.match(filter.types[i]))
                typeMatch = true;
        }

        let sizeMatch = false;
        for (let i = 0; i < filter.sizes.length; i++) {
            if(this.compareOptions(sizes, filter.sizes[i]))
                sizeMatch = true;
        }

        const collections = card.node.collections.edges
                                .map((col) => col.node.title);
        let categoryMatch = false;
        for (let i = 0; i < filter.categories.length; i++) {
            if(collections.indexOf(filter.categories[i]) > -1)
                categoryMatch = true;
        }

        let searchMatch = false;
        if(title.toLowerCase().match(escapeRegEx(search.toLowerCase())))
            searchMatch = true;

        if((brandMatch || !filter.brands.length) &&
            (typeMatch || !filter.types.length) &&
            (sizeMatch || !filter.sizes.length) &&
            (categoryMatch || !filter.categories.length) &&
            (searchMatch || !search.length)
        )
            return true;

        return false;
    };

    sortCards = (field) => {
        const {sort} = this.state;
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

    renderProductCards = () => {
        const {products} = this.props;
        const {visibleCardCount, filter, sort, search} = this.state;

        let cards = products.slice(0, visibleCardCount);

        if(filter || search)
            cards = cards.filter(this.filterCards);
        if(sort)
            cards = cards.sort(this.sortCards(sort));

        return cards.map((card) => (
            <StoreProductCard
                data={card.node}
                key={`card${card.node.id}`}
            />
        ));
    }

    componentWillMount() {
        const {products} = this.props;

        this.setState(() => ({
            totalCardCount: products.length
        }));
    }

    render() {
        const {totalCardCount, visibleCardCount} = this.state;
        const {products} = this.props;

        return (
            <section className="content">
                <Title>Store</Title>
                <StoreHero
                    image={Hero}
                    title="Almond Snacks and Gifts for Any Occasion"
                    buttonText="Go To Sale"
                    buttonUrl="/store/product/other-test-product"
                />
                <div className={styles.container}>
                    <div className="l--row">
                        <div className="l--col-3">
                            <p className={`t--type-incidental ${styles.refine}`}>Refine by:</p>
                            <ProductFilter
                                title="Brand"
                                products={products}
                                filter="productType"
                                onClick={this.handleFilter('brands')}
                            />
                            <ProductFilter
                                title="Flavor"
                                products={products}
                                filter="tags"
                                query="flavor"
                                onClick={this.handleFilter('types')}
                            />
                            <ProductFilter
                                title="Size"
                                products={products}
                                filter="options"
                                query="values"
                                onClick={this.handleFilter('sizes')}
                            />
                            <ProductFilter
                                title="Category"
                                products={products}
                                filter="collections"
                                query="values"
                                onClick={this.handleFilter('categories')}
                            />
                        </div>
                        <div className="l--col-auto">
                            <div className="l--row">
                                <div className="l--col-5">
                                    <div className="form--select noMargin">
                                        <select
                                            onChange={this.handleSort}
                                            ref={(sort) => {
                                                this.sort = sort;
                                            }}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Sort by</option>
                                            <option value="name">Name</option>
                                            <option value="brand">Brand</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="l--col-2">
                                    &nbsp;
                                </div>
                                <div className="l--col-5">
                                    <input
                                        onChange={this.handleSearch}
                                        ref={(search) => {
                                            this.search = search;
                                        }}
                                        type="text"
                                        placeholder="Search"
                                    />
                                </div>
                            </div>
                            <div className="l--row">
                                <div className="l--col-12 t--align-center">
                                    <h3 className={styles.title}>
                                        All Products
                                        <small> ({totalCardCount})</small>
                                    </h3>
                                </div>
                            </div>
                            <div className={styles.cards}>
                                {this.renderProductCards()}
                            </div>
                            <div className={classnames({
                                isHidden: visibleCardCount >= totalCardCount
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
