import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

import Growers from 'images/icons/growers-site.svg';
import GlobalIngredients from 'images/icons/global-ingredients.svg';
import International from 'images/icons/international-site.svg';

@connect((state) => ({
    responsive: state.responsive,
    storeNavigation: state.storeNavigation
}))
export default class Navigation extends Component {
    static propTypes = {
        brands: PropTypes.array.isRequired
    }

    navData = {
        primary: {
            actions: [
                {name: 'Products', card: 'Products'},
                {name: 'Company', card: 'Company'}
            ],
            globalLinks: [
                {name: 'Recipes', slug: '/recipes'},
                {name: 'Product Locator', slug: '/product-locator'},
                {name: 'Store', slug: '/store'}
            ],
            companyLinks: [
                {name: 'Foodservice', slug: '/foodservice'},
                {name: 'Careers', slug: 'http://careers.bluediamond.com', external: true},
                {name: 'Press', slug: '/press'},
                {name: 'Contact Us', slug: '/contact'}
            ]
        },
        secondary: [
            {
                name: 'Growers',
                slug: 'http://bluediamondgrowers.com',
                icon: Growers
            },
            {
                name: 'Global Ingredients',
                slug: 'http://bdingredients.com',
                icon: GlobalIngredients
            },
            {
                name: 'International',
                slug: '/international',
                icon: International
            }
        ]
    }

    render() {
        const {responsive, storeNavigation, brands, company} = this.props;
        const {isStorePage} = storeNavigation;

        let nav = (
            <header>
                <DesktopNav
                    navData={this.navData}
                    brands={brands}
                    company={company}
                    isStorePage={isStorePage}
                />
                <MobileNav
                    navData={this.navData}
                    brands={brands}
                    company={company}
                    isStorePage={isStorePage}
                />
            </header>
        );

        if(
            (responsive.medium !== undefined && responsive.medium) || // eslint-disable-line
            (responsive.small !== undefined && responsive.small) // eslint-disable-line
        ) {
            nav = (
                <header>
                    <MobileNav
                        navData={this.navData}
                        brands={brands}
                        company={company}
                        isStorePage={isStorePage}
                    />
                </header>
            );
        } else if(!responsive.medium && !responsive.small) { // eslint-disable-line
            nav = (
                <header>
                    <DesktopNav
                        navData={this.navData}
                        brands={brands}
                        company={company}
                        isStorePage={isStorePage}
                    />
                </header>
            );
        }

        return nav;
    }
}
