import React, {Component, PropTypes} from 'react';

import styles from './styles.module.css';

export default class ProductCard extends Component {
    static PropTypes = {
        id: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        imageFile: PropTypes.string.isRequired,
        imageAlt: PropTypes.string.isRequired
    }

    render() {
        const {type, title, slug, imageFile, imageAlt} = this.props;

        return (
            <div className={styles.container}>
                <a href={slug}>
                    <div className={styles.image}>
                        <img src={imageFile} alt={imageAlt} />
                    </div>
                    <p>
                        <strong>{type}</strong><br />
                        {title}
                    </p>
                </a>
            </div>
        );
    }
}
