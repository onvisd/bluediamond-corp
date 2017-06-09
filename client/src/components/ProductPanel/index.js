import React, {Component, PropTypes} from 'react';
import {Link, pushLocation} from 'react-isomorphic-render';
import {withRouter} from 'react-router';
import {ViewPager, Frame, Track, View} from 'react-view-pager';
import classnames from 'classnames';

import styles from './styles.module.css';

@withRouter
export default class ProductPanel extends Component {
    static propTypes = {
        carousel: PropTypes.bool,
        activeProduct: PropTypes.object,
        products: PropTypes.array.isRequired,
        linkAction: PropTypes.string.isRequired
    };

    static defaultProps = {
        carousel: false,
        linkAction: 'goto'
    };

    state = {
        activeTab: 0
    }

    handleSwipe = (currentIndices) => {
        this.setState(() => ({
            activeTab: currentIndices[0]
        }));
    }

    handleNavigate = (product) => {
        const {router} = this.props;

        const pathname =
            '/brand' +
            `/${product.fields.brand.replace(' ', '-').toLowerCase()}` +
            `/${product.fields.brandCategory.replace(' ', '-').toLowerCase()}` +
            `/${product.fields.slug}`;

        pushLocation({pathname}, router);
    }

    renderLink = (product) => {
        const {linkAction} = this.props;

        if(linkAction === 'push') {
            return (
                <a onClick={() => this.handleNavigate(product)}>
                    <div className={styles.imageWrap}>
                        <img src={product.fields.productPhotos[0].fields.file.url} />
                    </div>
                    {product.fields.name}
                </a>
            );
        }

        return (
            <Link
                to={
                '/brand' +
                `/${product.fields.brand.replace(' ', '-').toLowerCase()}` +
                `/${product.fields.brandCategory.replace(' ', '-').toLowerCase()}` +
                `/${product.fields.slug}`}
            >
                <div className={styles.imageWrap}>
                    <img src={product.fields.productPhotos[0].fields.file.url} />
                </div>
                {product.fields.name}
            </Link>
        );
    }

    render() {
        const {activeTab} = this.state;
        const {carousel, activeProduct, products} = this.props;

        if(carousel) {
            return (
                <div className={styles.containerFull}>
                    <ViewPager className={styles.productCarousel}>
                        <Frame>
                            <Track
                                viewsToShow="auto"
                                align={0}
                                onViewChange={this.handleSwipe}
                                style={{display: 'flex'}}
                                ref={(track) => {
                                    this.carouselTrack = track;
                                }}
                            >
                                {products.map((product, idx) => (
                                    <View style={{flex: '1'}} key={`card-${idx}`}>
                                        <div
                                            className={classnames(styles.product, {
                                                [styles.opaque]: !activeProduct,
                                                [styles.active]: activeProduct &&
                                                    activeProduct.fields.slug ===
                                                    product.fields.slug
                                            })}
                                            key={product.sys.id}
                                        >
                                            {this.renderLink(product)}
                                        </div>
                                    </View>
                                ))}
                            </Track>
                        </Frame>
                        <div className={styles.overlay} />
                    </ViewPager>
                    {products.length > 1 &&
                        <div className={styles.tabs}>
                            {products.map((product, idx) => (
                                <div
                                    key={product._id}
                                    className={classnames(styles.tab, {
                                        [styles.tabActive]: activeTab === idx
                                    })}
                                    onClick={() => {
                                        this.handleActiveTab(idx);
                                    }}
                                />
                            ))}
                        </div>
                    }
                </div>
            );
        }

        return (
            <div className={styles.container}>
                <ul
                    className={classnames(styles.productList, {
                        [styles.full]: products.length > 5
                    })}
                >
                    {products.map((product) => (
                        <li
                            className={classnames(styles.product, {
                                [styles.opaque]: !activeProduct,
                                [styles.active]: activeProduct &&
                                    activeProduct.fields.slug === product.fields.slug
                            })}
                            key={product.sys.id}
                        >
                            {this.renderLink(product)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
