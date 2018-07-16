import React from 'react';
import Helmet from 'react-helmet';

import Title from 'components/Title';
import Button from 'components/Button';

import styles from './styles.module.css';

export default () => (
    <div>
        <Title>Error</Title>
        <Helmet>
            <link rel="canonical" href={`https://www.bluediamond.com${this.props.location.pathname}`} />
        </Helmet>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>Houston, we got a 500.</h1>
            <p>It seems we've encountered a technical problem. Please try reloading the page or trying again later. We apologize for the inconvenience.</p>
            <Button href="/">Go back home</Button>
          </div>
        </div>
    </div>
);
