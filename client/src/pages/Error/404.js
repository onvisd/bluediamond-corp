import React from 'react';
import Helmet from 'react-helmet';

import Title from 'components/Title';
import Button from 'components/Button';

import styles from './styles.module.css';

export default () => (
    <div>
        <Title>Page not found</Title>
        <Helmet>
            <link rel="canonical" href={`https://www.bluediamond.com/404`} />
        </Helmet>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>Uh oh, 404.</h1>
            <p>Something is kinda nutty so we aren't able to find that page. Please make sure the address is typed correctly or use the link below to go back home.</p>
            <Button href="/">Go back home</Button>
          </div>
        </div>
    </div>
);
