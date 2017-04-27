import React, {PropTypes} from 'react';
import styles from './styles.module.css';

const Tile = ({children}) => (
    <li className={styles.tile}>
        {children}
    </li>
);

Tile.propTypes = {
    children: PropTypes.node.isRequired
};

export default Tile;
