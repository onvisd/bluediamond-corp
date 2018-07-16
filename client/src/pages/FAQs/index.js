import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import Helmet from 'react-helmet';

import {connector, getContact} from 'state/contact';

import Title from 'components/Title';
import Meta from 'components/Meta';
import Button from 'components/Button';
import FAQ from 'components/FAQ';

import styles from './styles.module.css';

import {parseModel} from 'tools/parseApi';

@preload(({dispatch, location}) => dispatch(getContact(location.search)))
@connect(
    (state) => ({...connector(state.contact)}),
    {getContact}
)
export default class FAQs extends Component {
    static propTypes = {
        contact: PropTypes.shape({
            items: PropTypes.arrayOf(PropTypes.shape({
                fields: PropTypes.shape({
                    faq: PropTypes.arrayOf(PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string
                        })
                    }))
                })
            }))
        })
    }

    render() {
        const {contact} = this.props;
        const {faq} = parseModel(contact)[0].fields;

        return (
            <section className="content">
                <Title>Frequently Asked Questions</Title>
                <Meta>{[
                    {
                        property: 'og:title',
                        content: 'Frequenty Asked Questions'
                    },
                    {
                        property: 'og:description',
                        content: 'Frequently asked questions about Blue Diamond products.'
                    },
                    {
                        name: 'description',
                        content: 'Frequently asked questions about Blue Diamond products.'
                    }
                ]}</Meta>
                <Helmet>
                    <link rel="canonical" href={`https://www.bluediamond.com${this.props.location.pathname}`} />
                </Helmet>
                <div className={styles.container}>
                    <div className={styles.intro}>
                        <h1>Frequently Asked Questions</h1>
                        <Button href="/contact">
                            Send us a message
                        </Button>
                    </div>
                    <FAQ data={faq} />
                </div>
            </section>
        );
    }
}
