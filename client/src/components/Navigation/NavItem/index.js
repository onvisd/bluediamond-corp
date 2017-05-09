import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';
import styles from './styles.module.css';

const NavItem = ({active, type, href, extHref, onClick, children}) => {
    let button = (
        <button
            onClick={onClick}
            className={classnames({
                [styles.active]: active
            })}
        >
            {children}
        </button>
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
        <li className={styles[type]}>
            {button}
        </li>
    );
};

NavItem.propTypes = {
    active: PropTypes.bool,
    type: PropTypes.string,
    href: PropTypes.string,
    extHref: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired
};

NavItem.defaultProps = {
    type: 'primary'
};

export default NavItem;
