import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import RootNav from './RootNav';
import RootNavMobile from './RootNavMobile';

const navData = {
    primary: {
        actions: [
            {name: 'Our Products', navStack: ['products']},
            {name: 'Our Company', navStack: ['company']}
        ],
        globalLinks: [
            {name: 'Product Locator', slug: '/product-locator'},
            {name: 'Store', slug: '/store'}
        ],
        companyLinks: [
            {name: 'Foodservice', slug: '/foodservice'},
            {name: 'Careers', slug: 'https://careers.bluediamond.com', external: true},
            {name: 'Press', slug: '/press'},
            {name: 'Contact Us', slug: '/contact'}
        ]
    },
    secondary: [
        {name: 'Growers', slug: 'http://bluediamondgrowers.com'},
        {name: 'Global Ingredients', slug: 'http://bdingredients.com'},
        {name: 'International', slug: 'http://bluediamond.com'}
    ]
};

@connect((state) => ({
    responsive: state.responsive
}))
export default class Navigation extends Component {
    state = {
        visible: false,
        navStack: []
    }

    static propTypes = {
        brands: PropTypes.array.isRequired
    };

    toggleNavigation = () => {
        this.setState((state) => ({
            visible: !state.visible,
            navStack: []
        }));
    }

    updateNavStack = (navStack) => {
        this.setState(() => ({navStack}));
    }

    renderNav = () => (
        <header>
            <RootNav
                navData={navData}
                onUpdateView={this.updateNavStack}
                onToggleNav={this.toggleNavigation}
                navStack={this.state.navStack}
                brands={this.props.brands}
                companyNavTiles={this.props.companyNavTiles}
            />
        </header>
    );

    renderNavMobile = () => (
        <header>
            <RootNavMobile
                navData={navData}
                onUpdateView={this.updateNavStack}
                onToggleNav={this.toggleNavigation}
                navStack={this.state.navStack}
                visible={this.state.visible}
                brands={this.props.brands}
                companyNavTiles={this.props.companyNavTiles}
            />
        </header>
    );

    render() {
        const {responsive} = this.props;

        if(responsive.small !== undefined && responsive.small) // eslint-disable-line
            return this.renderNavMobile();

        if(responsive.small !== undefined) // eslint-disable-line
            return this.renderNav();

        return null;
    }
}
