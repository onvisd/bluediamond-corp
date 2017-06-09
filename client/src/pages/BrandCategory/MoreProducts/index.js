import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import styles from './styles.module.css';

const MoreProducts = ({products}) => (
    <div className={styles.container}>
        <h3 className={styles.heading}>More Blue Diamond Products</h3>
        <ul className={styles.products}>
            {products.map((product) => (
                <li className={styles.product} key={product.sys.id}>
                    <Link
                        to={
                        '/brand' +
                        `/${product.fields.brand.replace(' ', '-').toLowerCase()}` +
                        `/${product.fields.brandCategory.replace(' ', '-').toLowerCase()}` +
                        `/${product.fields.slug}`}
                    >
                        <div className={styles.image}>
                            <img src={product.fields.productPhotos[0].fields.file.url} />
                        </div>
                        <p className="t--weight-bold">{product.fields.brand}</p>
                        <p>{product.fields.name}</p>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

MoreProducts.propTypes = {
    products: PropTypes.array
};

export default MoreProducts;
