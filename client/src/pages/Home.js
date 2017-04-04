import React from 'react';
import {Title} from 'react-isomorphic-render';

import husky from '../../assets/images/husky.jpg';
import Button from '../components/Button';

export default () => (
    <section className="content">
        <Title>Home</Title>
        <Button link="/recipe" style="small">Test</Button>
        <img src={husky} />
    </section>
);
