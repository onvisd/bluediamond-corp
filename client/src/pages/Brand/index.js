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
import styles from './styles.module.css';

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
                    textColor={brand.fields.heroTextColor}
                    logo={brand.fields.logo.fields.file.url}
                    tagline={brand.fields.heroTagline}
                />
                {brand.fields.stories &&
                    <Stories stories={brand.fields.stories} />}
                <div>
                    {brand.fields.categories.map((category) => (
                        <Category
                            key={category.sys.id}
                            backgroundTexture={brand.fields.backgroundTexture.fields.file.url}
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
                        title={`Ways to use ${brand.fields.name}`}
                        cards={brand.fields.waysToUse}
                    />
                )}
                {brand.fields.brandRecipesImage && (
                    <div className={styles.hero} style={{
                        backgroundImage: `url(${brand.fields.brandRecipesImage.fields.file.url})`
                    }}>
                        <h2>Try out these delicious recipes below</h2>
                    </div>
                )}
                {brand.fields.recipes && (
                    <CardPanel
                        type="recipes"
                        theme={brand.fields.themeColor}
                        cards={brand.fields.recipes}
                    />
                )}
            </section>
        );
    }
}
