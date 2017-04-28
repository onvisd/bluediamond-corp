import React, {Component, PropTypes} from 'react';
import Button from '../Button';
import styles from './styles.module.css';

import RecipeCard from '../API/RecipeCard';

export default class BrandRecipePanel extends Component {
    static PropTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        linkText: PropTypes.string.isRequired,
        linkUrl: PropTypes.string.isRequired,
        recipes: PropTypes.array.isRequired
    }

    render() {
        const {title, description, linkText, linkUrl, recipes} = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <div className={`${styles.recipeCards} l--row`}>
                        {recipes.map((recipe, idx) => (
                            <RecipeCard {...recipe} key={`recipe${idx}`} />
                        ))}
                    </div>
                    <Button theme="yellow" href={linkUrl}>
                        {linkText}
                    </Button>
                </div>
            </div>
        );
    }
}
