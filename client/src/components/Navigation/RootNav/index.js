import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';
import styles from './styles.module.css';

import {connector} from '../../../redux/navigation';

import Breadcrumbs from '../Breadcrumbs';
import BDLogo from '../../../../assets/images/BDLogo.png';
import ShoppingCart from '../../../../assets/images/shopping_cart.svg';

@connect(
    (state) => ({...connector(state.navigation)})
)
export default class RootNav extends Component {
    static propTypes = {
        onUpdateView: PropTypes.func.isRequired,
        onToggleNav: PropTypes.func.isRequired,
        navStack: PropTypes.array.isRequired,
        navData: PropTypes.object.isRequired,
        children: PropTypes.node
    }

    render() {
        const {
            children,
            onUpdateView,
            onToggleNav,
            navStack,
            navData,
            navigation
        } = this.props;

        const navColor = navigation.style ? navigation.style.className : null;

        return (
            <nav className={styles.container}>
                <img src={BDLogo} className={styles.logo} />
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
                    <ul className={styles.primaryNavLinks}>
                        {navData.primary.actions.map((action) => (
                            <li
                                key={action.name}
                                className={classnames(styles.primaryNavLink, {
                                    [styles.active]: navStack.length && navStack
                                        .indexOf(action.navStack[0]) ===
                                        navStack.length - 1
                                })}
                            >
                                <button
                                    onMouseEnter={() => {
                                        onToggleNav();
                                        onUpdateView(action.navStack);
                                    }}
                                >
                                    {action.name}
                                </button>
                            </li>
                        ))}
                    </ul>
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
                {children}
            </nav>
        );
    }
}
