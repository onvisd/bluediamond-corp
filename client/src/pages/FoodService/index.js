import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import marked from 'marked';

import {connector, getFoodService} from 'state/foodService';
import {parseModel} from 'tools/parseApi';

import Title from 'components/Title';
import Button from 'components/Button';
import RequestSampleForm from 'components/RequestSampleForm';
import FoodserviceContact from 'components/FoodserviceContactForm';
import ProductLink from 'components/ProductLink';

import styles from './styles.module.css';

@preload(({dispatch}) => dispatch(getFoodService()))
@connect(
    (state) => ({...connector(state.foodService)}),
    {getFoodService}
)
export default class FoodService extends Component {
    static propTypes = {
        foodService: PropTypes.shape({
            items: PropTypes.arrayOf(PropTypes.shape({
                fields: PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    heroHeadline: PropTypes.string.isRequired,
                    heroBackgroundImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    pageContent: PropTypes.string.isRequired,
                    productFeature1Image: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    productFeature1Label: PropTypes.string.isRequired,
                    productFeature2Image: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    productFeature2Label: PropTypes.string.isRequired,
                    productFeature3Image: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    productFeature3Label: PropTypes.string.isRequired,
                    productFeature4Image: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    productFeature4Label: PropTypes.string.isRequired,
                    contactForm: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    featuredProduct: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    })
                })
            })),
            includes: PropTypes.shape({
                Entry: PropTypes.arrayOf(PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                })),
                Asset: PropTypes.arrayOf(PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    })
                }))
            })
        })
    }

    state = {
        requestOpen: false,
        contactOpen: false
    };

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    renderImage(image) {
        return <img src={`${image}?fit=fill&f=face&w=265&h=200`} />;
    }

    handleClick = (space) => {
        this.setState((state) => ({
            requestOpen: space === 'request' ? !state.requestOpen : false,
            contactOpen: space === 'contact' ? !state.contactOpen : false
        }));
    }

    render() {
        const {requestOpen, contactOpen} = this.state;
        const {foodService} = this.props;
        const fields = parseModel(foodService)[0].fields;

        /* Special case handling to render just the one product associated with this page */
        const featuredProduct = {
            fields: {
                ...fields.featuredProduct,
                productPhotos: [
                    {
                        fields: fields.featuredProduct.productPhotos[0]
                    }
                ]
            }
        };

        return (
            <section className={styles.pageContainer}>
                <Title>{fields.title}</Title>
                <div className={styles.hero} style={{
                    backgroundImage: `url(${fields.heroBackgroundImage.file.url})`
                }} />
                <div className={styles.container}>
                    <h2>{fields.heroHeadline}</h2>
                    <div className={styles.main}>
                        <div
                            className={styles.content}
                            dangerouslySetInnerHTML={this.renderMarkup(fields.pageContent)}
                        />
                        <div className={styles.featuredProduct}>
                            <h4>Foodservice Products</h4>
                            <ProductLink
                                className={styles.product}
                                product={featuredProduct}
                                showBrand
                            />
                        </div>
                    </div>
                    <div className={styles.productFeatures}>
                        <div className={styles.productFeature}>
                            {this.renderImage(fields.productFeature1Image.file.url)}
                            {fields.productFeature1Label}
                        </div>
                        <div className={styles.productFeature}>
                            {this.renderImage(fields.productFeature2Image.file.url)}
                            {fields.productFeature2Label}
                        </div>
                        <div className={styles.productFeature}>
                            {this.renderImage(fields.productFeature3Image.file.url)}
                            {fields.productFeature3Label}
                        </div>
                        <div className={styles.productFeature}>
                            {this.renderImage(fields.productFeature4Image.file.url)}
                            {fields.productFeature4Label}
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <Button theme="blueOutline" onClick={() =>
                            this.handleClick('request')}>Request a sample</Button>
                        <Button onClick={() =>
                            this.handleClick('contact')}>Contact us</Button>
                    </div>
                </div>
                <div
                    ref={(el) => {
                        this.form = el;
                    }}
                    className={styles.form}
                >
                    {requestOpen &&
                        <div className={styles.formContent}>
                            <h2>Request a sample</h2>
                            <RequestSampleForm {...fields.contactForm} />
                        </div>
                    }
                    {contactOpen &&
                        <div className={styles.formContent}>
                            <h2>Contact us</h2>
                            <FoodserviceContact {...fields.contactForm} />
                        </div>
                    }
                </div>
            </section>
        );
    }
}
