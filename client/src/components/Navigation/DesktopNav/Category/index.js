import React, {PropTypes} from 'react';

import Button from '../../../Button';
import Card from '../../Card';
import styles from './styles.module.css';

const Category = ({brand, category, toggleNav}) => (
    <Card theme="wide">
        <ul className={styles.products}>
            {category.products.map((product) => (
                <li className={styles.product} key={product.name}>
                    <img src={product.productPhotos[0].file.url} />
                    {product.name}
                </li>
            ))}
        </ul>
        <Button
            theme={brand.themeColor}
            href={`/brand/${brand.slug}`}
            onClick={toggleNav.hide}
        >
            See All Products
        </Button>
    </Card>
);

Category.propTypes = {
    brand: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    toggleNav: PropTypes.object.isRequired
};

export default Category;
