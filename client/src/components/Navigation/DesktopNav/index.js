import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';
import ReactGA from 'react-ga';

import {connector as authConnector} from 'state/auth';
import {connector as navConnector} from 'state/navigation';
import {connector as checkoutConnector} from 'state/checkout';

import callFloodlight from 'tools/callFloodlight';

import ShoppingCartIcon from 'images/icons/cart.svg';
import User from 'images/icons/user.svg';
import BDLogo from 'images/bd-logo.png';
import ShoppingCart from '../ShoppingCart';
import styles from './styles.module.css';

@connect(
    (state) => ({
        ...authConnector(state.auth),
        ...navConnector(state.navigation),
        ...checkoutConnector(state.checkout)
    })
)
export default class DesktopNav extends Component {
    static propTypes = {
        brands: PropTypes.array.isRequired,
        navData: PropTypes.object.isRequired,
        company: PropTypes.array.isRequired
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

            ReactGA.event({
                category: 'interaction',
                action: 'click',
                label: 'shopping cart fly out'
            });
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

            ReactGA.event({
                category: 'navigation',
                action: 'expand',
                label: 'main navigation'
            });
        },

        hide: () => {
            this.setState(() => ({navVisible: false}));
        }
    }

    setProductCards = (productCards) => {
        this.setState(() => ({productCards}));
    }

    trackSignIn() {
        callFloodlight.click('4035228', 'fy18s0', 'signi0');
    }

    render() {
        const {navVisible, cartVisible, productCards} = this.state;
        const {name, element, props} = this.state.activeCard;
        const {brands, navData, company, navigation, auth, checkout} = this.props;
        const navColor = navigation.style ? navigation.style.className : null;

        return (
            <nav className={styles.container}>
                <Link to="/">
                    <img src={BDLogo} className={styles.logo} alt="Blue Diamond" />
                </Link>
                <div className={classnames(styles.secondaryNav, styles[navColor])}>
                    <div className={styles.innerContainer}>
                        <ul className={styles.secondaryNavLinks}>
                            {navData.secondary.map((link) => (
                                <li key={link.slug}>
                                    <a
                                      href={link.slug}
                                      target={link.slug === '/international' ? '' : '_blank'}
                                    >
                                        {React.createElement(link.icon)}
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <ul className={classnames(styles.secondaryNavLinks, styles.auth)}>
                            <li>
                                {auth.authenticated
                                    ? <Link to="/account/settings">Account <User /></Link>
                                    : (
                                        <Link
                                            to="/signin"
                                            onClick={this.trackSignIn}
                                        >
                                            Sign In or Create Account
                                            <User />
                                        </Link>
                                    )}
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
                                    company,
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
                                onMouseOver={this.toggleShoppingCart.show}
                                onMouseLeave={this.toggleShoppingCart.hide}
                            >
                                <ShoppingCartIcon />
                                {checkout.lineItems && checkout.lineItems.edges.length > 0 && (
                                    <div className={styles.cartBadge}>
                                        {checkout.lineItems.edges.length}
                                    </div>
                                )}
                                <div
                                    className={classnames(styles.dropdown, {
                                        [styles.active]: cartVisible
                                    })}
                                >
                                    <ShoppingCart
                                        auth={auth}
                                        onToggle={this.toggleShoppingCart}
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
