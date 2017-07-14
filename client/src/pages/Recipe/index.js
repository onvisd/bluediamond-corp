import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import marked from 'marked';

import {connector, getRecipe} from 'state/recipe';
import {connector as navConnector, setNavigationStyle} from 'state/navigation';

import Title from 'components/Title';
import RecipeHead from 'components/API/RecipeHead';
import RecipeStep from 'components/API/RecipeStep';
import ProductCard from 'components/API/ProductCard';
import CardPanel from 'components/CardPanel';

import styles from './styles.module.css';

@preload(async ({dispatch, parameters}) => {
    await Promise.all([
        dispatch(getRecipe(parameters.slug)),
        dispatch(setNavigationStyle({className: 'brand--blue'}))
    ]);
})
@connect(
    (state) => ({
        ...connector(state.recipe),
        ...navConnector(state.navigation)
    }),
    {getRecipe, setNavigationStyle}
)
export default class Recipe extends Component {
    renderMarkup(field) {
        return {__html: marked(field)};
    }

    componentWillMount() {
        this.props.setNavigationStyle({className: 'brand--blue'});
    }

    componentWillUpdate(nextProps) {
        if(!nextProps.navigation.style.className)
            this.props.setNavigationStyle({className: 'brand--blue'});
    }

    componentWillUnmount() {
        this.props.setNavigationStyle({});
    }

    render() {
        const {recipe} = this.props;
        const item = recipe.items[0];
        const assets = recipe.includes.Asset;
        const ingredients = item.fields.ingredients;
        const notes = item.fields.notes;

        const stepEntries = {};
        const productEntries = {};
        const recipeEntries = {};

        recipe.includes.Entry.forEach((entry) => {
            if(entry.sys.contentType.sys.id === 'recipeStep')
                stepEntries[entry.sys.id] = entry;
            else if(entry.sys.contentType.sys.id === 'product')
                productEntries[entry.sys.id] = entry;
            else if(entry.sys.contentType.sys.id === 'recipe')
                recipeEntries[entry.sys.id] = entry;
        });

        const steps = item.fields.steps.map((step) => stepEntries[step.sys.id]);

        const includedProducts = item.fields.includedProducts.map((product) =>
            productEntries[product.sys.id]
        );

        const includedRecipes = item.fields.relatedRecipes.map((recipeItem) => {
            const entryItem = recipeEntries[recipeItem.sys.id];
            const entryAsset = assets.filter((asset) =>
                asset.sys.id === entryItem.fields.cardBackgroundImage.sys.id
            );

            entryItem.fields.cardBackgroundImage = entryAsset[0];

            return entryItem;
        });

        return (
            <section className="content">
                <Title>{`Recipe: ${item.fields.name}`}</Title>
                <RecipeHead data={recipe} />
                <div className={styles.container}>
                    <div className={styles.left}>
                        <h3>Directions</h3>
                        <ol className="t--list-unstyled">
                            {steps.map((step, idx) =>
                                <RecipeStep data={step} key={`step${idx}`} />
                            )}
                        </ol>
                        {notes &&
                            <div className={styles.notes}>
                                <p className={styles.noteTitle}><strong>Notes</strong></p>
                                <div dangerouslySetInnerHTML={this.renderMarkup(notes)} />
                            </div>
                        }
                    </div>
                    <div className={styles.right}>
                        <div className={styles.ingredients}>
                            <h3>Ingredients</h3>
                            <ul>
                                {ingredients.map((ingredient, idx) =>
                                    <li key={`ingredient${idx}`}>{ingredient}</li>
                                )}
                            </ul>
                        </div>
                        <div className={styles.includedProducts}>
                            <p><strong>Included in this recipe</strong></p>
                            {includedProducts.map((product, idx) => <ProductCard data={{
                                items: [product],
                                includes: recipe.includes
                            }} key={`product${idx}`} />)}
                        </div>
                    </div>
                </div>
                <div className={`${styles.container} ${styles.isRecipes}`}>
                    <h3>Related Recipes</h3>
                    <div className={styles.recipeList}>
                        <CardPanel
                            cards={includedRecipes}
                            type="recipes"
                            theme="blueLight"
                        />
                    </div>
                </div>
            </section>
        );
    }
}
