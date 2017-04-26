import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import styles from './styles.module.css';

const BrandCategory = ({name, description, products}) => (
    <div className={styles.container}>
        <div className={styles.innerContainer}>
            <h2>{name}</h2>
            <p>{description}</p>
            <ul className={styles.productList}>
                {products.map((product, idx) => (
                    <li className={styles.product} key={`product${idx}`}>
                        <Link to={`/${product.slug}`}>
                            <img src={product.image} />
                            {product.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

BrandCategory.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }))
};

export default BrandCategory;
