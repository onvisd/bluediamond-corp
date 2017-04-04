import React, {Component, PropTypes} from 'react';
import {Title, Meta} from 'react-isomorphic-render';

import Preloading from '../components/Preloading';

export default class Layout extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired
    }

    render() {
        const {children} = this.props;

        const title = 'WebApp';

        const meta =
            [
                // <meta charset="utf-8"/>
                {charset: 'utf-8'},

                // <meta name="..." content="..."/>
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0, user-scalable=no'
                },

                // <meta property="..." content="..."/>
                {property: 'og:title', content: 'International Bodybuilders Club'},
                {property: 'og:description', content: 'Do some push ups'},
                {property: 'og:locale', content: 'ru-RU'}
            ];

        return (
            <div className="content">
                <Title>{title}</Title>
                <Meta>{meta}</Meta>

                <Preloading />

                {children}

                <footer></footer>
            </div>
        );
    }
}
