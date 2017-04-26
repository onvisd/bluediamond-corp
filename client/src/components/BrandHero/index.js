import React, {PropTypes} from 'react';
import styles from './styles.module.css';

const BrandHero = ({image, tagline, content}) => (
    <div className={styles.container} style={{backgroundImage: `url(${image})`}}>
        <div className={styles.innerContainer}>
            <h1 className={styles.tagline}>{tagline}</h1>
            <p className="t--type-prose">{content}</p>
        </div>
    </div>
);

BrandHero.propTypes = {
    image: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};

export default BrandHero;
