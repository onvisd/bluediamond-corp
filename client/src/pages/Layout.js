import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';
import env from 'tools/env';

import {
    connector as navConnector,
    getNavigationData,
    setNavigationStyle
} from '../state/navigation';

import {
    connector as storeNavigationConnector,
    setStoreNavigation
} from '../state/storeNavigation';

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
import Meta from 'components/Meta';
import sortByPriority from 'tools/sortByPriority';

@preload(async ({dispatch}) => {
    await Promise.all([
        dispatch(getCustomer()),
        dispatch(getNavigationData())
    ]);
})
@connect(
    (state) => ({
        responsive: state.responsive,
        ...navConnector(state.navigation),
        ...storeNavigationConnector(state.storeNavigation),
        ...authConnector(state.auth),
        ...checkoutConnector(state.checkout)
    }),
    {
        getCustomer,
        getNavigationData,
        setStoreNavigation,
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

        let footer = (
            <div>
                <FooterMobile
                    params={this.props.params}
                    isStorePage={this.props.isStorePage}
                />
                <Footer
                    data={footerData}
                    params={this.props.params}
                    isStorePage={this.props.isStorePage}
                />
            </div>
        );

        if(responsive.small !== undefined && responsive.small) { // eslint-disable-line
            footer = (
                <FooterMobile
                    params={this.props.params}
                    isStorePage={this.props.isStorePage}
                />
            );
        } else if(responsive.small !== undefined && !responsive.small) { // eslint-disable-line
            footer = (
                <Footer
                    data={footerData}
                    params={this.props.params}
                    isStorePage={this.props.isStorePage}
                />
            );
        }

        return (
            <div className="content">
                <Title>From Our Hearts to Your Hands</Title>
                <Meta />

                <Navigation brands={brands} company={companyNavItems} />

                <Preloading />

                {children}

                {footer}
            </div>
        );
    }
}
