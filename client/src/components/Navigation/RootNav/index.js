import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';
import styles from './styles.module.css';

import BDLogo from '../../../../assets/images/BDLogo.png';
import ProductNav from '../ProductNav';
import CompanyNav from '../CompanyNav';

export default class RootNav extends Component {
    static propTypes = {
        onUpdateView: PropTypes.func.isRequired,
        onToggleNav: PropTypes.func.isRequired,
        brands: PropTypes.array.isRequired,
        navStack: PropTypes.array.isRequired,
        navData: PropTypes.object.isRequired,
        companyNavTiles: PropTypes.array.isRequired
    }

    renderProducts = () => (
        <ProductNav
            onUpdateView={this.props.onUpdateView}
            onToggleNav={this.props.onToggleNav}
            navStack={this.props.navStack}
            brands={this.props.brands}
        />
    );

    renderCompany = () => (
        <CompanyNav
            onToggleNav={this.props.onToggleNav}
            navTiles={this.props.companyNavTiles}
            navData={this.props.navData}
        />
    );

    renderView = () => {
        const {navStack} = this.props;

        if(navStack.length && navStack.indexOf('products') === (navStack.length - 1))
            return this.renderProducts();
        if(navStack.indexOf('company') === 0)
            return this.renderCompany();
    };

    render() {
        const {onUpdateView, onToggleNav, navStack, navData} = this.props;

        return (
            <nav className={styles.container}>
                <div className={styles.wrap}>
                    <div className={styles.innerContainer}>
                        <ul className={styles.secondaryNav}>
                            {navData.secondary.map((link) => (
                                <li key={link.slug}>
                                    <a href={link.slug} target="_blank">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.primaryNav}>
                            <ul className={styles.navLinks}>
                                {navData.primary.actions.map((action) => (
                                    <li
                                        key={action.name}
                                        className={classnames({
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
                            <ul className={styles.navLinks}>
                                {navData.primary.globalLinks.map((link) => (
                                    <li key={link.slug}>
                                        <Link to={link.slug}>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <img src={BDLogo} className={styles.logo} />
                    </div>
                </div>
                {this.renderView()}
            </nav>
        );
    }
}
