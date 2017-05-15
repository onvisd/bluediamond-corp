import React, {Component, PropTypes} from 'react';

import ProductCarousel from '../ProductCarousel';
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
                    <ProductCarousel products={products} />
                </div>
            </div>
        );
    }
}
