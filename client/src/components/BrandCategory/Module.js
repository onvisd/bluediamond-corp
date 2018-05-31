import React from 'react';

import sortByPriority from 'tools/sortByPriority';
import BrandCategory from './';
import styles from './styles.module.css';

const BrandCategoryModule = ({fields}) => {
    const bgTexture = fields.backgroundTexture ? {
        backgroundImage: `url(${fields.backgroundTexture.fields.file.url})`,
        backgroundSize: `${
            fields.backgroundTexture.fields.file.details.image.width / 2
        }px`
    } : null;

    return (
        <div style={bgTexture} className={styles[fields.theme]}>
            <BrandCategory
                theme={fields.theme}
                products={fields.products.sort(sortByPriority)}
                {...fields.brandCategory.fields}
            />
        </div>
    );
};

export default BrandCategoryModule;
