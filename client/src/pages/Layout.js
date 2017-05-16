import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Title, Meta, preload} from 'react-isomorphic-render';

import {
    connector,
    getNavigationData,
    setNavigationStyle,
    setNavBreadcrumbs
} from '../redux/navigation';
import {parseModel} from '../tools/parseApi';

import Preloading from '../components/Preloading';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FooterMobile from '../components/FooterMobile';

@preload(({dispatch}) => {
    dispatch(setNavigationStyle({}));
    dispatch(setNavBreadcrumbs([]));
    return dispatch(getNavigationData());
})
@connect(
    (state) => ({
        responsive: state.responsive,
        ...connector(state.navigation)
    }),
    {
        getNavigationData,
        setNavigationStyle,
        setNavBreadcrumbs
    }
)
export default class Layout extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        navigation: PropTypes.object.isRequired
    }

    render() {
        const {children, navigation, responsive} = this.props;
        const brands = parseModel(navigation.data.brands).map((b) => b.fields);
        const companyNavTiles = parseModel(navigation.data.companyNavTiles).map((c) => c.fields);
        const footerData = brands.map((brand) => ({
            name: brand.name,
            categories: brand.categories.map((category) => category.name)
        }));

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
