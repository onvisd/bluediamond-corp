import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector as brandConnector, getBrand} from '../../redux/brand';
import {
    connector as navConnector,
    setNavigationStyle,
    setNavBreadcrumbs
} from '../../redux/navigation';

import CardPanel from '../../components/CardPanel';
import Hero from './Hero';
import ProductSection from './ProductSection';
import MoreFlavors from './MoreFlavors';
import MoreProducts from './MoreProducts';
import styles from './styles.module.css';

@preload(({dispatch, parameters}) =>
    dispatch(getBrand(parameters.brandSlug))
    .then((brand) => {
        const category = brand.fields.categories.filter((cat) =>
            cat.fields.slug === parameters.categorySlug)[0];

        dispatch(setNavigationStyle({
            className: `brand--${brand.fields.themeColor}`
        }));

        dispatch(setNavBreadcrumbs([{
            name: brand.fields.name,
            path: `brand/${brand.fields.slug}`
        }, {
            name: category.fields.name,
            path: `brand/${category.fields.slug}`
        }]));
    })
)
@connect(
    (state) => ({
        ...brandConnector(state.brand),
        ...navConnector(state.navigation)
    }),
    {
        getBrand,
        setNavigationStyle,
        setNavBreadcrumbs
    }
)
export default class BrandCategory extends Component {
    static propTypes = {
        brand: PropTypes.shape({
            fields: PropTypes.shape({
                name: PropTypes.string.isRequired,
                slug: PropTypes.string.isRequired,
                themeColor: PropTypes.string,
                logo: PropTypes.shape({
                    file: PropTypes.shape({
                        url: PropTypes.string.isRequired
                    })
                }),
                heroImage: PropTypes.shape({
                    file: PropTypes.shape({
                        url: PropTypes.string.isRequired
                    })
                }),
                heroTagline: PropTypes.string.isRequired,
                stories: PropTypes.array,
                categories: PropTypes.array,
                recipePanel: PropTypes.object,
                products: PropTypes.array
            })
        })
    }

    constructor(props) {
        super(props);

        const {categories, products} = this.props.brand.fields;

        const category = categories.filter((cat) =>
            cat.fields.slug === this.props.params.categorySlug
        )[0];

        const categoryProducts = products.filter((product) =>
            product.fields.brandCategory === category.fields.name
        );

        let activeProduct = categoryProducts[0];
        const productQuery = this.props.location.query.product;

        if(productQuery) {
            activeProduct = categoryProducts.filter((product) =>
                product.fields.slug === productQuery
            )[0];
        }

        this.state = {
            activeProduct,
            category,
            categoryProducts
        };
    }

    componentWillMount() {
        const {brand} = this.props;
        const {category} = this.state;

        this.props.setNavigationStyle({
            className: `brand--${brand.fields.themeColor}`
        });

        this.props.setNavBreadcrumbs([{
            name: brand.fields.name,
            path: `brand/${brand.fields.slug}`
        }, {
            name: category.fields.name,
            path: `brand/${category.fields.slug}`
        }]);
    }

    setActiveProduct = (activeProduct) => {
        this.setState(() => ({activeProduct}));
    }

    componentWillUnmount() {
        this.props.setNavigationStyle({});
        this.props.setNavBreadcrumbs([]);
    }

    render() {
        const {activeProduct, category, categoryProducts} = this.state;
        const {brand} = this.props;

        const otherBrandCategories = brand.fields.categories.filter((cat) =>
            cat.fields.name !== category.fields.name
        ).slice(0, 2);

        const moreProducts = brand.fields.moreProducts.filter((product) =>
            activeProduct.fields.name !== product.fields.name
        ).slice(0, 6);

        return (
            <section className="content">
                <Title>{`${brand.fields.name} | ${category.fields.name}`}</Title>
                <Hero brand={brand} category={category} product={activeProduct} />
                <div className={styles.background}>
                    <ProductSection
                        brand={brand}
                        category={category}
                        products={categoryProducts}
                        activeProduct={activeProduct}
                        setActiveProduct={this.setActiveProduct}
                    />
                    <MoreFlavors
                        brand={brand}
                        otherCategories={otherBrandCategories}
                    />
                    <MoreProducts products={moreProducts} />
                </div>
                {brand.fields.waysToUse && (
                    <CardPanel
                        type="instagram"
                        name={brand.fields.name}
                        cards={brand.fields.waysToUse}
                    />
                )}
                {brand.fields.recipePanel && (
                    <CardPanel
                        type="recipes"
                        name={brand.fields.name}
                        theme={brand.fields.themeColor}
                        cards={brand.fields.recipePanel.recipes}
                    />
                )}
            </section>
        );
    }
}
