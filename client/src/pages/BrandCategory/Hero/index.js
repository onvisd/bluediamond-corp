import React, {PropTypes} from 'react';
import classnames from 'classnames';

import ButtonDropdown from '../../../components/ButtonDropdown';
import styles from './styles.module.css';

const Hero = ({brand, category, product}) => (
    <div className={styles.hero}>
        <div
            className={styles.background}
            style={{backgroundImage: `url(${category.fields.heroBackground.fields.file.url})`}}
        />
        <div
            className={styles.shelf}
            style={{backgroundImage: `url(${category.fields.productShelfImage.fields.file.url})`}}
        />
        <div className={styles.product}>
            <div className={styles.photo}>
                <img src={product.fields.productPhotos[0].fields.file.url} />
            </div>
            <div className={styles.info}>
                <div className={classnames(styles.tag, styles[brand.fields.themeColor])}>
                    {category.fields.name}
                </div>
                <h1 className={styles.name}>
                    {product.fields.name}
                </h1>
                <ButtonDropdown
                    items={[
                        {slug: '/store', name: 'Blue Diamond Store'},
                        {slug: 'https://www.amazon.com', name: 'Amazon.com', external: true},
                        {slug: 'https://www.jet.com', name: 'Jet.com', external: true}
                    ]}
                    theme={brand.fields.themeColor}
                    layout="wide"
                    dropUp
                >
                    Buy Online
                </ButtonDropdown>
            </div>
        </div>
    </div>
);

Hero.propTypes = {
    brand: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired
};

export default Hero;
