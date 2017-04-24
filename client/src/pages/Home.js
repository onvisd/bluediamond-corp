import React from 'react';
import {Title} from 'react-isomorphic-render';
import Button from '../components/Button';

import husky from '../../assets/images/husky.jpg';

export default () => (
    <section className="content">
        <Title>Home</Title>
        <img src={husky} />
        <br />
        <Button>Explore our brands</Button>
        <Button theme="yellow">Explore our brands</Button>
        <Button theme="green">Explore our brands</Button>
        <Button theme="ghost">Explore our brands</Button>
        <h1 className="t--type-display-one">Display 1</h1>
        <h2 className="t--type-display-two">Display 2</h2>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <p>Body Text</p>
        <a>Link Text</a>
        <p className="t--type-prose">Prose</p>
        <p className="t--type-incidental">Incidental text</p>
    </section>
);
