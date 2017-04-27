import React, {PropTypes} from 'react';
import styles from './styles.module.css';

const Breadcrumb = ({theme, onClick, children}) => (
    <div className={styles[theme]}>
        <button onClick={onClick}>
            {children}
        </button>
    </div>
);

Breadcrumb.propTypes = {
    theme: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

Breadcrumb.defaultProps = {
    theme: 'default'
};

export default Breadcrumb;
