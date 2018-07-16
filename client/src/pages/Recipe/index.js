import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import marked from 'marked';
import moment from 'moment';
import classnames from 'classnames';
import Helmet from 'react-helmet';

import {connector, getRecipe} from 'state/recipe';
import {setHead} from 'state/head';
import {connector as navConnector, setNavigationStyle} from 'state/navigation';

import Title from 'components/Title';
import Meta from 'components/Meta';
import RecipeHead from 'components/API/RecipeHead';
import RecipeStep from 'components/API/RecipeStep';
import ProductCard from 'components/ProductCard';
import CardPanel from 'components/CardPanel';
import slugify from 'tools/slugify';

import styles from './styles.module.css';

@preload(async ({dispatch, parameters, location}) => {
    await Promise.all([
        dispatch(getRecipe(parameters.slug, location.search)).then((recipe) => {
            const item = recipe.items[0];

            const stepEntries = {};

            recipe.includes.Entry.forEach((entry) => {
                if(entry.sys.contentType.sys.id === 'recipeStep')
                    stepEntries[entry.sys.id] = entry;
            });

            const steps = item.fields.steps.map((step) => stepEntries[step.sys.id]);

            const assetsById = {};
            recipe.includes.Asset.forEach((asset) => {
                assetsById[asset.sys.id] = asset.fields;
            });

            // Add a structured data script tag to the page header for search engines
            return dispatch(setHead([
                <script type="application/ld+json" dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'http://schema.org/',
                        '@type': 'Recipe',
                        name: item.fields.name,
                        image: [
                            assetsById[item.fields.heroImage.sys.id].file.url.replace(
                                /^\/\//, 'https://'
                            )
                        ],
                        author: {
                            '@type': 'Person',
                            name: 'Blue Diamond'
                        },
                        datePublished: moment(item.sys.createdAt).format('YYYY-MM-DD'),
                        description:
                            `A ${item.fields.cookTime} minute recipe for ${
                                item.fields.name
                            } with Almond Breeze.`,
                        totalTime: `PT${item.fields.cookTime}M`,
                        recipeYield:
                            `${
                                item.fields.servingSize
                            } serving${
                                item.fields.servingSize === 1 ? '' : 's'
                            }`,
                        nutrition: {
                            '@type': 'NutritionInformation',
                            servingSize:
                                `${
                                    item.fields.servingSize
                                } serving${
                                    item.fields.servingSize === 1 ? '' : 's'
                                }`,
                            fatContent: item.fields.totalFat
                        },
                        recipeIngredient: item.fields.ingredients,
                        recipeInstructions: steps.map((step, idx) =>
                            `${idx + 1}. ${step.fields.content}`
                        ).join('\n\n')
                    })
                }} />
            ]));
        }),
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
        const sourceName = item.fields.sourceName;
        const sourceUrl = item.fields.sourceUrl;
        const courtesyName = item.fields.courtesyOfText;
        const courtesyUrl = item.fields.courtesyOfUrl;
        const featuredIn = item.fields.featuredIn;

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

        const assetsById = {};
        recipe.includes.Asset.forEach((asset) => {
            assetsById[asset.sys.id] = asset.fields;
        });

        const metaDescription = item.fields.description
            ? marked(item.fields.description).replace(/<[^>]*>/g, '').replace(/\n+$/, '')
            : `A ${item.fields.cookTime} minute recipe for ${
                item.fields.name
            } with Almond Breeze.`;

        return (
            <section className="content">
                <Title>{`Recipe: ${item.fields.name}`}</Title>
                <Meta>{[
                    {
                        name: 'keywords',
                        content:
                            'Blue Diamond,Blue Diamond Almonds,Almond,Almond Nuts,Almond Snack,' +
                            'Almond Milk,Snack Nuts,Almond Breeze,Nut Thins,Almond Flavors,' +
                            'Almond Milk,Nut Milk,Almond Recipes,Nut Recipes,' +
                            'Almond Cooking,Nut Cooking,Almond Baking,Nut Baking,Almond Dessert,' +
                            'Nuts Dessert,Recipe,Blue Diamond Recipe' +
                            'Blue Diamond Almonds Recipe,Almond Milk Recipe,Snack Nut Recipe,' +
                            'Almond Breeze Recipe,Nut Milk Recipe,'
                    },
                    {
                        property: 'og:title',
                        content: item.fields.name
                    },
                    {
                        property: 'og:image',
                        content: assetsById[item.fields.heroImage.sys.id].file.url
                    },
                    {
                        property: 'og:description',
                        content: metaDescription
                    },
                    {
                        name: 'description',
                        content: metaDescription
                    }
                ]}</Meta>
                <Helmet>
                    <link rel="canonical" href={`https://www.bluediamond.com${this.props.location.pathname}`} />
                </Helmet>
                <RecipeHead data={recipe} />
                {item.fields.description && (
                    <div className={classnames(styles.container, styles.description)}>
                        <div
                            dangerouslySetInnerHTML={this.renderMarkup(item.fields.description)}
                        />
                    </div>
                )}
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
                        <div className={styles.notes}>
                            <p>
                                {featuredIn &&
                                    <span>
                                        <strong>Featured In:</strong>&nbsp;
                                        {featuredIn.join(', ')}
                                        <br />
                                    </span>
                                }
                                {sourceName &&
                                    <span>
                                        <strong>Source:</strong>&nbsp;
                                        {sourceUrl
                                            ? <a href={sourceUrl} target="_blank">
                                                {sourceName}
                                            </a>
                                            : sourceName
                                        }
                                        <br />
                                    </span>
                                }
                                {courtesyName &&
                                    <span>
                                        <strong>Courtesy of:</strong>&nbsp;
                                        {courtesyUrl
                                            ? <a href={courtesyUrl} target="_blank">
                                                {courtesyName}
                                            </a>
                                            : courtesyName
                                        }
                                    </span>
                                }
                            </p>
                        </div>
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
                            {includedProducts.map((product) => {
                                const {fields} = product;

                                return (
                                    <ProductCard
                                        title={fields.name}
                                        slug={[
                                            '/brand',
                                            slugify(fields.brand),
                                            slugify(fields.brandCategory),
                                            fields.slug
                                        ].join('/')}
                                        images={recipe.productImages[product.sys.id]}
                                        imageAlt={fields.name}
                                        key={`product-${fields.slug}`}
                                    />
                                );
                            })}
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
