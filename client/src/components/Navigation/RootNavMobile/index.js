import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';
import styles from './styles.module.css';

import View from '../View';
import NavItem from '../NavItem';
import NavList from '../NavList';
import BDLogo from '../../../../assets/images/BDLogo.png';

export default class RootNavMobile extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onUpdateView: PropTypes.func.isRequired,
        onToggleNav: PropTypes.func.isRequired,
        navStack: PropTypes.array.isRequired,
        navData: PropTypes.object.isRequired,
        children: PropTypes.node
    }

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
                        <NavItem
                            key={link.slug}
                            onClick={this.props.onToggleNav}
                            {...rest}
                        >
                            {link.name}
                        </NavItem>
                    );
                })}
            </NavList>
        </View>
    );

    render() {
        const {children, visible, onToggleNav} = this.props;

        return (
            <nav className={styles.container}>
                <div className={styles.head}>
                    <div className={styles.logo}>
                        <Link to="/" onClick={() => onToggleNav(true)}>
                            <img src={BDLogo} />
                        </Link>
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
                    {children || this.renderBase()}
                </div>
            </nav>
        );
    }
}
