import React from 'react';
import {Title} from 'react-isomorphic-render';

import husky from '../../assets/images/husky.jpg';

export default () => (
    <section className="content">
        <Title>Home</Title>
        <img src={husky} />
    </section>
);
