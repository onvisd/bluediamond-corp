import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector, getBrand} from '../redux/brand';
import {parseModel} from '../tools/parseApi';

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
        brand: PropTypes.shape({
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
        })
    }

    render() {
        const brand = parseModel(this.props.brand)[0].fields;

        return (
            <section className="content">
                <Title>{brand.name}</Title>
                <Breadcrumbs
                    crumbs={[
                        {
                            name: brand.name,
                            path: brand.slug
                        }
                    ]}
                />
                <BrandHero
                    image={brand.heroImage.file.url}
                    tagline={brand.heroTagline}
                    content={brand.heroContent}
                />
                <BrandStories stories={brand.stories} />
                {brand.categories.map((category) => (
                    <BrandCategory
                        key={category._id}
                        {...category}
                    />
                ))}
                <BrandRecipePanel {...brand.recipePanel} />
            </section>
        );
    }
}
