import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload, Link} from 'react-isomorphic-render';

import {getStoreProduct} from 'state/storeProduct';
import {connector as storeProductConnector} from 'state/storeProduct';

import Title from 'components/Title';
import StoreProductHead from 'components/API/StoreProductHead';
import StoreProductCard from 'components/API/StoreProductCard';
import StoreProductReview from 'components/StoreProductReview';

import styles from './styles.module.css';

@preload(async ({dispatch, parameters}) => {
    const product = await dispatch(getStoreProduct(parameters.slug));

    return product;
})
@connect(
    (state) => ({...storeProductConnector(state.storeProduct)}),
    {getStoreProduct}
)
export default class StoreProduct extends Component {
    render() {
        const {product} = this.props;

        const {reviews} = product.reviews;
        const related = product.related;

        return (
            <section className="content">
                <Title>{`Product: ${product.title}`}</Title>
                <div className={styles.back}>
                    <Link className={styles.backLink} href="/store">Continue Shopping</Link>
                </div>
                <StoreProductHead data={product} />
                {related &&
                    <div className={styles.related}>
                        <h3>Related Products</h3>
                        <div className={styles.relatedCards}>
                            {related.map((card) =>
                                <StoreProductCard
                                    data={card.node}
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
                                />
                            )}
                        </div>
                    </div>
                }
            </section>
        );
    }
}
