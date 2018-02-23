import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import Button from 'components/Button';
import ButtonDropdown from 'components/ButtonDropdown';
import ProductPanel from 'components/ProductPanel';
import ProductAccordion from 'components/ProductAccordion';

import preventOrphan from 'tools/preventOrphan';

import styles from './styles.module.css';

export default class ProductSection extends Component {
    static propTypes = {
        brand: PropTypes.object.isRequired,
        category: PropTypes.object.isRequired,
        products: PropTypes.array.isRequired,
        activeProduct: PropTypes.object.isRequired,
        setActiveProduct: PropTypes.func.isRequired,
        shopLinks: PropTypes.array.isRequired,
        theme: PropTypes.string
    }

    state = {
        isOpen: false
    };

    toggleProductPanel = () => {
        this.setState((state) => ({
            isOpen: !state.isOpen
        }));
    }

    render() {
        const {isOpen} = this.state;
        const {brand, products, activeProduct, setActiveProduct, shopLinks, theme} = this.props;

        return (
            <div className={styles.container}>
                <div
                    className={classnames(styles.showMore, {
                        [styles.active]: isOpen,
                        [styles[theme]]: theme
                    })}
                    onClick={this.toggleProductPanel}
                >
                    Show more flavors
                </div>
                <div
                    className={classnames(styles.productPanel, {
                        [styles.active]: isOpen,
                        [styles[theme]]: theme
                    })}
                >
                    <ProductPanel
                        products={products}
                        activeProduct={activeProduct}
                        setActiveProduct={setActiveProduct}
                        className={classnames(styles.container, styles[theme])}
                        overflowType="carousel"
                        linkAction="push"
                        theme={theme}
                    />
                </div>
                <div className={styles.innerContainer}>
                    <p className={classnames(styles.description, styles[theme])}>
                        {preventOrphan(activeProduct.fields.description)}
                    </p>
                    <div className={styles.actions}>
                        <Button
                            theme="white"
                            href="/product-locator"
                            onClick={() => {
                                if(typeof window !== 'undefined' && window.dataLayer) {
                                    window.dataLayer.push({
                                        event: 'floodlight',
                                        activity: 'findp0'
                                    });
                                }
                            }}
                        >
                            Find Product
                        </Button>
                        <ButtonDropdown
                            items={shopLinks}
                            theme={brand.fields.themeColor}
                            layout="wide"
                            onClick={(evt, name) => {
                                if(typeof window !== 'undefined' && window.dataLayer) {
                                    window.dataLayer.push({
                                        event: 'floodlight',
                                        activity: `${
                                            name.replace(/[^a-z0-9]/i, '')
                                                .slice(0, 5)
                                                .toLowerCase()
                                        }0`
                                    });
                                }
                            }}
                        >
                            Buy Online
                        </ButtonDropdown>
                    </div>
                    {activeProduct.fields.smartLabel.id &&
                        <ProductAccordion
                            nutrition={activeProduct.fields.smartLabel}
                            ingredients={activeProduct.fields.smartLabel.rawIngredients}
                            theme={theme}
                        />
                    }
                </div>
            </div>
        );
    }
}
