import React, {PropTypes} from 'react';
import Button from '../Button';
import styles from './styles.module.css';

const StoreHero = ({image, title, tagline, buttonText, buttonUrl}) => (
    <div className={styles.container} style={{backgroundImage: `url(${image})`}}>
        <div className={styles.innerContainer}>
            <h2>{title}</h2>
            <p>{tagline}</p>
        </div>
    </div>
);

StoreHero.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string,
    buttonText: PropTypes.string,
    buttonUrl: PropTypes.string
};

export default StoreHero;
