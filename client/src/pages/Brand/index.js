import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector as brandConnector, getBrand} from '../../redux/brand';
import {
    connector as navConnector,
    setNavigationStyle
} from '../../redux/navigation';

import Button from '../../components/Button';
import CardPanel from '../../components/CardPanel';
import Carousel from '../../components/Carousel';
import Hero from './Hero';
import Story from './Story';
import Category from './Category';
import styles from './styles.module.css';

@preload(async ({dispatch, parameters}) => {
    const brand = await dispatch(getBrand(parameters.slug));

    dispatch(setNavigationStyle({
        className: `brand--${brand.fields.themeColor}`
    }));

    return brand;
})
@connect(
    (state) => ({
        ...brandConnector(state.brand),
        ...navConnector(state.navigation)
    }),
    {
        getBrand,
        setNavigationStyle
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
    }

    componentWillUpdate(nextProps) {
        const {brand} = this.props;

        if(!nextProps.navigation.style.className) {
            this.props.setNavigationStyle({
                className: `brand--${brand.fields.themeColor}`
            });
        }
    }

    componentWillUnmount() {
        this.props.setNavigationStyle({});
    }

    render() {
        const {brand} = this.props;

        return (
            <section className="content">
                <Title>{brand.fields.name}</Title>
                <Hero
                    image={brand.fields.heroImage.fields.file.url}
                    title={brand.fields.heroTitle}
                    textColor={brand.fields.heroTextColor}
                    logo={brand.fields.logo.fields.file.url}
                    tagline={brand.fields.heroTagline}
                />
                {brand.fields.stories && (
                    <Carousel
                        classNames={{container: styles.carousel}}
                        showArrows
                        showTabs
                        tabColor="light"
                        settings={{
                            viewsToShow: 1,
                            infinite: true
                        }}
                        cards={brand.fields.stories.map((story) => (
                            <Story
                                tagline={story.fields.tagline}
                                content={story.fields.content}
                                image={story.fields.backgroundImage.fields.file.url}
                                align={story.fields.textAlignment}
                            />
                        ))}
                    />
                )}
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
                        <div>
                            <h2>Try our delicious recipes</h2>
                            <Button href="/recipes" theme="blueLight">
                                Click here
                            </Button>
                        </div>
                    </div>
                )}
            </section>
        );
    }
}
