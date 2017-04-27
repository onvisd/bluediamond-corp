import React, {PropTypes} from 'react';
import styles from './styles.module.css';

const View = ({children, theme}) => (
    <div className={styles[theme]}>
        {children}
    </div>
);

View.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.string
};

View.defaultProps = {
    theme: 'default'
};

export default View;
