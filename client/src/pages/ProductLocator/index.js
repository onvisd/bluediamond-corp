import React, {Component} from 'react';

import Title from 'components/Title';
import Meta from 'components/Meta';
import ProductLocator from 'components/ProductLocator';

import styles from './styles.module.css';

export default class ProductLocatorPage extends Component {
    render() {
        return (
            <section className={styles.pageContainer}>
                <Title>Product Locator</Title>
                <Meta>{[
                    {
                        property: 'og:title',
                        content: 'Locate Blue Diamond Products'
                    },
                    {
                        property: 'og:description',
                        content:
                            'Find out where Blue Diamond products are sold in stores near you.'
                    },
                    {
                        name: 'description',
                        content:
                            'Find out where Blue Diamond products are sold in stores near you.'
                    }
                ]}</Meta>
                <ProductLocator
                    query={this.props.location.search}
                    width="100%"
                    height="960px"
                />
            </section>
        );
    }
}
