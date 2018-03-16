import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import ProductStarRating from '../ProductStarRating';

import styles from './styles.module.css';

export default class StoreProductReview extends Component {
    static propTypes = {
        review: PropTypes.object.isRequired,
        totalReviews: PropTypes.number.isRequired
    }

    render() {
        const {review, totalReviews} = this.props;

        return (
            <div className={styles.container}>
                <h4 className={styles.title}>{review.title}</h4>
                <div className={styles.meta}>
                    <div className={styles.date}>
                        {moment(review.created_at).format('DD MMMM YYYY')}
                    </div>
                    <ProductStarRating
                        rating={review.score}
                        reviewCount={totalReviews}
                        starOnly={true}
                    />
                </div>
                <p className="t--size-s" dangerouslySetInnerHTML={{__html: review.content}}></p>
                <p className={styles.user}>By {review.user.display_name}</p>
            </div>
        );
    }
}
