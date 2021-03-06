import React, {Component, PropTypes} from 'react';
import {ViewPager, Frame, Track, View} from 'react-view-pager';
import classnames from 'classnames';

import Button from 'components/Button';
import ProductLink from 'components/ProductLink';

import image from 'tools/image';

import styles from './styles.module.css';

export default class MoreFlavorsDesktop extends Component {
    static propTypes = {
        brand: PropTypes.object,
        otherCategories: PropTypes.array,
        theme: PropTypes.string
    }

    state = {
        isOpen: false,
        currentPanel: null
    }

    openPanel = (current) => {
        this.setState({
            isOpen: true,
            currentPanel: current
        });
    }

    onChange = (currentIndices) => {
        const {currentView} = this.carouselTrack.context.pager;

        this.setState({
            currentPanel: {
                index: currentIndices[0],
                name: currentView.node.attributes.name.value
            }
        });
    }

    prev = () => {
        this.carouselTrack.prev();

        if(this.props.name && window && window.dataLayer) {
            window.dataLayer.push({
                event: 'interaction',
                action: 'click',
                label: this.props.name
            });
        }
    }

    next = () => {
        this.carouselTrack.next();

        if(this.props.name && window && window.dataLayer) {
            window.dataLayer.push({
                event: 'interaction',
                action: 'click',
                label: this.props.name
            });
        }
    }

    // Render the product cards that are seen in the carousel.
    // Trunticate to 6 items.
    renderProductCards = (category) => {
        const {brand, otherCategories, theme} = this.props;
        const visibleCategories = otherCategories.filter((cat) => !cat.fields.hidden);

        let products = {};
        visibleCategories.map(() => {
            products = brand.fields.products.filter(
              (product) => product.fields.brandCategory === category
            );
        });

        return products.slice(0, 6).map((product) => (
            <div key={product.sys.id} className={styles.productCard}>
                <ProductLink product={product} type="card" theme={theme}/>
            </div>
        ));
    }

    hasAppetizerImage(category, index) {
        return category.fields.appetizerImages && category.fields.appetizerImages[index];
    }

    // Render the inital panels for each flavor.
    // Buttons open the carousel.
    renderFlavorPanels = () => {
        const {brand, otherCategories, theme} = this.props;
        const visibleCategories = otherCategories.filter((category) => !category.fields.hidden);
        const className = classnames(styles.panel, {
            [styles.single]: otherCategories.length === 1
        });

        return (
            <div className={classnames(styles.container, styles[theme])}>
                <h3 className={styles.heading}>More {brand.fields.name} flavors</h3>
                <div className={styles.panels}>
                    {visibleCategories.map((category, i) => (
                        <div className={className} key={category.sys.id}>
                            {this.hasAppetizerImage(category, 0)
                                ? (
                                    <div className={`${styles.accent} ${styles.accentLeft}`}>
                                        <img
                                            src={image(
                                                category.fields.appetizerImages[0].fields.file.url,
                                                {
                                                    width: 400
                                                }
                                            )}
                                            alt="Flavor Accent"
                                        />
                                    </div>
                                )
                                : null
                            }
                            {this.hasAppetizerImage(category, 1)
                                ? (
                                    <div className={`${styles.accent} ${styles.accentRight}`}>
                                        <img
                                            src={image(
                                                category.fields.appetizerImages[1].fields.file.url,
                                                {
                                                    width: 400
                                                }
                                            )}
                                            alt="Flavor Accent"
                                        />
                                    </div>
                                )
                                : null
                            }
                            <div className={styles.text}>
                                <h2>{category.fields.name}</h2>
                                <Button onClick={() => this.openPanel({
                                    index: i,
                                    name: category.fields.name
                                })} theme={brand.fields.themeColor}>
                                    See more products
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    renderCategoryCard(category, numCategories) {
        return (
            <View
              key={category.sys.id}
              className={styles.productSlide}
              name={category.fields.name}
              style={numCategories <= 1 && {margin: '0 auto'}}
            >
                <div className={`${styles.panel} ${styles.hasProducts}`}>
                    {this.hasAppetizerImage(category, 0) && (
                        <div className={`${styles.accent} ${styles.accentLeft}`}>
                            <img
                                src={image(
                                  category.fields.appetizerImages[0].fields.file.url,
                                  {width: 400}
                              )}
                              alt="Flavor Accent"
                            />
                        </div>
                    )}
                    {this.hasAppetizerImage(category, 1) && (
                        <div className={`${styles.accent} ${styles.accentRight}`}>
                            <img
                              src={image(
                                  category.fields.appetizerImages[1].fields.file.url,
                                  {
                                      width: 400
                                  }
                              )}
                              alt="Flavor Accent"
                            />
                        </div>
                    )}
                    <div className={styles.products}>
                        {this.renderProductCards(category.fields.name)}
                    </div>
                </div>
            </View>
        );
    }

    // Render and handle the flavor Carousel
    renderFlavorProducts = () => {
        const {currentPanel} = this.state;
        const {otherCategories, theme} = this.props;
        const categories = otherCategories.filter((cat) => !cat.fields.hidden);

        return (
            <ViewPager className={classnames(styles.container, styles[theme])}>
                <nav className={styles.header}>
                    {categories.length > 1 && <a onClick={this.prev}>← Previous</a>}
                    <h3 className={styles.heading}>
                        {currentPanel.name}
                    </h3>
                    {categories.length > 1 && <a onClick={this.next}>Next →</a>}
                </nav>
                <Frame>
                    <Track
                        ref={(track) => {
                            this.carouselTrack = track;
                        }}
                        onViewChange={this.onChange}
                        viewsToShow={1}
                        align={categories.length > 1 && 0.5}
                        swipe={categories.length <= 1 && false}
                        style={{display: 'flex'}}
                        infinite
                    >
                        {categories.map((category) =>
                            this.renderCategoryCard(category, categories.length)
                        )}
                    </Track>
                </Frame>
            </ViewPager>
        );
    }

    render() {
        const {isOpen} = this.state;
        return isOpen ? this.renderFlavorProducts() : this.renderFlavorPanels();
    }
}
