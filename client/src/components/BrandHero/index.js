import React, {PropTypes} from 'react';
import styles from './styles.module.css';

const BrandHero = ({logo, image, title, tagline}) => (
    <div className={styles.container} style={{backgroundImage: `url(${image})`}}>
        <div className={styles.innerContainer}>
            <img src={logo} className={styles.logo} />
            <h2>{title}</h2>
            <p className="t--type-prose">{tagline}</p>
        </div>
    </div>
);

BrandHero.propTypes = {
    logo: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired
};

export default BrandHero;
