import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import Helmet from 'react-helmet';

import {connector, getContact} from 'state/contact';

import Title from 'components/Title';
import Meta from 'components/Meta';
import Button from 'components/Button';
import ContactDetails from 'components/ContactDetails';
import ContactForm from 'components/ContactForm';
import FAQ from 'components/FAQ';
import styles from './styles.module.css';

import {parseModel} from 'tools/parseApi';

@preload(({dispatch, location}) => dispatch(getContact(location.search)))
@connect(
    (state) => ({...connector(state.contact)}),
    {getContact}
)
export default class Contact extends Component {
    static propTypes = {
        contact: PropTypes.shape({
            items: PropTypes.arrayOf(PropTypes.shape({
                fields: PropTypes.shape({
                    title: PropTypes.string.isRequired,
                    metaKeywords: PropTypes.array,
                    metaDescription: PropTypes.string,
                    description: PropTypes.string.isRequired,
                    details: PropTypes.arrayOf(PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    })),
                    faq: PropTypes.arrayOf(PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string
                        })
                    })),
                    form: PropTypes.shape({
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
                }))
            })
        })
    }

    scrollBottom = () => {
        this.contactForm.scrollIntoView({behavior: 'smooth'});
    };

    render() {
        const {contact} = this.props;
        const {
            title,
            description,
            faq,
            form,
            details,
            metaDescription,
            metaKeywords
        } = parseModel(contact)[0].fields;

        return (
            <section className="content">
                <Title>Contact us</Title>
                <Meta>{[
                    {
                        property: 'og:title',
                        content: 'Contact us'
                    },
                    {
                        property: 'og:description',
                        content: metaDescription
                    },
                    {
                        name: 'description',
                        content: metaDescription
                    },
                    {
                        name: 'keywords',
                        content: metaKeywords && metaKeywords.join(',')
                    }
                ]}</Meta>
                <Helmet>
                    <link rel="canonical" href={`https://www.bluediamond.com${this.props.location.pathname}`} />
                </Helmet>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.colLeft}>
                            <div className={styles.intro}>
                                <h1>{title}</h1>
                                <p>{description}</p>
                                <Button onClick={this.scrollBottom}>
                                    Send us a message
                                </Button>
                            </div>
                            <div className={styles.faq}>
                                <h3>Frequently Asked Questions</h3>
                                <FAQ data={faq} limit={3} />
                            </div>
                            <div
                                className={styles.contactForm}
                                ref={(el) => {
                                    this.contactForm = el;
                                }}
                            >
                                <h3>Send Us A Message</h3>
                                <ContactForm {...form} />
                            </div>
                        </div>
                        <div className={styles.colRight}>
                            <ContactDetails data={details} />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
