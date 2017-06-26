import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

import {connector as authConnector} from 'state/auth';
import {connector as navConnector} from 'state/navigation';

import ShoppingCartIcon from 'images/icons/cart.svg';
import User from 'images/icons/user.svg';
import BDLogo from 'images/bd-logo.svg';
import ShoppingCart from '../ShoppingCart';
import styles from './styles.module.css';

@connect(
    (state) => ({...authConnector(state.auth), ...navConnector(state.navigation)})
)
export default class DesktopNav extends Component {
    static propTypes = {
        brands: PropTypes.array.isRequired,
        navData: PropTypes.object.isRequired,
        companyNavTiles: PropTypes.array.isRequired
    }

    cards = {
        Products: require('./Products').default,
        Company: require('./Company').default,
        Brand: require('./Brand').default,
        Category: require('./Category').default
    }

    state = {
        navVisible: false,
        cartVisible: false,
        activeCard: {},
        productCards: []
    }

    toggleShoppingCart = {
        show: () => {
            this.setState(() => ({cartVisible: true}));
        },
        hide: () => {
            this.setState(() => ({cartVisible: false}));
        }
    }

    toggleNav = {
        show: (card) => {
            const {brands} = this.props;
            const defaultBrand = brands[0];
            const defaultCategory = defaultBrand.fields.categories[0];

            this.setState(() => ({
                navVisible: true,
                activeCard: {
                    name: card,
                    element: this.cards[card]
                },
                productCards: [
                    {
                        element: this.cards.Brand,
                        name: defaultBrand.fields.name,
                        props: {brand: defaultBrand}
                    }, {
                        element: this.cards.Category,
                        name: defaultCategory.fields.name,
                        props: {brand: defaultBrand, category: defaultCategory}
                    }
                ]
            }));
        },
        hide: () => {
            this.setState(() => ({navVisible: false}));
        }
    }

    setProductCards = (productCards) => {
        this.setState(() => ({productCards}));
    }

    render() {
        const {navVisible, cartVisible, productCards} = this.state;
        const {name, element, props} = this.state.activeCard;
        const {brands, navData, companyNavTiles, navigation, auth} = this.props;
        const navColor = navigation.style ? navigation.style.className : null;

        return (
            <nav className={styles.container}>
                <Link to="/">
                    <BDLogo className={styles.logo} />
                </Link>
                <div className={`${styles.secondaryNav} ${styles[navColor]}`}>
                    <div className={styles.innerContainer}>
                        <ul className={styles.secondaryNavLinks}>
                            {navData.secondary.map((link) => (
                                <li key={link.slug}>
                                    <a href={link.slug} target="_blank">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <ul className={styles.secondaryNavLinks}>
                            <li>
                                {auth.authenticated
                                    ? <Link to="/account/settings">Account</Link>
                                    : <Link to="/signin">Sign In or Create Account</Link>}
                                <User />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.primaryNav}>
                    <div className={styles.navPanelToggles} onMouseLeave={this.toggleNav.hide}>
                        {navData.primary.actions.map((action) => (
                            <div
                                key={action.name}
                                onMouseEnter={() => {
                                    this.toggleNav.show(action.card);
                                }}
                                className={classnames(styles.navPanelToggle, {
                                    [styles.active]: navVisible && name === action.card
                                })}
                            >
                                {action.name}
                            </div>
                        ))}
                        <div
                            className={classnames(styles.navPanel, {
                                [styles.active]: navVisible
                            })}
                        >
                            {element &&
                                React.createElement(element, {
                                    setProductCards: this.setProductCards,
                                    toggleNav: this.toggleNav,
                                    productCards,
                                    brands,
                                    navData,
                                    companyNavTiles,
                                    ...props
                                })
                            }
                        </div>
                    </div>
                    <ul className={styles.primaryNavLinks}>
                        {navData.primary.globalLinks.map((link) => (
                            <li key={link.slug} className={styles.primaryNavLink}>
                                <Link to={link.slug}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li className={classnames(styles.primaryNavLink, styles.wide)}>
                            <div
                                className={classnames(styles.cart, {
                                    [styles.active]: cartVisible
                                })}
                                onMouseOver={() => {
                                    this.toggleShoppingCart.show();
                                }}
                                onMouseLeave={() => {
                                    this.toggleShoppingCart.hide();
                                }}
                            >
                                <ShoppingCartIcon />
                                <div
                                    className={classnames(styles.dropdown, {
                                        [styles.active]: cartVisible
                                    })}
                                >
                                    <ShoppingCart onToggle={this.toggleShoppingCart} />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
