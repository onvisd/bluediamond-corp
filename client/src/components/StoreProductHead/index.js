import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactGA from 'react-ga';
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

import callFloodlight from 'tools/callFloodlight';

@connect(
    (state) => ({...connector(state.checkout)}),
    {addToCart}
)
export default class StoreProductHead extends Component {
    state = {
        quantity: 1,
        variant: {},
        price: null
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

        return (
            <div className={styles.images}>
                <img
                    src={image[256]}
                    srcSet={`
                        ${image[256]},
                        ${image[512]} 1.5x,
                        ${image[1024]} 2x,
                        ${image[2048]} 3x
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

    // Render purchase form.
    renderOptions() {
        const {variants} = this.props;

        return (
            <div className={classnames(styles.options, variants.length === 1 && styles.single)}>
                {variants.length > 1
                    ? (
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
                    )
                    : (
                        <div>{
                            variants[0].node.title === 'Default Title'
                                ? ''
                                : variants[0].node.title
                        }</div>
                    )
                }
            </div>
        );
    }

    handleSelect = (e) => {
        const {value} = e.target;
        const variant = this.props.variants.find((v) => v.node.id.toString() === value);

        this.setState(() => ({
            variant: variant.node,
            price: variant.node.price
        }));
    }

    updateQuantity = (quantity) => {
        this.setState(() => ({quantity}));
    }

    componentWillMount() {
        this.setState(() => ({
            variant: this.props.variants[0].node,
            price: this.props.variants[0].node.price
        }));
    }

    addToCart = () => {
        const {variant, price, quantity} = this.state;

        this.props.addToCart({
            checkoutId: this.props.checkout.id,
            lineItems: [{variantId: variant.id, quantity: parseInt(quantity)}]
        });

        ReactGA.plugin.execute('ec', 'addProduct', {
            id: this.props.handle,
            name: this.props.title,
            brand: this.props.productType,
            variant: variant.id,
            price,
            quantity
        });

        ReactGA.plugin.execute('ec', 'setAction', 'add');

        ReactGA.event({
            category: 'interaction',
            action: 'click',
            label: this.props.title
        });

        callFloodlight.click('4035228', 'fy18s0', 'addto0');
    }

    render() {
        const {title, ingredients, nutrition, productType} = this.props;

        const {quantity, price} = this.state;

        let reviews = [];
        if(this.props.reviews) reviews = this.props.reviews;

        return (
            <section className={styles.container}>
                {this.renderImages()}
                <div className={styles.productInfo}>
                    {productType && (<h3>{productType}</h3>)}
                    <h2 className={styles.title}>{title}</h2>
                    {reviews.length > 0 &&
                        <ProductStarRating
                            rating={reviews.bottomline.average_score}
                            reviewCount={reviews.bottomline.total_review}
                        />
                    }
                    {this.renderMeta()}
                    {this.renderDescription()}
                    <div className={styles.formOptions}>
                        {this.renderOptions()}
                        <Quantity onChange={this.updateQuantity} />
                    </div>
                    <div className={styles.formPurchase}>
                        <h2 className={styles.price}>${(quantity * price).toFixed(2)}</h2>
                        <Button className={styles.button} onClick={this.addToCart}>
                            + Add to cart
                        </Button>
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
