import React, {Component, PropTypes} from 'react';

import Button from '../../Button';
import Breadcrumb from '../Breadcrumb';
import NavItem from '../NavItem';
import NavList from '../NavList';
import ProductList from '../ProductList';
import View from '../View';

export default class ProductNavMobile extends Component {
    static propTypes = {
        onUpdateView: PropTypes.func.isRequired,
        navStack: PropTypes.array.isRequired,
        brands: PropTypes.array.isRequired
    }

    renderBrand = (brand) => {
        const {onUpdateView} = this.props;

        return (
            <View theme="brand">
                <Breadcrumb
                    theme="yellow_light"
                    onClick={() => onUpdateView(['products'])}
                >
                    {brand.name}
                </Breadcrumb>
                <NavList>
                    {brand.categories.map((child) => (
                        <NavItem
                            key={child._id}
                            type="brand"
                            onClick={() => onUpdateView([child.name, brand.slug, 'products'])}
                        >
                            {child.name}
                        </NavItem>
                    ))}
                </NavList>
            </View>
        );
    };

    renderCategory = (brand, category) => {
        const {onUpdateView, onToggleNav} = this.props;

        return (
            <View>
                <Breadcrumb
                    theme="yellow"
                    onClick={() => onUpdateView([brand.slug, 'products'])}
                >
                    {category.name}
                </Breadcrumb>
                {category.products &&
                    <ProductList products={category.products} />}
                <Button
                    theme="yellow"
                    href={`/brand/${brand.slug}`}
                    onClick={onToggleNav}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bottom: '2rem'
                    }}
                >
                    {`See All ${brand.name}`}
                </Button>
            </View>
        );
    }

    renderBase = () => {
        const {brands, onUpdateView} = this.props;

        return (
            <View>
                <Breadcrumb onClick={() => onUpdateView([])}>
                    Our Products
                </Breadcrumb>
                <NavList>
                    {brands.map((brand) => (
                        <NavItem key={brand.slug} onClick={() => onUpdateView([brand.slug, 'products'])}>
                            {brand.name}
                        </NavItem>
                    ))}
                </NavList>
            </View>
        );
    }

    renderView = () => {
        const {brands, navStack} = this.props;

        if(navStack.length === 3) {
            const brand = brands.filter((b) => b.slug === navStack[1])[0];
            const category = brand.categories.filter((c) => c.name === navStack[0])[0];

            return this.renderCategory(brand, category);
        }

        if(navStack.length === 2) {
            const brand = brands.filter((b) => b.slug === navStack[0])[0];

            return this.renderBrand(brand);
        }

        return this.renderBase();
    };

    render() {
        return this.renderView();
    }
}
