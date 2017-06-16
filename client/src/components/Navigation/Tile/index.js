import React, {PropTypes} from 'react';
import styles from './styles.module.css';

const Tile = ({bgImage, children}) => (
    <li className={styles.tile} style={{backgroundImage: `url(${bgImage})`}}>
        {children}
    </li>
);

Tile.propTypes = {
    bgImage: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default Tile;
