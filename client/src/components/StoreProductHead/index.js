import React, {Component, PropTypes} from 'react';

import styles from './styles.module.css';

import GlutenFree from '../../../assets/images/icons/gluten-free.svg';
import HeartHealthy from '../../../assets/images/icons/heart-healthy.svg';
import Kosher from '../../../assets/images/icons/kosher.svg';
import ReducedSugar from '../../../assets/images/icons/reduced-sugar.svg';
import Unsweetened from '../../../assets/images/icons/unsweetened.svg';
import Vegan from '../../../assets/images/icons/vegan.svg';
import Button from '../Button';
import Quantity from '../Quantity';
import ProductAccordion from '../ProductAccordion';
import ProductStarRating from '../ProductStarRating';

export default class StoreProductHead extends Component {
    state = {
        price: 0
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
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
                        return <img key={`productImage${i}`} src={image.src} alt={title} />;
                })}
            </div>
        );
    }

    // Parse & render product meta from
    // tags with the preface `meta:`.
    renderMeta() {
        const {tags} = this.props;
        const metaTags = tags.match(/meta:(\S*)/igm);

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
                                key={`variant${variant.id}`}
                                value={variant.price}
                                data-id={variant.id}
                            >
                                {variant.title}
                            </option>
                        )}
                    </select>
                </div>
            </div>
        );
    }

    handleSelect = (e) => {
        const target = e.target;

        this.setState(() => ({
            price: target.value
        }));
    }

    componentWillMount() {
        const {price} = this.props;

        this.setState(() => ({
            price
        }));
    }

    render() {
        const {
            title,
            ingredients,
            nutrition,
            reviews
        } = this.props;

        const {price} = this.state;

        return (
            <section className={styles.container}>
                <div className={styles.images}>
                    {this.renderImages()}
                </div>
                <div className={styles.productInfo}>
                    <h2 className={styles.title}>{title}</h2>
                    <ProductStarRating
                        rating={reviews.response.bottomline.average_score}
                        reviewCount={reviews.response.bottomline.total_review}
                    />
                    {this.renderMeta()}
                    {this.renderDescription()}
                    <div className={styles.formOptions}>
                        {this.renderOptions()}
                        <Quantity />
                    </div>
                    <div className={styles.formPurchase}>
                        <h2 className={styles.price}>${price}</h2>
                        <Button>+ Add to cart</Button>
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
