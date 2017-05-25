import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

import ExternalLink from '../../../assets/images/icons/external-link.svg';
import Button from '../Button';
import styles from './styles.module.css';

export default class ButtonDropdown extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        theme: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired,
        layout: PropTypes.string,
        style: PropTypes.object,
        dropUp: PropTypes.bool
    }

    state = {
        showDropdown: false
    }

    showDropdown = () => {
        this.setState(() => ({
            showDropdown: true
        }));
    }

    hideDropdown = () => {
        this.setState(() => ({
            showDropdown: false
        }));
    }

    renderItem = (item) => {
        const {layout} = this.props;

        if(item.external) {
            return (
                <a
                    href={item.slug}
                    target="_blank"
                    className={classnames(styles.link, styles.external, {
                        [styles.wide]: layout === 'wide'
                    })}
                >
                    {item.name}
                    <ExternalLink />
                </a>
            );
        }

        return (
            <Link
                to={item.slug} className={classnames(styles.link, {
                    [styles.wide]: layout === 'wide'
                })}
            >
                {item.name}
            </Link>
        );
    };

    render() {
        const {items, theme, layout, style, dropUp, children} = this.props;

        return (
            <Button
                onMouseOver={this.showDropdown}
                onMouseLeave={this.hideDropdown}
                theme={theme}
                layout={layout}
                style={style}
            >
                {children}
                <div
                    className={classnames(styles.dropdown, {
                        [styles.active]: this.state.showDropdown,
                        [styles.dropUp]: dropUp
                    })}
                >
                    <div className={classnames(styles.dropdownInner, {
                        [styles.active]: this.state.showDropdown
                    })}>
                        <ul className={styles.dropdownItems}>
                            {items.map((item, idx) => (
                                <li key={`item-${idx}`}>
                                    {this.renderItem(item)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Button>
        );
    }
}
