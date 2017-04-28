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
            <div className="l--col-12-at-s l--col-4-at-l">
                <div className={styles.container} style={{backgroundImage: `url(${imageFile})`}}>
                    <Link to={`/recipe/${recipe}`}></Link>
                    <h3>{title}</h3>
                    <p>{cookTime} minutes - {difficulty}</p>
                </div>
            </div>
        );
    }
}
