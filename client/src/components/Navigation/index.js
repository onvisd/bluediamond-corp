import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import RootNav from './RootNav';
import RootNavMobile from './RootNavMobile';
import ProductNav from './ProductNav';
import ProductNavMobile from './ProductNavMobile';
import CompanyNav from './CompanyNav';
import CompanyNavMobile from './CompanyNavMobile';

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

    renderProducts = () => {
        const {responsive} = this.props;

        if(responsive.small !== undefined && responsive.small) { // eslint-disable-line
            return (
                <ProductNavMobile
                    onUpdateView={this.updateNavStack}
                    navStack={this.state.navStack}
                    brands={this.props.brands}
                />
            );
        } else if(responsive.small !== undefined && !responsive.small) { // eslint-disable-line
            return (
                <ProductNav
                    onUpdateView={this.updateNavStack}
                    onToggleNav={this.toggleNavigation}
                    navStack={this.state.navStack}
                    brands={this.props.brands}
                />
            );
        }
    };

    renderCompany = () => {
        const {responsive} = this.props;

        if(responsive.small !== undefined && responsive.small) { // eslint-disable-line
            return (
                <CompanyNavMobile
                    navTiles={this.props.companyNavTiles}
                    onUpdateView={this.updateNavStack}
                />
            );
        } else if(responsive.small !== undefined && !responsive.small) { // eslint-disable-line
            return (
                <CompanyNav
                    onToggleNav={this.toggleNavigation}
                    navTiles={this.props.companyNavTiles}
                    navData={navData}
                />
            );
        }
    };

    renderView = () => {
        const {navStack} = this.state;

        if(navStack.length && navStack.indexOf('products') === (navStack.length - 1))
            return this.renderProducts();
        if(navStack.indexOf('company') === 0)
            return this.renderCompany();
    };

    render() {
        const {responsive} = this.props;

        let rootNav = (
            <header>
                <RootNav
                    navData={navData}
                    navStack={this.state.navStack}
                    onUpdateView={this.updateNavStack}
                    onToggleNav={this.toggleNavigation}
                    brands={this.props.brands}
                    companyNavTiles={this.props.companyNavTiles}
                >
                    {this.renderView()}
                </RootNav>
                <RootNavMobile
                    navData={navData}
                    navStack={this.state.navStack}
                    onUpdateView={this.updateNavStack}
                    onToggleNav={this.toggleNavigation}
                    visible={this.state.visible}
                    brands={this.props.brands}
                    companyNavTiles={this.props.companyNavTiles}
                >
                    {this.renderView()}
                </RootNavMobile>
            </header>
        );

        if(responsive.small !== undefined && responsive.small) { // eslint-disable-line
            rootNav = (
                <header>
                    <RootNavMobile
                        navData={navData}
                        navStack={this.state.navStack}
                        onUpdateView={this.updateNavStack}
                        onToggleNav={this.toggleNavigation}
                        visible={this.state.visible}
                        brands={this.props.brands}
                        companyNavTiles={this.props.companyNavTiles}
                    >
                        {this.renderView()}
                    </RootNavMobile>
                </header>
            );
        } else if(responsive.small !== undefined && !responsive.small) { // eslint-disable-line
            rootNav = (
                <header>
                    <RootNav
                        navData={navData}
                        navStack={this.state.navStack}
                        onUpdateView={this.updateNavStack}
                        onToggleNav={this.toggleNavigation}
                        brands={this.props.brands}
                        companyNavTiles={this.props.companyNavTiles}
                    >
                        {this.renderView()}
                    </RootNav>
                </header>
            );
        }

        return rootNav;
    }
}
