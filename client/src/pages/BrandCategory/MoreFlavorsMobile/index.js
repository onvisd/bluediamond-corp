import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

import Button from 'components/Button';
import ProductLink from 'components/ProductLink';
import styles from './styles.module.css';

@connect(
    (state) => ({
        responsive: state.responsive
    })
)
export default class MoreFlavorsMobile extends Component {
    static propTypes = {
        brand: PropTypes.object,
        otherCategories: PropTypes.array,
        theme: PropTypes.string
    }

    state = {
        currentPanel: null
    }

    openPanel = (current) => {
        this.setState({
            currentPanel: current
        });
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
                <ProductLink product={product} type="card" modifierClass="short" theme={theme}/>
            </div>
        ));
    }

    render() {
        const {currentPanel} = this.state;
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
                        <div className={`${className}
                          ${currentPanel === i ? styles.isOpen : null}`} key={category.sys.id}>
                            {category.fields.appetizerImages &&
                              <div className={`${styles.accent} ${styles.accentLeft}`}>
                                  <img
                                      src={category.fields.appetizerImages[0].fields.file.url}
                                      alt="Flavor Accent"
                                  />
                              </div>
                            }
                            {category.fields.appetizerImages &&
                                <div className={`${styles.accent} ${styles.accentRight}`}>
                                    <img
                                        src={category.fields.appetizerImages[1].fields.file.url}
                                        alt="Flavor Accent"
                                    />
                                </div>
                            }
                            <div className={`${styles.text}
                                ${currentPanel === i ? styles.isHidden : null}`}>
                                <h2>{category.fields.name}</h2>
                                <Button
                                  onClick={() => this.openPanel(i)}
                                  theme={brand.fields.themeColor}
                                >
                                    See more products
                                </Button>
                            </div>
                            {currentPanel === i && <div className={styles.products}>
                                <div className={styles.text}><h2>{category.fields.name}</h2></div>
                                {this.renderProductCards(category.fields.name)}
                            </div>}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
