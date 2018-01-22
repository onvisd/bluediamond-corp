import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {connector, addToCart} from 'state/checkout';
import styles from './styles.module.css';

import GlutenFree from 'images/icons/gluten-free.svg';
import HeartHealthy from 'images/icons/heart-healthy.svg';
import KosherK from 'images/icons/kosher-k.svg';
import KosherU from 'images/icons/kosher-u.svg';
import KosherUDairy from 'images/icons/kosher-u-dairy.svg';
import NonGMO from 'images/icons/non-gmo.svg';
import Vegan from 'images/icons/vegan.svg';

import Button from '../Button';
import Quantity from '../Quantity';
import ProductAccordion from '../ProductAccordion';
import ProductStarRating from '../ProductStarRating';

@connect(
    (state) => ({...connector(state.checkout)}),
    {addToCart}
)
export default class StoreProductHead extends Component {
    state = {
        quantity: 1,
        variant: null,
        price: null,
        disableMessage: false
    };

    static propTypes = {
        handle: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        productType: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired,
        variants: PropTypes.array.isRequired,
        options: PropTypes.array.isRequired,
        images: PropTypes.array.isRequired,
        description: PropTypes.string.isRequired,
        nutrition: PropTypes.object,
        ingredients: PropTypes.string,
        reviews: PropTypes.object
    }

    certMap = {
        'OU Kosher Dairy Cert': {
            label: 'Kosher',
            file: KosherUDairy
        },
        'OU Kosher Cert': {
            label: 'Kosher',
            file: KosherU
        },
        'Circle K (OK Kosher Certification)': {
            label: 'Kosher',
            file: KosherK
        },
        'Gluten Free GFCO': {
            label: 'Gluten Free',
            file: GlutenFree
        },
        'Non GMO Project Verified': {
            label: 'Non GMO',
            file: NonGMO
        },
        'American Heart Association Certified': {
            label: 'Heart Healthy',
            file: HeartHealthy
        },
        Vegan: {
            label: 'Vegan',
            file: Vegan
        }
    }

    renderMarkup(field) {
        return {__html: field};
    }

    // Render product images
    renderImages() {
        const {title, image} = this.props;
        const variantImage = this.state.image;
        let images = image;

        if(variantImage && variantImage[256])
            images = variantImage;

        return (
            <div className={styles.images}>
                <img
                    src={images[512]}
                    srcSet={`
                        ${images[512]},
                        ${images[1024]} 2x,
                        ${images[2048]} 3x
                    `}
                    alt={title}
                />
            </div>
        );
    }

    // Parse & render product meta from
    // tags with the preface `meta:`.
    renderMeta() {
        const {nutrition} = this.props;

        if(!nutrition || !nutrition.otherSection)
            return;

        const certs = nutrition.otherSection.certifications.map((cert, idx) => {
            const name = this.certMap[cert.name];

            if(!name)
                return;

            const Icon = name.file;
            const classNames = [];

            if(cert.name === 'OU Kosher Dairy Cert')
                classNames.push(styles.kosherUDairy);

            return (
                <span key={`metaItem${idx}`} className={classNames}>
                    {Icon && <Icon />} {name.label}
                </span>
            );
        });

        let claims = [];

        if(nutrition.otherSection.claims) {
            claims = nutrition.otherSection.claims.claims.map((claim, idx) => {
                const name = this.certMap[claim.name];

                if(!name)
                    return;

                const Icon = name.file;

                return (
                    <span key={`metaItem${idx}`}>
                        {Icon && <Icon />} {name.label}
                    </span>
                );
            });
        }

        if(!certs.length && !claims.length)
            return;

        return (
            <div className={styles.meta}>
                {certs}
                {claims}
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

    renderButtonOptions() {
        const {variants} = this.props;
        const {variant} = this.state;

        if(variants.length === 1)
            return;

        return (
            <div>
                {
                    variants.map((variantOption) => (
                        <button
                            key={`buttonVariant-${variantOption.node.id}`}
                            value={variantOption.node.id}
                            className={classnames(styles.variantButton,
                                {
                                    [styles.selected]:
                                        variant && variant.id === variantOption.node.id
                                }
                            )}
                            onClick={this.handleSelect}
                        >{variantOption.node.title}</button>
                    ))
                }
            </div>
        );
    }

    componentWillMount() {
        const {variants} = this.props;

        if(variants.length === 1) {
            this.setState(() => ({
                variant: variants[0].node,
                price: variants[0].node.price,
                compareAtPrice: variants[0].node.compareAtPrice,
                image: variants[0].node.image
            }));
        }
    }

    handleSelect = (e) => {
        const {value} = e.target;
        const variant = this.props.variants.find((v) => v.node.id.toString() === value);

        this.setState(() => ({
            variant: variant.node,
            price: variant.node.price,
            compareAtPrice: variant.node.compareAtPrice,
            image: variant.node.image
        }));
    }

    updateQuantity = (quantity) => {
        this.setState(() => ({quantity}));
    }

    addToCart = () => {
        const {variant, price, quantity} = this.state;

        this.props.addToCart({
            checkoutId: this.props.checkout.id,
            lineItems: [{variantId: variant.id, quantity: parseInt(quantity)}]
        });

        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'addToCart',
                ecommerce: {
                    add: {
                        products: [{
                            id: this.props.handle,
                            name: this.props.title,
                            brand: this.props.productType,
                            variant: variant.id,
                            price,
                            quantity
                        }]
                    }
                }
            });

            window.dataLayer.push({
                event: 'interaction',
                action: 'click',
                label: this.props.title
            });
        }
    }

    toggleDisableMessage() {
        if(!this.state.variant) {
            this.setState({
                disableMessage: !this.state.disableMessage
            });
        }
    }

    render() {
        const {title, ingredients, nutrition} = this.props;

        const {quantity, price, compareAtPrice, variant, disableMessage} = this.state;

        let reviews = [];
        if(this.props.reviews)
            reviews = this.props.reviews;

        return (
            <section className={styles.container}>
                {this.renderImages()}
                <div className={styles.productInfo}>
                    <h2 className={styles.title}>{title}</h2>
                    {reviews.length > 0 &&
                        <ProductStarRating
                            rating={reviews.bottomline.average_score}
                            reviewCount={reviews.bottomline.total_review}
                        />
                    }
                    {this.renderMeta()}
                    {this.renderDescription()}
                    {this.renderButtonOptions()}
                    <div className={styles.formPurchase}>
                        <h2 className={classnames(
                            styles.price, {
                                [styles.disabled]: !variant
                            }
                        )}>
                            <span>
                                {compareAtPrice
                                    ? `$${(quantity * compareAtPrice).toFixed(2)}`
                                    : ''
                                }
                            </span>
                            ${(quantity * price).toFixed(2)}
                        </h2>
                        <span className={classnames(
                            styles.quantity, {
                                [styles.disabled]: !variant
                            }
                        )}>
                            <Quantity onChange={this.updateQuantity} />
                        </span>
                        <div
                            style={{width: '100%'}}
                            onMouseEnter={() => this.toggleDisableMessage()}
                            onMouseLeave={() => this.toggleDisableMessage()}
                        >
                            <Button
                                className={classnames(
                                    styles.button, {
                                        [styles.disabled]: !variant
                                    }
                                )}
                                onClick={this.addToCart}
                                disabled={!variant}
                            >
                                + Add to cart
                                {!variant &&
                                    <span className={classnames(
                                        styles.hoverContent, {
                                            [styles.isActive]: disableMessage
                                        }
                                    )}>
                                        Please select a variant before adding to cart.
                                    </span>
                                }
                            </Button>
                        </div>
                    </div>
                    {(nutrition && ingredients) &&
                        <ProductAccordion
                            nutrition={nutrition}
                            ingredients={ingredients}
                        />
                    }
                </div>
            </section>
        );
    }
}
