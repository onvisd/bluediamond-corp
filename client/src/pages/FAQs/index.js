import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';

import {connector, getContact} from 'state/contact';

import Title from 'components/Title';
import Button from 'components/Button';
import FAQ from 'components/FAQ';

import styles from './styles.module.css';

import {parseModel} from 'tools/parseApi';

@preload(({dispatch}) => dispatch(getContact()))
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