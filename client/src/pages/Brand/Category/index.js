import React, {Component, PropTypes} from 'react';

import ProductPanel from '../../../components/ProductPanel';
import styles from './styles.module.css';

export default class Category extends Component {
    static PropTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        backgroundTexture: PropTypes.string,
        products: PropTypes.array
    }

    render() {
        const {name, description, backgroundTexture, products} = this.props;

        return (
            <div
                className={styles.container}
                style={{backgroundImage: `url(${backgroundTexture})`}}
            >
                <div className={styles.innerContainer}>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <ProductPanel
                        products={products}
                        showActiveClasses={false}
                    />
                </div>
            </div>
        );
    }
}
