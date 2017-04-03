import React, {Component, PropTypes} from 'react';

import styles from './styles.module.css';

export default class ProductCard extends Component {
    static PropTypes = {
        title: PropTypes.string.isRequired,
        imageFile: PropTypes.string.isRequired,
        imageAlt: PropTypes.string.isRequired
    }

    render() {
        const {title, imageFile, imageAlt} = this.props;

        return (
            <div className={styles.container}>
                <img src={imageFile} alt={imageAlt} />
                <h4>{title}</h4>
            </div>
        );
    }
}
