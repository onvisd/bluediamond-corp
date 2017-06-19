import React, {PropTypes} from 'react';

import styles from './styles.module.css';

const Panel = ({title, children}) => (
    <div className={styles.panel}>
        <div className={styles.header}>{title}</div>
        <div className={styles.body}>
            {children}
        </div>
    </div>
);

Panel.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default Panel;
