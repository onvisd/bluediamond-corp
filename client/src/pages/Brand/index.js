import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector as brandConnector, getBrand} from '../../redux/brand';
import {
    connector as navConnector,
    setNavigationStyle,
    setNavBreadcrumbs
} from '../../redux/navigation';

import CardPanel from '../../components/CardPanel';
import Hero from './Hero';
import Stories from './Stories';
import Category from './Category';

@preload(async ({dispatch, parameters}) => {
    const brand = await dispatch(getBrand(parameters.slug));

    dispatch(setNavigationStyle({
        className: `brand--${brand.fields.themeColor}`
    }));

    dispatch(setNavBreadcrumbs([{
        name: brand.fields.name,
        path: `brand/${brand.fields.slug}`
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
        })
    }

    componentWillMount() {
        const {brand} = this.props;

        this.props.setNavigationStyle({
            className: `brand--${brand.fields.themeColor}`
        });

        this.props.setNavBreadcrumbs([{
            name: brand.fields.name,
            path: `brand/${brand.fields.slug}`
        }]);
    }

    componentWillUnmount() {
        this.props.setNavigationStyle({});
        this.props.setNavBreadcrumbs([]);
    }

    render() {
        const {brand} = this.props;

        return (
            <section className="content">
                <Title>{brand.fields.name}</Title>
                <Hero
                    image={brand.fields.heroImage.fields.file.url}
                    title={brand.fields.name}
                    logo={brand.fields.logo.fields.file.url}
                    tagline={brand.fields.heroTagline}
                />
                <Stories stories={brand.fields.stories} />
                <div>
                    {brand.fields.categories.map((category) => (
                        <Category
                            key={category.sys.id}
                            products={
                                brand.fields.products.filter((product) =>
                                    product.fields.brandCategory === category.fields.name
                                )
                            }
                            {...category.fields}
                        />
                    ))}
                </div>
                {brand.fields.waysToUse && (
                    <CardPanel
                        type="instagram"
                        name={brand.fields.name}
                        cards={brand.fields.waysToUse}
                    />
                )}
                {brand.fields.recipePanel && (
                    <CardPanel
                        type="recipes"
                        name={brand.fields.name}
                        theme={brand.fields.themeColor}
                        cards={brand.fields.recipePanel.recipes}
                    />
                )}
            </section>
        );
    }
}
