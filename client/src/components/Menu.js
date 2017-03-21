import React, {Component} from 'react';
import {Link, IndexLink} from 'react-isomorphic-render';
import {flat as style} from 'react-styling';

export default class Menu extends Component {
    render() {
        const {items} = this.props;

        return (
            <ul style={styles.menu} className="menu">
                {items.map((item, i) => (
                    <li key={i} style={styles.menu_item}>
                        {this.renderLink(item)}
                    </li>
                ))}
            </ul>
        );
    }

    renderLink(item)	{
        const LinkComponent = item.link === '/' ? IndexLink : Link;

        return (
            <LinkComponent
                to={item.link}
                style={styles.menu_item_link}
                activeClassName="menu-item-selected"
                className="menu-item"
            >
                { item.name }
            </LinkComponent>
        );
    }
}

const styles = style
`
    menu
        margin-top    : 0
        margin-bottom : 0

        list-style-type : none
        padding         : 0

        item
            display: inline-block

        link
            display         : inline-block
            text-decoration : none
`;
