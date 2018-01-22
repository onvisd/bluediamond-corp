import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {TrackDocument} from 'react-track';
import TransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

import {connector as authConnector} from 'state/auth';
import {connector as navConnector} from 'state/navigation';

import BDLogo from 'images/bd-logo.png';
import User from 'images/icons/user.svg';
import Cart from 'images/icons/cart.svg';
import styles from './styles.module.css';

@connect(
    (state) => ({
        ...authConnector(state.auth),
        ...navConnector(state.navigation)
    })
)
export default class MobileNav extends Component {
    static propTypes = {
        brands: PropTypes.array.isRequired,
        navData: PropTypes.object.isRequired,
        company: PropTypes.array.isRequired
    }

    cards = {
        Root: require('./Root').default,
        Products: require('./Products').default,
        Category: require('./Category').default,
        Company: require('./Company').default,
        ShoppingCart: require('../ShoppingCart').default,
        FooterMobile: require('../../FooterMobile').default
    }

    state = {
        navVisible: false,
        transition: {},
        activeCard: {}
    }

    toggleNav = {
        show: (activeCard = {
            element: this.cards.Root,
            props: {key: 'Root'}
        }) => {
            document.documentElement.classList.add('no-scroll');
            document.body.classList.add('no-scroll');

            this.setState(() => ({
                navVisible: true,
                activeCard
            }));

            if(typeof window !== 'undefined' && window.dataLayer) {
                window.dataLayer.push({
                    event: 'navigation',
                    action: 'expand',
                    label: 'main navigation'
                });
            }
        },
        hide: () => {
            document.documentElement.classList.remove('no-scroll');
            document.body.classList.remove('no-scroll');

            this.setState(() => ({
                navVisible: false,
                transition: {}
            }));
        }
    }

    trackDocument(children) {
        return (
            <TrackDocument formulas={[]}>
                {children}
            </TrackDocument>
        );
    }

    navigate = (card, transition, props) => {
        this.setState(() => ({
            transition,
            activeCard: {element: this.cards[card], props: {
                key: card,
                ...props
            }}
        }));
    }

    trackSignIn() {
        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'floodlight',
                activity: 'signi0'
            });
        }
    }

    // calculate the Y page offset for every possible browser
    scrollTop() {
        return (
            window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0) //eslint-disable-line
        );
    }

    render() {
        const {navVisible, transition} = this.state;
        const {element, props} = this.state.activeCard;
        const {brands, navData, company, navigation, auth, isStorePage} = this.props;
        const navColor = navigation.style ? navigation.style.className : null;

        const cartButton =
            <button
                title="Cart"
                className={styles.cart}
                onClick={() => {
                    if(navVisible) {
                        this.toggleNav.hide();
                    } else {
                        this.toggleNav.show({
                            element: this.cards.ShoppingCart,
                            props: {
                                key: 'Cart',
                                onToggle: this.toggleNav,
                                children: React.createElement(this.cards.FooterMobile)
                            }
                        });
                    }
                }}
            >
                <Cart className={styles[navColor]} />
            </button>;

        return this.trackDocument(() => (
            <div className={classnames(styles.container, {
                [styles.visible]: navVisible
            })}>
                <div className={classnames(styles.storeGoHomeHead, {
                    [styles.visible]: isStorePage
                })}>
                    <div className={styles.test}>
                        <Link to="/">
                            Go to Main Site
                        </Link>
                    </div>
                </div>
                <div className={classnames(styles.head, styles[navColor])}
                     style={{
                         marginTop: (this.scrollTop() < 60 && isStorePage) ? (60 - this.scrollTop()) : 0
                     }}
                >
                    <div className={classnames(styles.ecomm, styles[navColor])}>
                        {auth.authenticated
                            ? <Link to="/account/settings" title="Account"><User /></Link>
                            : (
                                <Link
                                    to="/signin"
                                    title="Sign in"
                                    onClick={this.trackSignIn}
                                >
                                    <User className={styles[navColor]} />
                                </Link>
                            )
                        }
                        {isStorePage
                            ? null
                            : cartButton
                        }
                    </div>
                    <div className={styles.logo}>
                        <Link to="/" onClick={this.toggleNav.hide}>
                            <img src={BDLogo} className={styles.logo} alt="Blue Diamond" />
                        </Link>
                    </div>
                    {isStorePage
                        ? (
                            <div className={styles.toggleWrap}>
                                {cartButton}
                            </div>
                        )
                        : (
                            <div
                                className={styles.toggleWrap}
                                onClick={() => {
                                    if(navVisible)
                                        this.toggleNav.hide();
                                    else
                                        this.toggleNav.show();
                                }}
                            >
                                <div
                                    className={classnames(styles.toggle, {
                                        [styles.active]: navVisible
                                    })}
                                />
                            </div>
                        )
                    }
                </div>
                <div
                    className={classnames(styles.drawer, {
                        [styles.visible]: navVisible
                    })}
                >
                    <TransitionGroup
                        transitionName={{
                            enter: styles[`enter-${transition.enter}`],
                            enterActive: styles[`enter-${transition.enter}-active`],
                            leave: styles[`leave-${transition.leave}`],
                            leaveActive: styles[`leave-${transition.leave}-active`]
                        }}
                        transitionEnter={Boolean(transition.enter)}
                        transitionEnterTimeout={200}
                        transitionLeave={Boolean(transition.leave)}
                        transitionLeaveTimeout={200}
                    >
                        {element &&
                            React.createElement(element, {
                                navigate: this.navigate,
                                toggleNav: this.toggleNav,
                                brands,
                                navData,
                                company,
                                ...props
                            })
                        }
                    </TransitionGroup>
                </div>
            </div>
        ));
    }
}
