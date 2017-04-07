import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

import styles from './styles.module.css';

export default class ProductNavigation extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired
    };

    state = {
        brand: 0,
        category: 0,
        products: []
    }

    selectBrand = (index) => {
        this.setState({
            brand: index,
            category: 0
        });
    }

    renderBrand = (tab, index) => (
        <li key={`tab${index}`} className={classnames(styles.tab, styles.brand, {
            [styles.active]: this.state.brand === index
        })}>
            <span
                className={styles.label}
                onClick={() => this.selectBrand(index)}
            >
                {tab.name}
            </span>
            <ol className={styles.subTabs}>
                {tab.children.map(this.renderCategory)}
            </ol>
        </li>
    );

    selectCategory = (index) => {
        this.setState({
            category: index
        });
    }

    renderCategory = (tab, index) => (
        <li
            className={classnames(styles.tab, styles.category, {
                [styles.active]: this.state.category === index
            })}
            onClick={() => this.selectCategory(index)}
            key={`child${index}`}
        >
            {tab.name}
        </li>
    )

    renderDrawer() {
        const {items} = this.props;
        const {brand, category} = this.state;
        const categoryData = items[brand].children[category];

        return (
            <ul className={styles.drawer}>
                {categoryData.products.slice(0, 6).map(this.renderProduct)}
                <li className={styles.cta}>
                    <Link to={`/brand/${items[brand].slug}`}>
                        See all {categoryData.name}
                    </Link>
                </li>
            </ul>
        );
    }

    renderProduct(data) {
        return (
            <li>
                <Link to={`/product/${data.slug}`}>
                    <img src={data.photo.file.url} />
                </Link>
            </li>
        );
    }

    render() {
        const {items} = this.props;

        return (
            <div className={styles.container}>
                <ol className={styles.tabs}>
                    {items.map(this.renderBrand)}
                </ol>
                {this.renderDrawer()}
            </div>
        );
    }
}
