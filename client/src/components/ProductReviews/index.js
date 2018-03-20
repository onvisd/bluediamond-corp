import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import axios from 'axios';
import {Form} from 'formsy-react';

import Button from '../Button';
import Input from '../FormInput';
import Textarea from '../FormTextarea';
import Rating from 'react-rating';
import Full from 'images/icons/star-full.svg';
import Empty from 'images/icons/star-empty.svg';
import StoreProductReview from 'components/StoreProductReview';

import styles from './styles.module.css';

@connect((state) => ({
    responsive: state.responsive
}))
export default class ProductReviews extends Component {
    state = {
        rating: 5,
        canSubmit: false,
        formOpen: false
    };

    static propTypes = {
        product: PropTypes.object.isRequired,
        reviews: PropTypes.object.isRequired,
        setPage: PropTypes.func.isRequired,
        activePage: PropTypes.number.isRequired
    }

    handleRatingChange = (rate) => {
        this.setState({
            rating: rate
        });
    }

    enableSubmit = () => {
        this.setState({
            canSubmit: true
        });
    }

    disableSubmit = () => {
        this.setState({
            canSubmit: false
        });
    }

    submit = (model) => {
        const {product} = this.props;
        return axios.post(`/api/store/product/${product.product.handle}/review`, {
            sku: product.storefrontId || product.product.id,
            product_title: product.product.title, // eslint-disable-line
            product_url: `https://bluediamond.com/store/product/${product.product.handle}`, // eslint-disable-line
            display_name: model.name, // eslint-disable-line
            email: model.email,
            review_content: model.content, // eslint-disable-line
            review_title: model.reviewTitle, // eslint-disable-line
            review_score: this.state.rating // eslint-disable-line
        })
        .then(() => {
            this.form.reset();
            this.setState({
                error: false,
                sent: true,
                sending: false
            }, () => {
                this.sent.scrollIntoView({behavior: 'smooth'});
            });
        })
        .catch(() => {
            this.setState({
                sent: false,
                error: true,
                sending: false
            }, () => {
                this.error.scrollIntoView({behavior: 'smooth'});
            });
        });
    }

    renderPagination = () => {
        const {reviews, activePage} = this.props;

        const totalReviews = reviews.pagination.total;
        const perPage = reviews.pagination.per_page;

        const pageCount = Math.ceil(totalReviews / perPage);

        const pages = [];
        Array(pageCount).fill().map((e, i) => {
            const count = i + 1;
            pages.push(
                <li
                    key={`reviewsPage${count}`}
                    className={classnames(
                        styles.page,
                        {
                            [styles.active]: activePage === count
                        }
                    )}
                >
                    <a href="#" onClick={(evt) => this.props.setPage(evt, count)}>
                        {count}
                    </a>
                </li>
            );
        });

        return (
            <div className={styles.paginate}>
                <ul className={styles.pages}>
                    {pages}
                </ul>
            </div>
        );
    };

    handleToggleForm = (evt) => {
        const {responsive} = this.props;

        // don't do anything if not on mobile devices
        if(responsive.small === undefined && !responsive.small) // eslint-disable-line
            return;

        evt.preventDefault();

        this.setState({
            formOpen: !this.state.formOpen
        });
    }

    render() {
        const {product, reviews, responsive} = this.props;
        const reviewList = reviews.reviews;

        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <h3>Customer Reviews</h3>
                </div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        {reviewList.length > 0 && reviewList.map((review, idx) =>
                            <StoreProductReview
                                key={`productReview${idx}`}
                                review={review}
                                totalReviews={reviews.bottomline.total_review || 0}
                                starOnly={true}
                            />
                        )}
                        {reviewList.length === 0 &&
                            <div>
                                <h4>No reviews!</h4>
                                <p>Be the first to leave a review for {product.product.title}.</p>
                            </div>
                        }
                    </div>
                    <div className={styles.right}>
                        <Form
                            onValidSubmit={this.submit}
                            onValid={this.enableSubmit}
                            onInvalid={this.disableSubmit}
                            ref={(form) => {
                                this.form = form;
                            }}
                            className={styles.form}
                        >
                            <h4
                                className={classnames(
                                    styles.reviewsTitle,
                                    {
                                        [styles.active]:
                                            (responsive.small !== undefined && responsive.small) && // eslint-disable-line
                                            this.state.formOpen
                                    }
                                )}
                                onClick={this.handleToggleForm}
                            >
                                Write a Review
                            </h4>
                            <div className={classnames(
                                styles.reviewsForm,
                                {
                                    [styles.active]:
                                        (responsive.small !== undefined && responsive.small) && // eslint-disable-line
                                        this.state.formOpen
                                }
                            )}>
                                {this.state.sent
                                    ? (
                                        <p className={styles.sent} ref={(sent) => {
                                            this.sent = sent;
                                        }}>
                                            Your review has been received!
                                        </p>
                                    )
                                    : null
                                }
                                {this.state.error
                                    ? (
                                        <p className={styles.error} ref={(error) => {
                                            this.error = error;
                                        }}>
                                            There was a problem sending your
                                            review. Please try again.
                                        </p>
                                    )
                                    : null
                                }
                                <Input
                                    name="name"
                                    placeholder="Name"
                                    validations="minLength:1"
                                    classNames={{container: styles.input, label: styles.label}}
                                    autocomplete="name"
                                    required
                                />
                                <Input
                                    name="email"
                                    placeholder="me@myemail.com"
                                    validations="isEmail"
                                    validationError="This is not a valid email"
                                    classNames={{container: styles.input, label: styles.label}}
                                    autocomplete="email"
                                    required
                                />
                                <Input
                                    name="reviewTitle"
                                    placeholder="Review Headline"
                                    validations="minLength:1"
                                    classNames={{container: styles.input, label: styles.label}}
                                    required
                                />
                                <Textarea
                                    name="content"
                                    placeholder="Write your review here!"
                                    classNames={{container: styles.input, label: styles.label}}
                                    required
                                />
                                <div className={styles.starRating}>
                                    <div className={styles.starRatingLabel}>
                                        Select a star rating
                                    </div>
                                    <div className={styles.starRatingInput}>
                                        <Rating
                                            onChange={this.handleRatingChange}
                                            initialRating={this.state.rating}
                                            start={0}
                                            stop={5}
                                            emptySymbol={<Empty />}
                                            fullSymbol={<Full />}
                                        />
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={!this.state.canSubmit}
                                    theme="blueLight"
                                >
                                    {this.state.sending ? 'Submitting...' : 'Submit'}
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
                {reviews.pagination.total > reviews.pagination.per_page &&
                    this.renderPagination()
                }
            </div>
        );
    }
}
