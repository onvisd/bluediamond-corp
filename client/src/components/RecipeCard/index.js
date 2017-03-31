import React, {Component, PropTypes} from 'react';

import styles from './styles.module.css';

export default class RecipeCard extends Component {
    static PropTypes = {
        title: PropTypes.string.isRequired,
        imageFile: PropTypes.string.isRequired,
        imageAlt: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }

    render() {
        const {title, imageFile, imageAlt, description} = this.props;

        return (
            <div className={styles.container}>
                <h4>{title}</h4>
                <p>{description}</p>
                <img src={imageFile} alt={imageAlt} />
            </div>
        );
    }
}
