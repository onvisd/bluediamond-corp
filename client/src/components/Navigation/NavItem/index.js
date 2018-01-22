import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

import styles from './styles.module.css';

const NavItem = ({active, theme, href, extHref, onClick, onMouseOver, children}) => {
    const onClickAction = (evt) => {
        if(onClick)
            onClick(evt);

        let label = href || extHref;
        if(!label)
            label = children;

        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'navigation',
                action: 'click',
                label: children
            });
        }
    };

    let button = (
        <div
            onClick={onClickAction}
            onMouseOver={onMouseOver}
            className={classnames(styles.button, {
                [styles.active]: active
            })}
        >
            {children}
        </div>
    );

    if(href) {
        button = (
            <Link
                to={href}
                onClick={onClickAction}
                onMouseOver={onMouseOver}
                className={classnames(styles.button, {
                    [styles.active]: active
                })}
            >
                {children}
            </Link>
        );
    } else if(extHref) {
        button = (
            <a href={extHref} onClick={onClickAction} target="_blank" className={styles.button}>
                {children}
            </a>
        );
    }

    return (
        <li className={styles[theme]}>
            {button}
        </li>
    );
};

NavItem.propTypes = {
    active: PropTypes.bool,
    theme: PropTypes.string,
    href: PropTypes.string,
    extHref: PropTypes.string,
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    children: PropTypes.node.isRequired
};

NavItem.defaultProps = {
    theme: 'primary'
};

export default NavItem;
