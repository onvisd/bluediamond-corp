import React, {Component, PropTypes} from 'react';

import ProductPanel from '../../../components/ProductPanel';
import styles from './styles.module.css';

export default class Category extends Component {
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
                    <ProductPanel products={products} />
                </div>
            </div>
        );
    }
}
