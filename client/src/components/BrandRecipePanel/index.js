import React, {PropTypes} from 'react';
import Button from '../Button';
import styles from './styles.module.css';

import RecipeCard from '../API/RecipeCard';

const BrandRecipePanel = ({title, description, linkText, linkUrl, recipes}) => (
    <div className={styles.container}>
        <div className={styles.innerContainer}>
            <h2>{title}</h2>
            <p>{description}</p>
            <div className={styles.recipeCards}>
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

BrandRecipePanel.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    recipes: PropTypes.arrayOf(PropTypes.shape({
        sys: PropTypes.shape({
            id: PropTypes.string.isRequired
        }),
        fields: PropTypes.shape({
            name: PropTypes.string.isRequired,
            backgroundImage: PropTypes.shape({
                sys: PropTypes.shape({
                    id: PropTypes.string.isRequired
                })
            })
        })
    }))
};

export default BrandRecipePanel;
