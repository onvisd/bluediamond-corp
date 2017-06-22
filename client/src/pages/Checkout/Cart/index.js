import React, {PropTypes} from 'react';

import styles from './styles.module.css';

const Cart = ({products}) => (
    <div className={styles.container}>
        <div className={styles.title}>
            In My Cart
            <a href="#" className={styles.edit}>Edit</a>
        </div>
        <div className={styles.content}>
            {products && products.map((product, i) => (
                <div key={`product-${i}`}>
                    {product.title}
                </div>
            ))}
        </div>
    </div>
);

Cart.propTypes = {
    products: PropTypes.array
};

export default Cart;
