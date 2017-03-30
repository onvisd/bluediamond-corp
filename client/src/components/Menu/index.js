import React, {Component} from 'react';
import {Link, IndexLink} from 'react-isomorphic-render';

import styles from './styles.module.css';

export default class Menu extends Component {
    render() {
        const {items} = this.props;

        return (
            <ul className={styles.menu}>
                {items.map((item, i) => (
                    <li key={i} className={styles.menuItem}>
                        {this.renderLink(item)}
                    </li>
                ))}
            </ul>
        );
    }

    renderLink(item) {
        const LinkComponent = item.link === '/' ? IndexLink : Link;

        return (
            <LinkComponent
                to={item.link}
                activeClassName={styles.selected}
                className={styles.menuItemLink}
            >
                { item.name }
            </LinkComponent>
        );
    }
}
