import React, {Component, PropTypes} from 'react';
import styles from './styles.module.css';

import Button from '../../Button';
import View from '../View';
import NavList from '../NavList';
import NavItem from '../NavItem';
import ProductList from '../ProductList';

export default class ProductNav extends Component {
    static propTypes = {
        onUpdateView: PropTypes.func.isRequired,
        onToggleNav: PropTypes.func.isRequired,
        navStack: PropTypes.array.isRequired,
        brands: PropTypes.array.isRequired
    }

    renderBrand = (brand) => {
        const {onUpdateView, navStack} = this.props;

        return (
            <View theme="brand">
                <NavList>
                    {brand.children.map((child) => (
                        <NavItem
                            key={child.name}
                            type="brand"
                            active={navStack.indexOf(child.name) !== -1}
                            onClick={() => onUpdateView([child.name, brand.slug, 'products'])}
                        >
                            {child.name}
                        </NavItem>
                    ))}
                </NavList>
            </View>
        );
    };

    renderCategory = (brand, category) => (
        <View theme="two_wide">
            <ProductList products={category.products.slice(0, 3)} />
            <Button
                theme="yellow"
                href={`/${brand.slug}`}
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

    renderBase = () => {
        const {brands, onUpdateView, navStack} = this.props;

        return (
            <View>
                <NavList>
                    {brands.map((brand) => (
                        <NavItem
                            key={brand.slug}
                            active={navStack.indexOf(brand.slug) !== -1}
                            onClick={() => onUpdateView([brand.slug, 'products'])}
                        >
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
            const category = brand.children.filter((c) => c.name === navStack[0])[0];

            return (
                <div className={styles.wrapper}>
                    {this.renderBase()}
                    {this.renderBrand(brand)}
                    {this.renderCategory(brand, category)}
                </div>
            );
        }

        if(navStack.length === 2) {
            const brand = brands.filter((b) => b.slug === navStack[0])[0];

            return (
                <div className={styles.wrapper}>
                    {this.renderBase()}
                    {this.renderBrand(brand)}
                </div>
            );
        }

        return this.renderBase();
    };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.innerContainer} onMouseLeave={this.props.onToggleNav}>
                    {this.renderView()}
                </div>
            </div>
        );
    }
}
