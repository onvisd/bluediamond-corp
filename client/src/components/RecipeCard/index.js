import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import styles from './styles.module.css';

export default class RecipeCard extends Component {
    static PropTypes = {
        title: PropTypes.string.isRequired,
        cookTime: PropTypes.number.isRequired,
        recipe: PropTypes.string.isRequired,
        difficulty: PropTypes.string.isRequired,
        imageFile: PropTypes.string.isRequired
    }

    render() {
        const {title, imageFile, cookTime, difficulty, recipe} = this.props;

        return (
            <div className={styles.container}>
                <Link
                    to={`/recipes/${recipe}`}
                    className={styles.image}
                    style={{backgroundImage: `url(${imageFile})`}}
                />
                <Link to={`/recipes/${recipe}`}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.meta}>{cookTime} minutes <span>|</span> {difficulty}</p>
                </Link>
            </div>
        );
    }
}
