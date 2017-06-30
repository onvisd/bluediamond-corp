import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

import Button from 'components/Button';
import styles from './styles.module.css';

const MoreFlavors = ({brand, otherCategories}) => (
    <div className={styles.container}>
        <h3 className={styles.heading}>More {brand.fields.name} flavors</h3>
        <div className={styles.panels}>
            {otherCategories.filter((category) => !category.fields.hidden).map((category) => (
                <Link to={`/brand/${brand.fields.slug}/${category.fields.slug}`}
                    className={classnames(styles.panel, {
                        [styles.single]: otherCategories.length === 1
                    })}
                    key={category.sys.id}
                >
                    <div className={`${styles.accent} ${styles.accentLeft}`}>
                        <img src={category.fields.appetizerImages[0].fields.file.url} />
                    </div>
                    <div className={`${styles.accent} ${styles.accentRight}`}>
                        <img src={category.fields.appetizerImages[1].fields.file.url} />
                    </div>
                    <div className={styles.text}>
                        <h2>{category.fields.name}</h2>
                        <Button
                            theme={brand.fields.themeColor}
                        >
                            See Products
                        </Button>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

MoreFlavors.propTypes = {
    brand: PropTypes.object,
    otherCategories: PropTypes.array
};

export default MoreFlavors;
