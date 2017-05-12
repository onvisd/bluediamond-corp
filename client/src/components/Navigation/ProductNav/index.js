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
            <View theme={`brand--${brand.themeColor}`}>
                <NavList>
                    {brand.categories.map((child) => (
                        <NavItem
                            key={child._id}
                            theme={`brand--${brand.themeColor}`}
                            active={navStack.indexOf(child.name) !== -1}
                            onClick={() => onUpdateView([child.name, brand.slug, 'products'])}
                        >
                            {child.name.replace('Flavors', '')}
                        </NavItem>
                    ))}
                </NavList>
            </View>
        );
    };

    renderCategory = (brand, category) => (
        <View theme="two_wide">
            {category.products &&
                <ProductList products={category.products.slice(0, 4)} />}
            <Button
                theme="yellow"
                href={`/brand/${brand.slug}`}
                onClick={this.props.onToggleNav}
                style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    bottom: '1rem'
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
                            key={brand._id}
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
            const category = brand.categories.filter((c) => c.name === navStack[0])[0];

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
