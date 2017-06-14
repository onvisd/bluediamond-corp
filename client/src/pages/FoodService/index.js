import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';
import marked from 'marked';

import {connector, getFoodService} from 'state/foodService';
import {parseModel} from 'tools/parseApi';

import Button from 'components/Button';
import RequestSampleForm from 'components/RequestSampleForm';
import ContactForm from 'components/ContactForm';

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
                    productFeature1Link: PropTypes.string.isRequired,
                    productFeature2Image: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    productFeature2Label: PropTypes.string.isRequired,
                    productFeature2Link: PropTypes.string.isRequired,
                    productFeature3Image: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    productFeature3Label: PropTypes.string.isRequired,
                    productFeature3Link: PropTypes.string.isRequired,
                    productFeature4Image: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }),
                    productFeature4Label: PropTypes.string.isRequired,
                    productFeature4Link: PropTypes.string.isRequired,
                    requestFormContent: PropTypes.string.isRequired,
                    contacForm: PropTypes.shape({
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

    scrollBottom = () => {
        this.form.scrollIntoView({behavior: 'smooth'});
    };

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

        return (
            <section className={styles.pageContainer}>
                <Title>{fields.title}</Title>
                <div className={styles.hero} style={{
                    backgroundImage: `url(${fields.heroBackgroundImage.file.url})`
                }}>
                    <div>
                        <h2>{fields.heroHeadline}</h2>
                        <Button onClick={() => {
                            this.handleClick('request');
                            this.scrollBottom();
                        }}>
                            Request a sample
                        </Button>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.content} dangerouslySetInnerHTML={this.renderMarkup(
                        fields.pageContent)}>
                    </div>
                    <div className={styles.productFeatures}>
                        <div className={styles.productFeature}>
                            <a href={fields.productFeature1Link}>
                                {this.renderImage(fields.productFeature1Image.file.url)}
                                {fields.productFeature1Label}
                            </a>
                        </div>
                        <div className={styles.productFeature}>
                            <a href={fields.productFeature2Link}>
                                {this.renderImage(fields.productFeature2Image.file.url)}
                                {fields.productFeature2Label}
                            </a>
                        </div>
                        <div className={styles.productFeature}>
                            <a href={fields.productFeature3Link}>
                                {this.renderImage(fields.productFeature3Image.file.url)}
                                {fields.productFeature3Label}
                            </a>
                        </div>
                        <div className={styles.productFeature}>
                            <a href={fields.productFeature4Link}>
                                {this.renderImage(fields.productFeature4Image.file.url)}
                                {fields.productFeature4Label}
                            </a>
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
                            <div dangerouslySetInnerHTML={
                                this.renderMarkup(fields.requestFormContent)
                            } />
                            <p className="t--type-incidental">Available Products</p>
                            <RequestSampleForm
                                header="Sample Request"
                                emailTo="email@email.com"
                                allowSubject={false}
                                allowMessage={false}
                                snackAlmondOptions={[
                                    'Flavor 1'
                                ]}
                                almondBreezeOptions={[
                                    'Flavor 1'
                                ]}
                                nutThinsOptions={[
                                    'Flavor 1'
                                ]}
                                culinaryNutOptions={[
                                    'Flavor 1'
                                ]}
                            />
                        </div>
                    }
                    {contactOpen &&
                        <div className={styles.formContent}>
                            <h2>Contact us</h2>
                            <ContactForm {...fields.contactForm}/>
                        </div>
                    }
                </div>
            </section>
        );
    }
}
