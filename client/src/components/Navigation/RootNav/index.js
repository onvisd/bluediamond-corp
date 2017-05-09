import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';
import styles from './styles.module.css';

import BDLogo from '../../../../assets/images/BDLogo.png';

export default class RootNav extends Component {
    static propTypes = {
        onUpdateView: PropTypes.func.isRequired,
        onToggleNav: PropTypes.func.isRequired,
        navStack: PropTypes.array.isRequired,
        navData: PropTypes.object.isRequired,
        children: PropTypes.node
    }

    render() {
        const {children, onUpdateView, onToggleNav, navStack, navData} = this.props;

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
                        <Link to="/">
                            <img src={BDLogo} className={styles.logo} />
                        </Link>
                    </div>
                </div>
                {children}
            </nav>
        );
    }
}
