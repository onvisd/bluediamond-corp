import React, {PropTypes} from 'react';
import classnames from 'classnames';

import Button from 'components/Button';
import styles from './styles.module.css';

const MoreFlavors = ({brand, otherCategories}) => (
    <div className={styles.container}>
        <h3 className={styles.heading}>More {brand.fields.name} flavors</h3>
        <div className={styles.panels}>
            {otherCategories.map((category) => (
                <div
                    className={classnames(styles.panel, {
                        [styles.single]: otherCategories.length === 1
                    })}
                    key={category.sys.id}
                    style={{
                        backgroundImage:
                            `url(${category.fields.appetizerImages[0].fields.file.url}), ` +
                            `url(${category.fields.appetizerImages[1].fields.file.url})`
                    }}
                >
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
