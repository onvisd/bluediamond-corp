import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import Button from '../../../Button';
import Card from '../../Card';
import styles from './styles.module.css';

const Category = ({brand, category, toggleNav}) => (
    <Card theme="wide">
        <ul className={styles.products}>
            {brand.fields.products
                .filter((product) =>
                    product.fields.brandCategory === category.fields.name &&
                    product.fields.featured
                )
                .slice(0, 4)
                .map((product) => (
                <li className={styles.product} key={product.fields.name}>
                    <Link
                        to={
                        '/brand' +
                        `/${brand.fields.slug}` +
                        `/${category.fields.slug}` +
                        `/${product.fields.slug}`}
                        onClick={toggleNav.hide}
                    >
                        <div className={styles.imageWrap}>
                            <img src={product.fields.productPhotos[0].fields.file.url} />
                        </div>
                        {product.fields.name}
                    </Link>
                </li>
            ))}
        </ul>
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
    brand: PropTypes.object.isRequired,
    category: PropTypes.object.isRequired,
    toggleNav: PropTypes.object.isRequired
};

export default Category;
