import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

import {connector} from '../../../redux/navigation';

import ShoppingCart from '../../../../assets/images/shopping-cart.svg';
import BDLogo from '../../../../assets/images/bd-logo.png';
import Breadcrumbs from './Breadcrumbs';
import styles from './styles.module.css';

@connect(
    (state) => ({...connector(state.navigation)})
)
export default class DesktopNav extends Component {
    static propTypes = {
        brands: PropTypes.array.isRequired,
        navData: PropTypes.object.isRequired,
        companyNavTiles: PropTypes.array.isRequired
    }

    cards = {
        Products: require('./Products').default,
        Company: require('./Company').default
    }

    state = {
        navVisible: false,
        activeCard: {},
        productCards: []
    }

    toggleNav = {
        show: (card) => {
            this.setState(() => ({
                navVisible: true,
                activeCard: {
                    name: card,
                    element: this.cards[card]
                }
            }));
        },
        hide: () => {
            this.setState(() => ({navVisible: false, productCards: []}));
        }
    }

    setProductCards = (productCards) => {
        this.setState(() => ({productCards}));
    }

    render() {
        const {navVisible, productCards} = this.state;
        const {name, element, props} = this.state.activeCard;
        const {brands, navData, companyNavTiles, navigation} = this.props;
        const navColor = navigation.style ? navigation.style.className : null;

        return (
            <nav className={styles.container}>
                <Link to="/">
                    <img src={BDLogo} className={styles.logo} />
                </Link>
                <div className={`${styles.secondaryNav} ${styles[navColor]}`}>
                    <div className={styles.innerContainer}>
                        <Breadcrumbs crumbs={navigation.breadcrumbs} />
                        <ul className={styles.secondaryNavLinks}>
                            {navData.secondary.map((link) => (
                                <li key={link.slug}>
                                    <a href={link.slug} target="_blank">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
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
                        <li className={styles.primaryNavLink}>
                            <ShoppingCart />
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
