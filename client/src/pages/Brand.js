import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector as brandConnector, getBrand} from '../redux/brand';
import {
    connector as navConnector,
    setNavigationStyle,
    setNavBreadcrumbs
} from '../redux/navigation';
import {parseModel} from '../tools/parseApi';

import BrandHero from '../components/BrandHero';
import BrandStories from '../components/BrandStories';
import BrandCategory from '../components/BrandCategory';
import BrandRecipePanel from '../components/BrandRecipePanel';

@preload(async ({dispatch, parameters}) => {
    const brand = await dispatch(getBrand(parameters.slug));
    const {fields} = brand.items[0];

    dispatch(setNavigationStyle({
        className: `brand--${fields.themeColor}`
    }));

    dispatch(setNavBreadcrumbs([{
        name: fields.name,
        path: `brand/${fields.slug}`
    }]));

    return brand;
})
@connect(
    (state) => ({
        ...brandConnector(state.brand),
        ...navConnector(state.navigation)
    }),
    {
        getBrand,
        setNavigationStyle,
        setNavBreadcrumbs
    }
)
export default class Brand extends Component {
    static propTypes = {
        brand: PropTypes.shape({
            items: PropTypes.arrayOf(PropTypes.shape({
                fields: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    slug: PropTypes.string.isRequired,
                    themeColor: PropTypes.string,
                    logo: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    heroImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    heroTagline: PropTypes.string.isRequired,
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
        })
    }

    componentWillUnmount() {
        this.props.setNavigationStyle({});
        this.props.setNavBreadcrumbs([]);
    }

    render() {
        const brand = parseModel(this.props.brand)[0].fields;

        return (
            <section className="content">
                <Title>{brand.name}</Title>
                <BrandHero
                    image={brand.heroImage.file.url}
                    title={brand.name}
                    logo={brand.logo.file.url}
                    tagline={brand.heroTagline}
                />
                <BrandStories stories={brand.stories} />
                <div>
                    {brand.categories.map((category) => (
                        <BrandCategory
                            key={category._id}
                            {...category}
                        />
                    ))}
                </div>
                <BrandRecipePanel
                    name={brand.name}
                    theme={brand.themeColor}
                    recipes={brand.recipePanel.recipes}
                />
            </section>
        );
    }
}
