import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector, getBrand} from '../redux/brand';

import Breadcrumbs from '../components/Breadcrumbs';
import BrandHero from '../components/BrandHero';
import BrandStories from '../components/BrandStories';
import BrandCategory from '../components/BrandCategory';
import BrandRecipePanel from '../components/BrandRecipePanel';

@preload(({dispatch, parameters}) => dispatch(getBrand(parameters.slug)))
@connect(
    (state) => ({...connector(state.brand)}),
    {getBrand}
)
export default class Brand extends Component {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            fields: PropTypes.shape({
                name: PropTypes.string.isRequired,
                slug: PropTypes.string.isRequired,
                heroImage: PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                }),
                heroTagline: PropTypes.string.isRequired,
                heroContent: PropTypes.string.isRequired,
                stories: PropTypes.arrayOf(PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                })),
                categories: PropTypes.arrayOf(PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                })),
                recipePanel: PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                })
            })
        })),
        includes: PropTypes.shape({
            Entry: PropTypes.arrayOf(PropTypes.shape({
                sys: PropTypes.shape({
                    id: PropTypes.string.isRequired
                })
            })),
            Asset: PropTypes.arrayOf(PropTypes.shape({
                sys: PropTypes.shape({
                    id: PropTypes.string.isRequired
                })
            }))
        })
    }

    getImage = (id) => {
        const assets = this.props.brand.includes.Asset;

        return assets.filter((asset) => (
            asset.sys.id === id
        ))[0].fields.file.url;
    };

    getStories = (ids) => {
        const entries = this.props.brand.includes.Entry;

        return entries.filter((entry) =>
            ids.indexOf(entry.sys.id) !== -1
        ).map((entry) => ({
            ...entry.fields,
            backgroundImage: this.getImage(entry.fields.backgroundImage.sys.id)
        }));
    };

    getProducts = (ids) => {
        const entries = this.props.brand.includes.Entry;

        return entries.filter((entry) =>
            ids.indexOf(entry.sys.id) !== -1
        ).map((entry) => ({
            name: entry.fields.name,
            slug: entry.fields.slug,
            image: this.getImage(entry.fields.productPhotos[0].sys.id)
        }));
    };

    getCategories = (ids) => {
        const entries = this.props.brand.includes.Entry;

        return entries.filter((entry) =>
            ids.indexOf(entry.sys.id) !== -1
        ).map((entry) => ({
            ...entry.fields,
            products: this.getProducts(
                entry.fields.products.map((product) => product.sys.id))
        }));
    };

    getRecipeCards = (ids) => {
        const entries = this.props.brand.includes.Entry;
        const assets = this.props.brand.includes.Asset;

        return entries.filter((entry) =>
            ids.indexOf(entry.sys.id) !== -1
        ).map((entry) => ({
            data: {
                entry,
                assets: assets.filter(
                    (asset) => asset.sys.id === entry.fields.backgroundImage.sys.id)
            }
        }));
    };

    getRecipePanel = (id) => {
        const entries = this.props.brand.includes.Entry;

        return entries.filter((entry) =>
            entry.sys.id === id
        ).map((entry) => ({
            ...entry.fields,
            recipes: this.getRecipeCards(
                entry.fields.recipes.map((recipe) => recipe.sys.id))
        }))[0];
    };

    render() {
        const {brand} = this.props;
        const data = brand.items[0];
        const heroImage = this.getImage(data.fields.heroImage.sys.id);
        const stories = this.getStories(
            data.fields.stories.map((story) => story.sys.id));
        const categories = this.getCategories(
            data.fields.categories.map((category) => category.sys.id));
        const recipePanel = this.getRecipePanel(data.fields.recipePanel.sys.id);

        return (
            <section className="content">
                <Title>{data.fields.name}</Title>
                <Breadcrumbs
                    crumbs={[
                        {
                            name: data.fields.name,
                            path: data.fields.slug
                        }
                    ]}
                />
                <BrandHero
                    image={heroImage}
                    tagline={data.fields.heroTagline}
                    content={data.fields.heroContent}
                />
                <BrandStories stories={stories} />
                {categories.map((category, idx) => (
                    <BrandCategory
                        key={`brandCategory${idx}`}
                        {...category}
                    />
                ))}
                <BrandRecipePanel {...recipePanel} />
            </section>
        );
    }
}
