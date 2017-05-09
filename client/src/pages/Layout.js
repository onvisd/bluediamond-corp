import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Title, Meta, preload} from 'react-isomorphic-render';

import {connector, getNavigation} from '../redux/navigation';
import {parseModel} from '../tools/parseApi';

import Preloading from '../components/Preloading';
import Navigation from '../components/Navigation';

@preload(({dispatch}) => dispatch(getNavigation()))
@connect(
    (state) => ({...connector(state.navigation)}),
    {getNavigation}
)
export default class Layout extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        navigation: PropTypes.object.isRequired
    }

    render() {
        const {children, navigation} = this.props;
        const brands = parseModel(navigation.brands).map((b) => b.fields);
        const companyNavTiles = parseModel(navigation.companyNavTiles).map((c) => c.fields);

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

                <Navigation brands={brands} companyNavTiles={companyNavTiles} />

                <Preloading />

                {children}

                <footer></footer>
            </div>
        );
    }
}
