import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector, getContact} from '../../redux/contact';
import Button from '../../components/Button';
import ContactDetails from '../../components/ContactDetails';
import ContactForm from '../../components/ContactForm';
import FAQ from '../../components/FAQ';
import styles from './styles.module.css';

import {parseModel} from '../../tools/parseApi';

@preload(({dispatch}) => dispatch(getContact()))
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
        const {title, description, faq, form, details} = parseModel(contact)[0].fields;

        return (
            <section className="content">
                <Title>Contact us</Title>

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
                            <h3>Frequently Asked Questions</h3>
                            <FAQ data={faq} />
                            <div
                                ref={(el) => {
                                    this.contactForm = el;
                                }}
                            >
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
