import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

import Carousel from '../Carousel';
import ProductLink from '../ProductLink';
import styles from './styles.module.css';

@connect((state) => ({
    responsive: state.responsive
}))
export default class ProductPanel extends Component {
    static propTypes = {
        products: PropTypes.array.isRequired,
        activeProduct: PropTypes.object,
        linkAction: PropTypes.string,
        setActiveProduct: PropTypes.func,
        overflowType: PropTypes.string,
        showActiveClasses: PropTypes.bool
    }

    static defaultProps = {
        overflowType: 'expand',
        linkAction: 'goto',
        showActiveClasses: true
    }

    render() {
        const {
            products,
            activeProduct,
            setActiveProduct,
            linkAction,
            overflowType,
            responsive,
            showActiveClasses
        } = this.props;

        const overflow = products.length > 5;

        let productLinks = products.map((product) => (
            <ProductLink
                key={product.fields.slug}
                product={product}
                action={linkAction}
                type="panel"
                active={activeProduct && activeProduct.fields.slug === product.fields.slug}
            />
        ));

        if(linkAction === 'push') {
            productLinks = products.map((product) => (
                <ProductLink
                    key={product.fields.slug}
                    product={product}
                    active={activeProduct && activeProduct.fields.slug === product.fields.slug}
                    action={linkAction}
                    type={overflowType === 'carousel' && overflow ? 'carousel' : 'panel'}
                    activeClassName={styles.active}
                    inactiveClassName={styles.inactive}
                    onClick={() => {
                        setActiveProduct(product);
                    }}
                />
            ));
        }

        let children = (
            <div className={classnames(styles.products, {[styles.wrap]: overflow})}>
                {productLinks}
            </div>
        );

        if(overflowType === 'carousel' && overflow) {
            const activeIndex = products.map((product) => product.fields.slug)
                .indexOf(activeProduct.fields.slug);

            children = (
                <Carousel
                    cards={productLinks}
                    settings={{
                        viewsToShow: 6,
                        viewsToMove: 6,
                        align: 0,
                        infinite: false,
                        swipe: false,
                        currentView: activeIndex - (activeIndex % 6)
                    }}
                    activeIndex={activeIndex - (activeIndex % 6)}
                    classNames={{container: styles.productCarousel}}
                    showOverlay
                    showArrows
                    showTabs
                    onViewChange={(idx) => {
                        setActiveProduct(products[idx]);
                    }}
                />
            );
        }

        const desktopPanel = (
            <div
                className={classnames(styles.container, {
                    [styles.wrap]: overflow,
                    [styles.carousel]: overflow && overflowType === 'carousel'
                })}
            >
                {children}
            </div>
        );

        let activeClasses = {};
        if(showActiveClasses) {
            activeClasses = {
                activeClassName: styles.active,
                inactiveClassName: styles.inactive
            };
        }

        const mobilePanel = (
            <div className={styles.productList}>
                {products.map((product) => (
                    <ProductLink
                        key={product.fields.slug}
                        product={product}
                        active={
                            activeProduct &&
                            activeProduct.fields.slug === product.fields.slug
                        }
                        action={linkAction}
                        type="panel"
                        {...activeClasses}
                        onClick={() => {
                            setActiveProduct(product);
                        }}
                    />
                ))}
            </div>
        );

        let panel = (
            <div>
                {desktopPanel}
                {mobilePanel}
            </div>
        );

        if(responsive.small !== undefined && responsive.small) // eslint-disable-line
            panel = mobilePanel;
        else if(responsive.small !== undefined && !responsive.small) // eslint-disable-line
            panel = desktopPanel;

        return panel;
    }
}
