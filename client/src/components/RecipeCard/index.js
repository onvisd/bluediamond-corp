import React, {Component, PropTypes} from 'react';

import styles from './styles.module.css';

export default class RecipeCard extends Component {
    static PropTypes = {
        title: PropTypes.string.isRequired,
        imageFile: PropTypes.string.isRequired,
        imageName: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }

    render() {
        const {title, imageFile, imageName, description} = this.props;

        return (
            <div className={styles.container}>
                <h4>{title}</h4>
                <p>{description}</p>
                <img src={imageFile} alt={imageName} />
            </div>
        );
    }
}
