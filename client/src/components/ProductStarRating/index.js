import React, {Component, PropTypes} from 'react';
import styles from './styles.module.css';

import Full from 'images/icons/star-full.svg';
import Empty from 'images/icons/star-empty.svg';

export default class ProductStarRating extends Component {
    static propTypes = {
        rating: PropTypes.number.isRequired,
        reviewCount: PropTypes.number,
        starOnly: PropTypes.bool,
        onClick: PropTypes.func
    }

    render() {
        const {rating, reviewCount, starOnly, onClick} = this.props;

        return (
            <div className={styles.container} onClick={onClick}>
                <div className={styles.stars} data-rating={rating}>
                    {rating >= 1 ? <span><Full /></span> : <span><Empty /></span>}
                    {rating >= 2 ? <span><Full /></span> : <span><Empty /></span>}
                    {rating >= 3 ? <span><Full /></span> : <span><Empty /></span>}
                    {rating >= 4 ? <span><Full /></span> : <span><Empty /></span>}
                    {rating >= 5 ? <span><Full /></span> : <span><Empty /></span>}
                </div>
                {starOnly ? null : (
                    <div className={styles.reviewCount}>
                        <p className="t--type-incidental">
                            {reviewCount > 0
                                ? `${reviewCount} ${reviewCount === 1 ? 'review' : 'reviews'}`
                                : 'No reviews'
                            }
                        </p>
                    </div>
                )}
            </div>
        );
    }
}
