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

    renderMobile() {
        const {products} = this.props;

        return (
            <nav className={styles.mobileContainer}>
                <div className={styles.primary}>
                    <div className={styles.logo}>Logo</div>
                    <div
                        className={styles.toggle}
                        onClick={() => this.toggleNavigation('menu')}
                    >
                        Toggle
                    </div>
                </div>
                <div
                    className={classnames(styles.drawer, {
                        [styles.visible]: this.state.navVisible
                    })}
                >
                    <div className={styles.primary}>
                        <div className={styles.logo}>Logo</div>
                        <div
                            className={styles.toggle}
                            onClick={() => this.toggleNavigation(null)}
                        >
                            Toggle
                        </div>
                    </div>
                    <ul>
                        <li className={styles.primaryItem}>
                            <span
                                onClick={() => this.toggleNavigation(
                                    this.state.navVisible === 'products' ? null : 'products'
                                )}
                            >
                                Our Products
                            </span>

                            <div
                                className={classnames(styles.secondaryItem, {
                                    [styles.visible]: this.state.navVisible === 'products'
                                })}
                            >
                                <ProductNavigation items={products} />
                            </div>
                        </li>
                        <li className={styles.primaryItem}>
                            <span
                                onClick={() => this.toggleNavigation(
                                    this.state.navVisible === 'company' ? null : 'company'
                                )}
                            >
                                Our Company
                            </span>

                            <div
                                className={classnames(styles.secondaryItem, {
                                    [styles.visible]: this.state.navVisible === 'company'
                                })}
                            >
                                <CompanyNavigation />
                            </div>
                        </li>
                        <li className={styles.primaryItem}>
                            <Link to="/product-locator">
                                Product Locator
                            </Link>
                        </li>
                        <li className={styles.primaryItem}>
                            <Link to="/store">
                                Store
                            </Link>
                        </li>

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
                </div>
            </nav>
        );
    }

    renderDefault() {
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

    render() {
        return (
            <header>
                {this.renderDefault()}
                {this.renderMobile()}
            </header>
        );
    }
}
