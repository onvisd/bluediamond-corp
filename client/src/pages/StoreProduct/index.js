import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload, Link} from 'react-isomorphic-render';
import Helmet from 'react-helmet';
import classnames from 'classnames';

import {connector as navConnector, setNavigationStyle} from 'state/navigation';

import {getStoreProduct} from 'state/storeProduct';
import {connector as storeProductConnector} from 'state/storeProduct';

import {getStoreReviews} from 'state/storeReviews';
import {connector as storeReviewsConnector} from 'state/storeReviews';

import {setStoreNavigation} from 'state/storeNavigation';
import {connector as storeNavigationConnector} from 'state/storeNavigation';

import {buildQueryString, connector as storeSearchConnector} from 'state/storeSearch';

import Title from 'components/Title';
import Meta from 'components/Meta';
import StoreProductHead from 'components/API/StoreProductHead';
import StoreProductCard from 'components/API/StoreProductCard';
import ProductReviews from 'components/ProductReviews';

import styles from './styles.module.css';

@preload(async ({dispatch, parameters}) => {
    await Promise.all([
        dispatch(getStoreProduct(parameters.slug)).then((product) =>
            dispatch(getStoreReviews({
                slug: parameters.slug,
                id: product.storefrontId
            }))
        ),
        dispatch(setStoreNavigation(true)),
        dispatch(setNavigationStyle({className: 'brand--dark'}))
    ]);
})
@connect(
    (state) => ({
        recalls: state.recalls,
        ...navConnector(state.navigation),
        ...storeSearchConnector(state.storeSearch),
        ...storeProductConnector(state.storeProduct),
        ...storeReviewsConnector(state.storeReviews),
        ...storeNavigationConnector(state.storeNavigation)
    }),
    {getStoreProduct, getStoreReviews, setNavigationStyle, setStoreNavigation}
)
export default class StoreProduct extends Component {
    state = {
        reviews: this.props.productReviews,
        reviewsPage: 1
    };

    componentDidMount() {
        const {product} = this.props;

        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                ecommerce: {
                    detail: {
                        products: [{
                            id: product.product.handle,
                            name: product.product.title,
                            brand: product.product.productType
                        }]
                    }
                }
            });
        }
    }

    componentWillUpdate(nextProps) {
        if(!nextProps.isStorePage)
            this.props.setStoreNavigation(true);
        if(!nextProps.navigation && !nextProps.navigation.style.className)
            this.props.setNavigationStyle({className: 'brand--dark'});
    }

    componentWillUnmount() {
        this.props.setStoreNavigation(false);
        this.props.setNavigationStyle({});
    }

    setReviewsPage = (evt, page) => {
        evt.preventDefault();

        this.props.getStoreReviews({
            slug: this.props.product.product.handle,
            id: this.props.product.storefrontId,
            page
        })
        .then((res) => this.setState({
            reviews: res,
            reviewsPage: page
        }))
        .catch((err) => console.trace(err));
    };

    scrollToReviews = () => {
        this.reviewContainer.scrollIntoView({behavior: 'smooth'});
    }

    render() {
        const {product, productReviews, recalls} = this.props;

        let related = [];
        if(product.related) related = product.related;

        return (
            <section className="content">
                <Title>{`${product.product.title} | Store`}</Title>
                <Meta>{[
                    {
                        property: 'og:title',
                        content: product.product.title
                    },
                    {
                        property: 'og:description',
                        content: product.product.metaDescription ||
                          product.product.descriptionHtml.replace(/<[^>]*>/g, '')
                    },
                    {
                        property: 'og:image',
                        content: product.product.images.edges[0].node.src
                    },
                    {
                        name: 'description',
                        content: product.product.metaDescription ||
                          product.product.descriptionHtml.replace(/<[^>]*>/g, '')
                    },
                    {
                        name: 'keywords',
                        content: product.product.metaKeywords &&
                          product.product.metaKeywords.join(',')
                    }
                ]}</Meta>
                <Helmet>
                    <link rel="canonical" href={`https://www.bluediamond.com${this.props.location.pathname}`} />
                </Helmet>
                <div className={classnames(styles.back, recalls.recalls.length > 0 && styles.noMargin)}>
                    <Link
                        className={styles.backLink}
                        to={`/store${buildQueryString(this.props.query)}`}
                    >
                        Continue Shopping
                    </Link>
                </div>
                <StoreProductHead
                    data={product}
                    reviews={productReviews}
                    scrollToReviews={this.scrollToReviews}
                />
                <div id="reviews" ref={(reviewContainer) => {
                    this.reviewContainer = reviewContainer;
                }}
                >
                    <ProductReviews
                        product={product}
                        reviews={productReviews}
                        setPage={(evt, page) => this.setReviewsPage(evt, page)}
                        activePage={this.state.reviewsPage}
                    />
                </div>
                {related.length > 0 &&
                    <div className={styles.related}>
                        <h3>Related Products</h3>
                        <div className={styles.relatedCards}>
                            {related.map((card) =>
                                <StoreProductCard
                                    data={card.node}
                                    images={product.images[card.node.images.edges[0].node.id]}
                                    key={`card${card.node.id}`}
                                />
                            )}
                        </div>
                    </div>
                }
                {/* Tracking pixel */}
                <img
                    src="https://r.turn.com/r/beacon?b2=dOm1o2qL7unskeoSfY7ialWAOyhtfOHhe3zQFUms8RRTNbIEOf2fo1LxMUNzxLfqsjLMl8773--xtutTwGUmYQ&cid="
                    alt=""
                />
            </section>
        );
    }
}
