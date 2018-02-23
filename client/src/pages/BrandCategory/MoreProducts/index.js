import React, {PropTypes} from 'react';

import ProductLink from 'components/ProductLink';
import classnames from 'classnames';
import styles from './styles.module.css';

const MoreProducts = ({products, theme}) => (
    <div className={classnames(styles.container, styles[theme])}>
        <h3 className={styles.heading}>More Blue Diamond Products</h3>
        <ul className={styles.products}>
            {products.map((product) => (
                <li className={styles.product} key={product.sys.id}>
                    <ProductLink product={product} showBrand type="card" theme={theme} />
                </li>
            ))}
        </ul>
    </div>
);

MoreProducts.propTypes = {
    products: PropTypes.array
};

export default MoreProducts;
