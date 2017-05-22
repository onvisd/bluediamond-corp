import React, {PropTypes} from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';

const Breadcrumb = ({theme, fixed, onClick, children}) => (
    <div onClick={onClick} className={classnames(styles[theme], {[styles.fixed]: fixed})}>
        {children}
    </div>
);

Breadcrumb.propTypes = {
    theme: PropTypes.string,
    fixed: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};

Breadcrumb.defaultProps = {
    theme: 'default',
    fixed: false
};

export default Breadcrumb;
