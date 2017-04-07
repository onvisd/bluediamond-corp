import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

import ProductNavigation from '../ProductNavigation';
import CompanyNavigation from '../CompanyNavigation';

import styles from './styles.module.css';

export default class Navigation extends Component {
    state = {
        navVisible: null
    }

    static propTypes = {
        products: PropTypes.array.isRequired
    };

    toggleNavigation = (type) => {
        this.setState({navVisible: type});
    }

    render() {
        const {products} = this.props;

        return (
            <nav className={styles.container}>
                <ul className={styles.external}>
                    <li>
                        <a href="http://bluediamondgrowers.com" target="_blank">
                            Growers
                        </a>
                    </li>
                    <li>
                        <a href="http://bdingredients.com" target="_blank">
                            Global Ingredients
                        </a>
                    </li>
                    <li>International</li>
                </ul>

                <div className={styles.primary}>
                    <div
                        className={styles.primaryItem}
                        onMouseEnter={() => this.toggleNavigation('product')}
                        onMouseLeave={() => this.toggleNavigation(null)}
                    >
                        Our Products
                    </div>
                    <div
                        className={styles.primaryItem}
                        onMouseEnter={() => this.toggleNavigation('company')}
                        onMouseLeave={() => this.toggleNavigation(null)}
                    >
                        Our Company
                    </div>
                    <div className={styles.logo}>Logo</div>
                    <Link to="/product-locator" className={styles.primaryItem}>
                        Product Locator
                    </Link>
                    <Link to="/store" className={styles.primaryItem}>
                        Store
                    </Link>
                </div>

                <div
                    className={classnames(styles.navDrawer, {
                        [styles.visible]: this.state.navVisible === 'product'
                    })}
                    onMouseEnter={() => this.toggleNavigation('product')}
                    onMouseLeave={() => this.toggleNavigation(null)}
                >
                    <ProductNavigation items={products} />
                </div>

                <div
                    className={classnames(styles.navDrawer, {
                        [styles.visible]: this.state.navVisible === 'company'
                    })}
                    onMouseEnter={() => this.toggleNavigation('company')}
                    onMouseLeave={() => this.toggleNavigation(null)}
                >
                    <CompanyNavigation />
                </div>
            </nav>
        );
    }
}
