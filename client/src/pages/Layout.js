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

import Title from 'components/Title';
import Preloading from 'components/Preloading';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import FooterMobile from 'components/FooterMobile';
import sortByPriority from 'tools/sortByPriority';

@preload(async ({dispatch}) => {
    await dispatch(getCustomer());
    await dispatch(setNavigationStyle({}));
    await dispatch(getNavigationData());
})
@connect(
    (state) => ({
        responsive: state.responsive,
        ...navConnector(state.navigation),
        ...authConnector(state.auth)
    }),
    {
        getCustomer,
        getNavigationData,
        setNavigationStyle
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

    render() {
        const {children, navigation, responsive} = this.props;
        const {brands, companyNavTiles} = navigation.data;
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
                <FooterMobile />
                <Footer data={footerData} />
            </div>
        );

        if(responsive.small !== undefined && responsive.small) { // eslint-disable-line
            footer = <FooterMobile />;
        } else if(responsive.small !== undefined && !responsive.small) { // eslint-disable-line
            footer = <Footer data={footerData} />;
        }

        return (
            <div className="content">
                <Title>{title}</Title>
                <Meta>{meta}</Meta>

                <Navigation brands={brands} companyNavTiles={companyNavTiles} />

                <Preloading />

                {children}

                {footer}
            </div>
        );
    }
}
