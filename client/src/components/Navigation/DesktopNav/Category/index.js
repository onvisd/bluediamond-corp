import React, {PropTypes} from 'react';

import Button from 'components/Button';
import ProductLink from 'components/ProductLink';
import Card from 'components/Navigation/Card';
import styles from './styles.module.css';

const Category = ({bgImage, brand, category, toggleNav}) => (
    <Card theme="wide" style={{backgroundImage: `url(${bgImage})`}}>
        <div
            className={styles.products}
            style={{
                backgroundImage:
                    `url(${category.fields.appetizerImages[0].fields.file.url}), ` +
                    `url(${category.fields.appetizerImages[1].fields.file.url})`
            }}
        >
            {brand.fields.products
                .filter((product) =>
                    product.fields.brandCategory === category.fields.name &&
                    product.fields.featured
                )
                .slice(0, 4)
                .map((product) => (
                <ProductLink
                    key={product.fields.slug}
                    product={product}
                    type="nav"
                    onClick={toggleNav.hide}
                />
            ))}
        </div>
        <Button
            theme={brand.fields.themeColor}
            href={`/brand/${brand.fields.slug}`}
            onClick={toggleNav.hide}
        >
            See All Products
        </Button>
    </Card>
);

Category.propTypes = {
    bgImage: PropTypes.string,
    brand: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    toggleNav: PropTypes.object.isRequired
};

export default Category;
