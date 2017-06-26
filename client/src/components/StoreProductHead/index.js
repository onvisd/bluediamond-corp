import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {connector, createCheckout, updateCheckout} from 'state/checkout';
import styles from './styles.module.css';

import GlutenFree from 'images/icons/gluten-free.svg';
import HeartHealthy from 'images/icons/heart-healthy.svg';
import Kosher from 'images/icons/kosher.svg';
import ReducedSugar from 'images/icons/reduced-sugar.svg';
import Unsweetened from 'images/icons/unsweetened.svg';
import Vegan from 'images/icons/vegan.svg';
import Button from '../Button';
import Quantity from '../Quantity';
import ProductAccordion from '../ProductAccordion';
import ProductStarRating from '../ProductStarRating';

@connect(
    (state) => ({...connector(state.checkout)}),
    {createCheckout, updateCheckout}
)
export default class StoreProductHead extends Component {
    state = {
        quantity: 1,
        variant: {}
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired,
        variants: PropTypes.array.isRequired,
        options: PropTypes.array.isRequired,
        images: PropTypes.array.isRequired,
        description: PropTypes.string.isRequired,
        nutrition: PropTypes.object.isRequired,
        ingredients: PropTypes.string.isRequired,
        reviews: PropTypes.object.isRequired
    }

    metaIcons = {
        GlutenFree,
        HeartHealthy,
        Kosher,
        ReducedSugar,
        Unsweetened,
        Vegan
    }

    renderMarkup(field) {
        return {__html: field};
    }

    // Render product images
    renderImages() {
        const {title, images} = this.props;

        return (
            <div className={styles.images}>
                {images.map((image, i) => {
                    if(i <= 0) // only show one photo until design approves multi-images
                        return <img key={`productImage${i}`} src={image.node.src} alt={title} />;
                })}
            </div>
        );
    }

    // Parse & render product meta from
    // tags with the preface `meta:`.
    renderMeta() {
        const {tags} = this.props;
        const metaTags = JSON.stringify(tags).match(/meta:(\S*)/igm);

        // TODO : fix render method, breaking 6/24/2017
        if(!metaTags || metaTags)
            return;

        return (
            <div className={styles.meta}>
                {metaTags.map((tag, i) => {
                    const value = tag.split(':')[1].replace(',', '');
                    const Icon = this.metaIcons[value.replace(' ', '')];
                    return <span key={`metaItem${i}`}><Icon />{value}</span>;
                })}
            </div>
        );
    }

    // Render products main description
    renderDescription() {
        const {description} = this.props;
        const content = this.renderMarkup(description);

        return (
            <div className={styles.description} dangerouslySetInnerHTML={content}></div>
        );
    }

    // Render purchase form.
    renderOptions() {
        const {variants} = this.props;

        return (
            <div className={styles.options}>
                <div className="form--select">
                    <select onChange={this.handleSelect} name="productSizeOption">
                        {variants.map((variant) =>
                            <option
                                key={`variant${variant.node.id}`}
                                value={variant.node.id}
                            >
                                {variant.node.title}
                            </option>
                        )}
                    </select>
                </div>
            </div>
        );
    }

    handleSelect = (e) => {
        const {value} = e.target;
        const variant = this.props.variants.find((v) => v.id.toString() === value);

        this.setState(() => ({variant}));
    }

    updateQuantity = (quantity) => {
        this.setState(() => ({quantity}));
    }

    componentWillMount() {
        this.setState(() => ({variant: this.props.variants[0].node}));
    }

    addToCart = () => {
        const {variant, quantity} = this.state;

        if(this.props.checkout.token) {
            const lineItems = this.props.checkout.lineItems.concat({
                variant_id: variant.id, // eslint-disable-line camelcase
                quantity
            });

            this.props.updateCheckout({
                token: this.props.checkout.token,
                lineItems
            });
        } else {
            this.props.createCheckout({lineItems: [
                {variant_id: variant.id, quantity} // eslint-disable-line camelcase
            ]});
        }
    }

    render() {
        const {
            title,
            ingredients,
            nutrition,
            reviews
        } = this.props;

        const {variant, quantity} = this.state;

        return (
            <section className={styles.container}>
                <div className={styles.images}>
                    {this.renderImages()}
                </div>
                <div className={styles.productInfo}>
                    <h2 className={styles.title}>{title}</h2>
                    <ProductStarRating
                        rating={reviews.bottomline.average_score}
                        reviewCount={reviews.bottomline.total_review}
                    />
                    {this.renderMeta()}
                    {this.renderDescription()}
                    <div className={styles.formOptions}>
                        {this.renderOptions()}
                        <Quantity onChange={this.updateQuantity} />
                    </div>
                    <div className={styles.formPurchase}>
                        <h2 className={styles.price}>${(quantity * variant.price).toFixed(2).toLocaleString('en-US')}</h2>
                        <Button onClick={this.addToCart}>
                            + Add to cart
                        </Button>
                    </div>
                    <ProductAccordion
                        nutrition={nutrition}
                        ingredients={ingredients}
                    />
                </div>
            </section>
        );
    }
}
