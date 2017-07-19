import React, {PropTypes} from 'react';
import classnames from 'classnames';
import styles from './styles.module.css';

const Hero = ({logo, image, title, textColor, tagline}) => (
    <div>
        <div
            className={classnames(styles.container, styles[textColor])}
            style={{backgroundImage: `url(${image})`}}
        >
            <div className={styles.innerContainer}>
                <img src={logo} className={styles.logo} alt={title} />
                {title && <h2>{title}</h2>}
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
    textColor: PropTypes.string.isRequired,
    tagline: PropTypes.string.isRequired,
    title: PropTypes.string
};

export default Hero;
