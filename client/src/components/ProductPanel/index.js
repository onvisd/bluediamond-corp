import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

import styles from './styles.module.css';

const ProductPanel = ({activeProduct, products}) => (
    <div className={styles.container}>
        <ul className={styles.productList}>
            {products.map((product) => (
                <li
                    className={classnames(styles.product, {
                        [styles.opaque]: !activeProduct,
                        [styles.active]: activeProduct &&
                            activeProduct.fields.slug === product.fields.slug
                    })}
                    key={product.sys.id}
                >
                    <Link
                        to={`/brand/${
                            product.fields.brand.replace(' ', '-').toLowerCase()
                        }/${
                            product.fields.brandCategory.replace(' ', '-').toLowerCase()
                        }?product=${product.fields.slug}`}
                    >
                        <img src={product.fields.productPhotos[0].fields.file.url} />
                        {product.fields.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

ProductPanel.propTypes = {
    products: PropTypes.array.isRequired
};

export default ProductPanel;
