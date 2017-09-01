import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload, Link} from 'react-isomorphic-render';
import ReactGA from 'react-ga';

import {getStoreProduct} from 'state/storeProduct';
import {connector as storeProductConnector} from 'state/storeProduct';

import Title from 'components/Title';
import Meta from 'components/Meta';
import StoreProductHead from 'components/API/StoreProductHead';
import StoreProductCard from 'components/API/StoreProductCard';
import StoreProductReview from 'components/StoreProductReview';

import styles from './styles.module.css';

@preload(({dispatch, parameters}) => dispatch(getStoreProduct(parameters.slug)))
@connect(
    (state) => ({...storeProductConnector(state.storeProduct)}),
    {getStoreProduct}
)
export default class StoreProduct extends Component {
    componentDidMount() {
        const {product} = this.props;

        ReactGA.plugin.execute('ec', 'addProduct', {
            id: product.handle,
            name: product.title,
            brand: product.productType
        });

        ReactGA.plugin.execute('ec', 'setAction', 'detail');
    }

    render() {
        const {product} = this.props;

        let reviews = [];
        let related = [];

        if(product.reviews) reviews = product.reviews.reviews;
        if(product.related) related = product.related;

        return (
            <section className="content">
                <Title>{`${product.title} | Store`}</Title>
                <Meta>{[
                    {
                        property: 'og:title',
                        content: product.title
                    },
                    {
                        property: 'og:description',
                        content: product.descriptionHtml.replace(/<[^>]*>/g, '')
                    },
                    {
                        property: 'og:image',
                        content: product.images.edges[0].node.src
                    }
                ]}</Meta>
                <div className={styles.back}>
                    <Link className={styles.backLink} href="/store">Continue Shopping</Link>
                </div>
                <StoreProductHead data={product} />
                {related.length > 0 &&
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
                                    totalReviews={product.reviews.bottomline.total_review || 0}
                                />
                            )}
                        </div>
                    </div>
                }
            </section>
        );
    }
}
