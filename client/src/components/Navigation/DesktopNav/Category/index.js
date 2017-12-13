import React, {PropTypes} from 'react';

import Button from 'components/Button';
import ProductLink from 'components/ProductLink';
import Card from 'components/Navigation/Card';
import sortByPriority from 'tools/sortByPriority';
import styles from './styles.module.css';

const Category = ({bgImage, brand, category, toggleNav}) => (
    <Card theme="wide" style={{backgroundImage: `url(${bgImage})`}}>
        <div className={styles.products}>
            {brand.fields.products
                .filter((product) =>
                    product.fields.brandCategory === category.fields.name &&
                    product.fields.featured
                )
                .sort(sortByPriority)
                .slice(0, 4)
                .map((product) => (
                    <ProductLink
                        key={product.fields.slug}
                        product={product}
                        type="nav"
                        onClick={toggleNav.hide}
                        className={styles.product}
                    />
                ))
            }
        </div>
        <div className={styles.buttons}>
            <Button
                theme={brand.fields.themeColor}
                href={`/brand/${brand.fields.slug}`}
                onClick={toggleNav.hide}
                className={styles.seeAll}
            >
                See All Products
            </Button>
            <Button
                theme="gray"
                href={`/store/?brands=${brand.fields.slug}`}
                onClick={toggleNav.hide}
                className={styles.seeAll}
            >
                Shop Online
            </Button>
            {brand.fields.slug === 'almond-breeze' &&
                <Button
                    theme="gray"
                    href={'/recipes'}
                    onClick={toggleNav.hide}
                    className={styles.seeAll}
                >
                    Browse Recipes
                </Button>
            }
        </div>
    </Card>
);

Category.propTypes = {
    bgImage: PropTypes.string,
    brand: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    toggleNav: PropTypes.object.isRequired
};

export default Category;
