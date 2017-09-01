import React, {PropTypes} from 'react';
import classnames from 'classnames';
import {Parallax} from 'react-parallax';

import ButtonDropdown from 'components/ButtonDropdown';

import callFloodlight from 'tools/callFloodlight';

import styles from './styles.module.css';

const Hero = ({brand, category, product, shopLinks}) => (
    <div>
        <div className={styles.hero}>
            <Parallax
                className={styles.background}
                bgImage={category.fields.heroBackground.fields.file.url}
                strength={100}
            />
            <div
                className={styles.shelf}
                style={{
                    backgroundImage: `url(${category.fields.productShelfImage.fields.file.url})`
                }}
            />
        </div>
        <div className={classnames(styles.productHero, styles[category.fields.productTextColor])}>
            <div className={styles.product}>
                <div className={styles.photo}>
                    <img
                        src={product.fields.productPhotos[0].fields.file.url}
                        alt={product.fields.name}
                    />
                </div>
                <div className={styles.info}>
                    <div>
                        <div className={classnames(styles.tag, styles[brand.fields.themeColor])}>
                            {category.fields.name}
                        </div>
                        <h1 className={classnames(
                            styles.name,
                            styles[category.fields.productTextColor]
                        )}>
                            {product.fields.name}
                        </h1>
                        <ButtonDropdown
                            items={shopLinks}
                            theme={brand.fields.themeColor}
                            layout="wide"
                            onClick={(evt, name) => {
                                callFloodlight.click('4035228', 'fy18s0', `${
                                    name.replace(/[^a-z0-9]/i, '').slice(0, 5).toLowerCase()
                                }0`);
                            }}
                            dropUp
                        >
                            Buy Online
                        </ButtonDropdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

Hero.propTypes = {
    brand: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    shopLinks: PropTypes.array.isRequired
};

export default Hero;
