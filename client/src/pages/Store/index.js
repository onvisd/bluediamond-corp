import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import classnames from 'classnames';

import {connector, getStoreProducts} from 'state/storeProducts';

import Title from 'components/Title';
import StoreHero from 'components/StoreHero';
import ProductFilter from 'components/ProductFilter';
import StoreProductCard from 'components/API/StoreProductCard';
import Button from 'components/Button';
import styles from './styles.module.css';

import Hero from 'images/store/hero.png';

@preload(({dispatch}) => dispatch(getStoreProducts()))
@connect(
    (state) => ({...connector(state.storeProducts)}),
    {getStoreProducts}
)
export default class Store extends Component {
    state = {
        totalCardCount: 0,
        visibleCardCount: 15,
        perPage: 15,
        filter: [],
        sort: null,
        search: []
    };

    handleLoadMore = () => {
        this.setState((state) => ({
            visibleCardCount: state.visibleCardCount + state.perPage
        }));
    }

    handleFilter = (e) => {
        const target = e.target;
        const filters = this.state.filter.slice();

        const index = filters.indexOf(target.value);

        if(!target.checked || index !== -1)
            filters.splice(index, 1);
        else if(target.checked)
            filters.push(target.value);

        this.setState(() => ({
            filter: filters
        }));
    };

    handleSort = () => {
        this.setState(() => ({
            sort: this.sort.value === 'null' ? null : this.sort.value
        }));
    };

    handleSearch = () => {
        this.setState(() => ({
            search: this.search.value === 'null' ? null : this.search.value
        }));
    };

    getOptions = (card, type) => {
        const options = [];

        for (let i = 0; i < card.options.length; i++) {
            const option = card.options[i];
            const name = option.name;

            if(name === type) // get specfic options based on it's name
                options.push(option.values);
        }

        return options[0];
    }

    compareOptions = (arr, index) => {
        if(!arr)
            return;

        let match = false;

        for (let i = 0; i < arr.length; i++) {
            if(arr[i].match(index))
                match = true;
        }

        return match;
    }

    filterCards = (card) => {
        const {filter} = this.state;
        const type = card.product_type;
        const tag = card.tags.match(/flavor:([^,]*)/)[1];
        const sizes = this.getOptions(card, 'Size');

        let match = false;

        for (let i = 0; i < filter.length; i++) {
            if(
                type.match(filter[i]) ||
                tag.match(filter[i]) ||
                this.compareOptions(sizes, filter[i])
            )
                match = true;
        }

        return match;
    };

    sortCards = (field) => {
        const {sort} = this.state;
        let getCardField = (card) => card[field];

        if(sort === 'name')
            getCardField = (card) => card.title.toUpperCase();

        if(sort === 'brand')
            getCardField = (card) => card.product_type.toUpperCase();

        return (cardA, cardB) => {
            if(getCardField(cardA) > getCardField(cardB)) return 1;
            if(getCardField(cardA) < getCardField(cardB)) return -1;
            return 0;
        };
    };

    renderProductCards = () => {
        const {storeProducts} = this.props;
        const {visibleCardCount, filter, sort} = this.state;
        const products = storeProducts.products;

        let cards = products.slice(0, visibleCardCount);

        if(filter.length) cards = cards.filter(this.filterCards);
        if(sort) cards = cards.sort(this.sortCards(sort));

        return cards.map((card) => (
            <StoreProductCard
                data={{products: card}}
                key={`card${card.id}`}
            />
        ));
    }

    componentWillMount() {
        this.setState(() => ({
            totalCardCount: this.props.storeProducts.products.length
        }));
    }

    render() {
        const {visibleCardCount, totalCardCount} = this.state;
        const {storeProducts} = this.props;

        return (
            <section className="content">
                <Title>Store</Title>
                <StoreHero
                    image={Hero}
                    title="Fire up your Memorial Day Barbeque with 20 percentage off
                    Smokehouse Snack Almonds"
                    buttonText="Go To Sale"
                    buttonUrl="/store/products/other-test-product"
                />
                <div className={styles.container}>
                    <div className="l--row">
                        <div className="l--col-2">
                            <p className={`t--type-incidental ${styles.refine}`}>Refine by:</p>
                            <ProductFilter
                                title="Brand"
                                products={storeProducts.products}
                                filter="product_type"
                                onClick={this.handleFilter}
                            />
                            <ProductFilter
                                title="Flavor"
                                products={storeProducts.products}
                                filter="tags"
                                query="flavor"
                                onClick={this.handleFilter}
                            />
                            <ProductFilter
                                title="Size"
                                products={storeProducts.products}
                                filter="options"
                                query="values"
                                onClick={this.handleFilter}
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
                                        >
                                            <option value="null">Sort by</option>
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
                                        placeholder="Search and press enter"
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
