import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector, getStoreProduct} from 'state/storeProduct';

import StoreProductHead from 'components/API/StoreProductHead';
import StoreProductCard from 'components/API/StoreProductCard';
import StoreProductReview from 'components/StoreProductReview';

import styles from './styles.module.css';

@preload(({dispatch, parameters}) => dispatch(getStoreProduct(parameters.slug)))
@connect(
    (state) => ({...connector(state.storeProduct)}),
    {getStoreProduct}
)
export default class StoreProduct extends Component {
    render() {
        const {storeProduct} = this.props;
        const title = storeProduct.products[0].title;

        const allReviews = storeProduct.products[0].reviews.response.reviews;
        const allRelated = storeProduct.products[0].related.products;

        const reviews = allReviews.slice(0, 2);
        const related = allRelated.slice(0, 6);

        return (
            <section className="content">
                <Title>{`Product: ${title}`}</Title>
                <StoreProductHead data={storeProduct} />
                {related.length &&
                    <div className={styles.related}>
                        <h3>Related Products</h3>
                        <div className={styles.relatedCards}>
                            {related.map((product) =>
                                <StoreProductCard
                                    data={{products: product}}
                                    key={`card${product.id}`}
                                />
                            )}
                        </div>
                    </div>
                }
                {reviews.length &&
                    <div className={styles.reviews}>
                        <h3>Customer Reviews</h3>
                        <div className={styles.reviewCards}>
                            {reviews.map((review, idx) =>
                                <StoreProductReview
                                    key={`productReview${idx}`}
                                    review={review}
                                />
                            )}
                        </div>
                    </div>
                }
            </section>
        );
    }
}
