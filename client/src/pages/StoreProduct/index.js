import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload, Link} from 'react-isomorphic-render';
import ReactGA from 'react-ga';

import {connector as navConnector, setNavigationStyle} from 'state/navigation';

import {getStoreProduct} from 'state/storeProduct';
import {connector as storeProductConnector} from 'state/storeProduct';

import {setStoreNavigation} from 'state/storeNavigation';
import {connector as storeNavigationConnector} from 'state/storeNavigation';

import Title from 'components/Title';
import Meta from 'components/Meta';
import StoreProductHead from 'components/API/StoreProductHead';
import StoreProductCard from 'components/API/StoreProductCard';
import StoreProductReview from 'components/StoreProductReview';

import styles from './styles.module.css';

@preload(({dispatch, parameters}) => dispatch(getStoreProduct(parameters.slug)))
@connect(
    (state) => ({
        ...navConnector(state.navigation),
        ...storeProductConnector(state.storeProduct),
        ...storeNavigationConnector(state.storeNavigation)
    }),
    {getStoreProduct, setNavigationStyle, setStoreNavigation}
)
export default class StoreProduct extends Component {
    componentDidMount() {
        const {product} = this.props;

        ReactGA.plugin.execute('ec', 'addProduct', {
            id: product.product.handle,
            name: product.product.title,
            brand: product.product.productType
        });

        ReactGA.plugin.execute('ec', 'setAction', 'detail');
    }

    componentWillMount() {
        this.props.setStoreNavigation(true);
        this.props.setNavigationStyle({className: 'brand--dark'});
    }

    componentWillUpdate(nextProps) {
        if(!nextProps.isStorePage)
            this.props.setStoreNavigation(true);
        if(!nextProps.navigation.style.className)
            this.props.setNavigationStyle({className: 'brand--dark'});
    }

    componentWillUnmount() {
        this.props.setStoreNavigation(false);
        this.props.setNavigationStyle({});
    }

    render() {
        const {product} = this.props;

        let reviews = [];
        let related = [];

        if(product.reviews) reviews = product.reviews.reviews;
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
                        content: product.product.descriptionHtml.replace(/<[^>]*>/g, '')
                    },
                    {
                        property: 'og:image',
                        content: product.product.images.edges[0].node.src
                    }
                ]}</Meta>
                <div className={styles.back}>
                    <Link className={styles.backLink} to="/store">Continue Shopping</Link>
                </div>
                <StoreProductHead data={product} />
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
                {reviews.length > 0 &&
                    <div className={styles.reviews}>
                        <h3>Customer Reviews</h3>
                        <div className={styles.reviewCards}>
                            {reviews.slice(0, 2).map((review, idx) =>
                                <StoreProductReview
                                    key={`productReview${idx}`}
                                    review={review}
                                    totalReviews={product.reviews.bottomline.total_review || 0}
                                />
                            )}
                        </div>
                    </div>
                }

                {/* Tracking pixel */}
                <img
                    src="http://r.turn.com/r/beacon?b2=dOm1o2qL7unskeoSfY7ialWAOyhtfOHhe3zQFUms8RRTNbIEOf2fo1LxMUNzxLfqsjLMl8773--xtutTwGUmYQ&cid="
                />
            </section>
        );
    }
}
