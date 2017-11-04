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
import ShoppingCart from '../ShoppingCart/index';
import styles from './styles.module.css';

@connect(
    (state) => ({
        ...authConnector(state.auth),
        ...navConnector(state.navigation),
        ...checkoutConnector(state.checkout)
    })
)
export default class StoreDesktopNav extends Component {
    static propTypes = {
        brands: PropTypes.array.isRequired,
        navData: PropTypes.object.isRequired,
        company: PropTypes.array.isRequired
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

    trackSignIn() {
        callFloodlight.click('4035228', 'fy18s0', 'signi0');
    }

    render() {
        const {cartVisible} = this.state;
        const {navigation, auth, checkout} = this.props;
        const navColor = navigation.style ? navigation.style.className : null;

        return (
            <nav className={styles.container}>
                <Link to="/">
                    <img src={BDLogo} className={styles.logo} alt="Blue Diamond" />
                </Link>
                <div className={classnames(styles.secondaryNav, styles[navColor])}>
                    <div className={styles.innerContainer}>
                        <ul className={styles.secondaryNavLinks}>
                            <li>
                                <Link to="/" >
                                    Go to Main Site
                                </Link>
                            </li>
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
                            <li
                                onMouseOver={this.toggleShoppingCart.show}
                                onMouseLeave={this.toggleShoppingCart.hide}
                            >
                                <Link
                                    className={classnames(styles.cart, {
                                        [styles.active]: cartVisible
                                    })}
                                >
                                    Cart
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
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
