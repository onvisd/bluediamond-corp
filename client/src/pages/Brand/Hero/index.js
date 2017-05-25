import React, {PropTypes} from 'react';
import styles from './styles.module.css';

const Hero = ({logo, image, title, tagline}) => (
    <div>
        <div className={styles.container} style={{backgroundImage: `url(${image})`}}>
            <div className={styles.innerContainer}>
                <img src={logo} className={styles.logo} />
                <h2>{title}</h2>
                <p>{tagline}</p>
            </div>
        </div>
        <div className={styles.info}>
            <h2>{title}</h2>
            <p>{tagline}</p>
        </div>
    </div>
);

Hero.propTypes = {
    logo: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired
};

export default Hero;
