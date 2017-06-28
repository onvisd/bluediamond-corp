import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classNames from 'classnames';
import styles from './styles.module.css';

const Tile = ({bgImage, children, to, onClick}) => (
    <li
        className={classNames(styles.tile, {[styles.hasLink]: to})}
        onClick={!to && onClick ? onClick : null}
    >
        <div className={styles.background} style={{backgroundImage: `url(${bgImage})`}} />
        {to
            ? (<Link to={to} onClick={onClick} className={styles.tileLink}>{children}</Link>)
            : children
        }
    </li>
);

Tile.propTypes = {
    bgImage: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default Tile;
