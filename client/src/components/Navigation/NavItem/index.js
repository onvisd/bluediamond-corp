import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

import styles from './styles.module.css';

const NavItem = ({active, theme, href, extHref, onClick, children}) => {
    let button = (
        <div
            onClick={onClick}
            className={classnames({
                [styles.active]: active
            })}
        >
            {children}
        </div>
    );

    if(href) {
        button = (
            <Link to={href} onClick={onClick}>
                {children}
            </Link>
        );
    } else if(extHref) {
        button = (
            <a href={extHref} target="_blank">
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
    children: PropTypes.node.isRequired
};

NavItem.defaultProps = {
    theme: 'primary'
};

export default NavItem;
