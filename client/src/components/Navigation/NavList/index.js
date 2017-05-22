import React, {PropTypes} from 'react';
import styles from './styles.module.css';

const NavList = ({type, children}) => (
    <ul className={styles[type]}>
        {children}
    </ul>
);

NavList.propTypes = {
    type: PropTypes.string,
    children: PropTypes.node.isRequired
};

NavList.defaultProps = {
    type: 'base'
};

export default NavList;
