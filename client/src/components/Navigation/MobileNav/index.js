import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';
import ReactGA from 'react-ga';

import {connector as authConnector} from 'state/auth';

import BDLogo from 'images/bd-logo.png';
import User from 'images/icons/user.svg';
import Cart from 'images/icons/cart.svg';
import styles from './styles.module.css';

@connect(
    (state) => ({...authConnector(state.auth)})
)
export default class MobileNav extends Component {
    static propTypes = {
        brands: PropTypes.array.isRequired,
        navData: PropTypes.object.isRequired,
        companyNavTiles: PropTypes.array.isRequired
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

            ReactGA.event({
                category: 'navigation',
                action: 'expand',
                label: 'main navigation'
            });
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

    navigate = (card, transition, props) => {
        this.setState(() => ({
            transition,
            activeCard: {element: this.cards[card], props: {
                key: card,
                ...props
            }}
        }));
    }

    render() {
        const {navVisible, transition} = this.state;
        const {element, props} = this.state.activeCard;
        const {brands, navData, companyNavTiles, auth} = this.props;

        return (
            <div className={classnames(styles.container, {
                [styles.visible]: navVisible
            })}>
                <div className={styles.head}>
                    <div className={styles.ecomm}>
                        {auth.authenticated
                            ? <Link to="/account/settings"><User /></Link>
                            : <Link to="/signin"><User /></Link>}
                        <button
                            className={styles.cart}
                            onClick={() => {
                                this.toggleNav.show({
                                    element: this.cards.ShoppingCart,
                                    props: {
                                        key: 'Cart',
                                        onToggle: this.toggleNav,
                                        children: React.createElement(this.cards.FooterMobile)
                                    }
                                });
                            }}
                        >
                            <Cart />
                        </button>
                    </div>
                    <div className={styles.logo}>
                        <Link to="/" onClick={this.toggleNav.hide}>
                            <img src={BDLogo} className={styles.logo} alt="Blue Diamond" />
                        </Link>
                    </div>
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
                                companyNavTiles,
                                ...props
                            })
                        }
                    </TransitionGroup>
                </div>
            </div>
        );
    }
}
