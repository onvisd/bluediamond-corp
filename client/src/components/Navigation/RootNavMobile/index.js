import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';

import View from '../View';
import NavItem from '../NavItem';
import NavList from '../NavList';
import BDLogo from '../../../../assets/images/BDLogo.png';
import ProductNavMobile from '../ProductNavMobile';
import CompanyNavMobile from '../CompanyNavMobile';

export default class RootNavMobile extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onUpdateView: PropTypes.func.isRequired,
        onToggleNav: PropTypes.func.isRequired,
        brands: PropTypes.array.isRequired,
        navStack: PropTypes.array.isRequired,
        navData: PropTypes.object.isRequired,
        companyNavTiles: PropTypes.array.isRequired
    }

    renderProducts = () => (
        <ProductNavMobile
            onUpdateView={this.props.onUpdateView}
            navStack={this.props.navStack}
            brands={this.props.brands}
        />
    );

    renderCompany = () => (
        <CompanyNavMobile
            navTiles={this.props.companyNavTiles}
            onUpdateView={this.props.onUpdateView}
        />
    );

    renderBase = () => (
        <View>
            <NavList>
                {this.props.navData.primary.actions.map((action) => (
                    <NavItem
                        key={action.name}
                        onClick={() => this.props.onUpdateView(action.navStack)}
                    >
                        {action.name}
                    </NavItem>
                ))}
            </NavList>
            <NavList type="secondary">
                {this.props.navData.secondary.map((link) => (
                    <NavItem
                        type="secondary"
                        key={link.slug}
                        extHref={link.slug}
                    >
                        {link.name}
                    </NavItem>
                ))}
            </NavList>
            <NavList>
                {this.props.navData.primary.globalLinks.concat(
                    this.props.navData.primary.companyLinks
                ).map((link) => {
                    let rest = {href: link.slug};
                    if(link.external)
                        rest = {extHref: link.slug};

                    return (
                        <NavItem key={link.slug} {...rest}>
                            {link.name}
                        </NavItem>
                    );
                })}
            </NavList>
        </View>
    );

    renderView = () => {
        const {navStack} = this.props;

        if(navStack.length && navStack.indexOf('products') === (navStack.length - 1))
            return this.renderProducts();
        if(navStack.indexOf('company') === 0)
            return this.renderCompany();

        return this.renderBase();
    };

    render() {
        const {visible, onToggleNav} = this.props;

        return (
            <nav className={styles.container}>
                <div className={styles.head}>
                    <div className={styles.logo}>
                        <img src={BDLogo} />
                    </div>
                    <div onClick={onToggleNav} className={styles.toggleWrap}>
                        <div
                            className={classnames(
                                styles.toggle,
                                {[styles.toggleActive]: visible}
                            )}
                        />
                    </div>
                </div>
                <div
                    className={classnames(styles.drawer, {
                        [styles.visible]: visible
                    })}
                >
                    {this.renderView()}
                </div>
            </nav>
        );
    }
}
