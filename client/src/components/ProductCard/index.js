import React, {Component, PropTypes} from 'react';

import styles from './styles.module.css';

export default class ProductCard extends Component {
    static PropTypes = {
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        imageFile: PropTypes.string.isRequired,
        imageAlt: PropTypes.string.isRequired
    }

    render() {
        const {title, slug, imageFile, imageAlt} = this.props;

        return (
            <div className={`${styles.container} l--col-auto`}>
                <a href={`/product/${slug}`}>
                    <div className={styles.image}>
                        <img src={imageFile} alt={imageAlt} />
                    </div>
                    <h4>{title}</h4>
                </a>
            </div>
        );
    }
}
