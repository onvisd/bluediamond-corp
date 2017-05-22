import React, {PropTypes} from 'react';
import styles from './styles.module.css';

const Card = ({theme, children}) => (
    <div className={styles[theme]}>
        {children}
    </div>
);

Card.propTypes = {
    theme: PropTypes.string,
    children: PropTypes.node.isRequired
};

Card.defaultProps = {
    theme: 'white'
};

export default Card;
