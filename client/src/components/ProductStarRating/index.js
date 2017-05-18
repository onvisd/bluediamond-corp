import React, {Component, PropTypes} from 'react';
import styles from './styles.module.css';

import Full from '../../../assets/images/starFull.svg';
import Empty from '../../../assets/images/starEmpty.svg';

export default class ProductStarRating extends Component {
    static propTypes = {
        rating: PropTypes.number.isRequired,
        reviewCount: PropTypes.number
    }

    render() {
        const {rating, reviewCount} = this.props;

        return (
            <div className={styles.container}>
                <div className={styles.stars} data-rating={rating}>
                    {rating >= 1 ? <span><Full /></span> : <span><Empty /></span>}
                    {rating >= 2 ? <span><Full /></span> : <span><Empty /></span>}
                    {rating >= 3 ? <span><Full /></span> : <span><Empty /></span>}
                    {rating >= 4 ? <span><Full /></span> : <span><Empty /></span>}
                    {rating >= 5 ? <span><Full /></span> : <span><Empty /></span>}
                </div>
                {reviewCount && <div className={styles.reviewCount}>
                    <p className="t--type-incidental">
                        {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
                    </p>
                </div>}
            </div>
        );
    }
}
