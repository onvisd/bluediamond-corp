import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Meta, preload} from 'react-isomorphic-render';
import env from 'tools/env';

import {
    connector as navConnector,
    getNavigationData,
    setNavigationStyle
} from '../state/navigation';

import {
    connector as authConnector,
    getCustomer
} from '../state/auth';

import {
    connector as checkoutConnector,
    getCheckout
} from '../state/checkout';

import Title from 'components/Title';
import Preloading from 'components/Preloading';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import FooterMobile from 'components/FooterMobile';
import sortByPriority from 'tools/sortByPriority';

@preload(async ({dispatch}) => {
    await Promise.all([
        dispatch(getCustomer()),
        dispatch(setNavigationStyle({})),
        dispatch(getNavigationData())
    ]);
})
@connect(
    (state) => ({
        responsive: state.responsive,
        ...navConnector(state.navigation),
        ...authConnector(state.auth),
        ...checkoutConnector(state.checkout)
    }),
    {
        getCustomer,
        getNavigationData,
        setNavigationStyle,
        getCheckout
    }
)
export default class Layout extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        navigation: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired
    }

    componentWillMount() {
        const {search} = this.props.location;

        if(search.match('nocache'))
            env.development = true;
    }

    componentDidMount() {
        this.props.getCheckout();
    }

    render() {
        const {children, navigation, responsive} = this.props;
        const {brands, companyNavItems} = navigation.data;
        const footerData = brands.sort(sortByPriority).map((brand) => ({
            name: brand.fields.name,
            slug: brand.fields.slug,
            categories: brand.fields.categories
                .filter((category) => !category.fields.hidden)
                .map((category) => category.fields.name)
        }));

        const title = 'From Our Hearts to Your Hands';

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
                {property: 'og:title', content: 'Blue Diamond Growers'},
                {property: 'og:description', content: 'From our hearts to your hands'},
                {property: 'og:locale', content: 'en-US'}
            ];

        let footer = (
            <div>
                <FooterMobile
                    params={this.props.params}
                    path={this.props.location.pathname}
                />
                <Footer
                    data={footerData}
                    params={this.props.params}
                    path={this.props.location.pathname}
                />
            </div>
        );

        if(responsive.small !== undefined && responsive.small) { // eslint-disable-line
            footer = (
                <FooterMobile
                    params={this.props.params}
                    path={this.props.location.pathname}
                />
            );
        } else if(responsive.small !== undefined && !responsive.small) { // eslint-disable-line
            footer = (
                <Footer
                    data={footerData}
                    params={this.props.params}
                    path={this.props.location.pathname}
                />
            );
        }

        return (
            <div className="content">
                <Title>{title}</Title>
                <Meta>{meta}</Meta>

                <Navigation brands={brands} company={companyNavItems} />

                <Preloading />

                {children}

                {footer}
            </div>
        );
    }
}
