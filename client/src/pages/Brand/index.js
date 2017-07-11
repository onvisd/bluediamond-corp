import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';

import {connector as brandConnector, getBrand} from 'state/brand';
import {
    connector as navConnector,
    setNavigationStyle
} from 'state/navigation';

import Title from 'components/Title';
import Button from 'components/Button';
import CardPanel from 'components/CardPanel';
import Carousel from 'components/Carousel';
import Hero from './Hero';
import Story from './Story';
import Category from './Category';
import sortByPriority from 'tools/sortByPriority';
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
        responsive: state.responsive,
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
                mobileHeroImage: PropTypes.shape({
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

    componentDidMount() {
        if(location.hash) {
            setTimeout(() => {
                const posTop = document.querySelector(
                    `#${location.hash.replace(/^#/, '')}`
                ).offsetTop;
                window.scrollTo(0, posTop);
            }, 500);
        }
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
        const {brand, responsive} = this.props;

        const heroImage = (responsive.small && brand.fields.mobileHeroImage)
                            ? brand.fields.mobileHeroImage
                            : brand.fields.heroImage;

        return (
            <section className="content">
                <Title>{brand.fields.name}</Title>
                <Hero
                    image={heroImage.fields.file.url}
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
                                desktopImage={story.fields.backgroundImage.fields.file.url}
                                smallDesktopImage={
                                    story.fields.smallDesktopBackgroundImage.fields.file.url
                                }
                                tabletImage={story.fields.tabletBackgroundImage.fields.file.url}
                                mobileImage={story.fields.mobileBackgroundImage.fields.file.url}
                            />
                        ))}
                    />
                )}
                <div style={{backgroundImage: `url(${brand.fields.backgroundTexture.fields.file.url})`}}>
                    {brand.fields.categories
                        .filter((category) => !category.fields.hidden)
                        .map((category) => (
                            <Category
                                key={category.sys.id}
                                products={
                                    brand.fields.products.filter((product) =>
                                        product.fields.brandCategory === category.fields.name
                                    ).sort(sortByPriority)
                                }
                                {...category.fields}
                            />
                        ))
                    }
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
                            <h2>Try Our Delicious Recipes</h2>
                            <Button href="/recipes" theme="blueLight">
                                Click Here
                            </Button>
                        </div>
                    </div>
                )}
            </section>
        );
    }
}
