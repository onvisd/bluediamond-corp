import React, {PropTypes} from 'react';

import Button from 'components/Button';
import styles from './styles.module.css';

const MoreFlavors = ({brand, otherCategories}) => (
    <div className={styles.container}>
        <h3 className={styles.heading}>More {brand.fields.name} flavors</h3>
        <div className={styles.panels}>
            {otherCategories.map((category) => (
                <div className={styles.panel} key={category.sys.id}>
                    <div>
                        <h2>{category.fields.name}</h2>
                        <Button
                            href={`/brand/${brand.fields.slug}/${category.fields.slug}`}
                            theme={brand.fields.themeColor}
                        >
                            See Products
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

MoreFlavors.propTypes = {
    brand: PropTypes.object,
    otherCategories: PropTypes.array
};

export default MoreFlavors;
