import React from 'react';

import Title from 'components/Title';

import styles from './styles.module.css';

export default () => (
    <section className={styles.pageContainer}>
        <Title>Product Locator</Title>
        <iframe
            src="https://destinilocators.com/bluediamondnuts/site/"
            frameBorder="0"
            title="Product Locator"
        />
    </section>
);
