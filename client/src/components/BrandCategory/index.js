import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import styles from './styles.module.css';

export default class BrandCategory extends Component {
    static PropTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        products: PropTypes.array
    }

    render() {
        const {name, description, products} = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <ul className={styles.productList}>
                        {products.map((product) => (
                            <li className={styles.product} key={product._id}>
                                <Link to={`/${product.slug}`}>
                                    <img src={product.productPhotos[0].file.url} />
                                    {product.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
