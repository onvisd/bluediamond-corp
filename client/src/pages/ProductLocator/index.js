import React from 'react';

import Title from 'components/Title';
import Meta from 'components/Meta';

import styles from './styles.module.css';

export default () => (
    <section className={styles.pageContainer}>
        <Title>Product Locator</Title>
        <Meta>{[
            {
                property: 'og:title',
                content: 'Locate Blue Diamond Products'
            },
            {
                property: 'og:description',
                content: (
                    'Find out where Blue Diamond products are sold in stores near you.'
                )
            }
        ]}</Meta>
        <iframe
            src="https://destinilocators.com/bluediamondnuts/site/?MM=panel2"
            frameBorder="0"
            title="Product Locator"
        />
    </section>
);
