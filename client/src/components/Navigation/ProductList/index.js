import React, {PropTypes} from 'react';
import styles from './styles.module.css';

const ProductList = ({products}) => (
    <ul className={styles.products}>
        {products.map((product) => (
            <li className={styles.product} key={product.name}>
                <img src={product.photo.file.url} />
                {product.name}
            </li>
        ))}
    </ul>
);

ProductList.propTypes = {
    products: PropTypes.array.isRequired
};

export default ProductList;
