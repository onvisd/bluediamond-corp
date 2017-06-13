import React, {Component, PropTypes} from 'react';
import TransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

import BDLogo from '../../../../assets/images/bd-logo.svg';
import User from '../../../../assets/images/icons/user.svg';
import Cart from '../../../../assets/images/icons/cart.svg';
import styles from './styles.module.css';

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
        Company: require('./Company').default
    }

    state = {
        navVisible: false,
        transition: {},
        activeCard: {}
    }

    toggleNav = {
        show: () => {
            document.documentElement.classList.add('no-scroll');
            document.body.classList.add('no-scroll');

            this.setState(() => ({
                navVisible: true,
                activeCard: {
                    element: this.cards.Root,
                    props: {key: 'Root'}
                }
            }));
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
        const {brands, navData, companyNavTiles} = this.props;

        return (
            <div className={classnames(styles.container, {
                [styles.visible]: navVisible
            })}>
                <div className={styles.head}>
                    <div className={styles.ecomm}>
                        <User />
                        <Cart />
                    </div>
                    <div className={styles.logo}>
                        <Link to="/" onClick={this.toggleNav.hide}>
                            <BDLogo className={styles.logo} />
                        </Link>
                    </div>
                    <div
                        className={styles.toggleWrap}
                        onClick={navVisible ? this.toggleNav.hide : this.toggleNav.show}
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
