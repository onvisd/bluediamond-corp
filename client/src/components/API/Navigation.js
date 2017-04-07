import React, {Component, PropTypes} from 'react';

import NavigationComponent from '../Navigation';

export default class Navigation extends Component {
    static propTypes = {
        data: PropTypes.shape({
            items: PropTypes.arrayOf(PropTypes.shape({
                fields: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    slug: PropTypes.string.isRequired
                })
            })),
            includes: PropTypes.shape({
                Entry: PropTypes.arrayOf(PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    }),
                    fields: PropTypes.shape({
                        name: PropTypes.string,

                        /* Only the Brand Category (brandCategory) type has this */
                        products: PropTypes.arrayOf(PropTypes.shape({
                            sys: PropTypes.shape({
                                id: PropTypes.string
                            })
                        })),

                        /* Only the Product (product) type has this */
                        productPhotos: PropTypes.arrayOf(PropTypes.shape({
                            sys: PropTypes.shape({
                                id: PropTypes.string
                            })
                        }))
                    })
                })),
                Asset: PropTypes.arrayOf(PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string.isRequired
                    }),
                    fields: PropTypes.shape({
                        title: PropTypes.string.isRequired,
                        file: PropTypes.shape({
                            url: PropTypes.string
                        }).isRequired
                    })
                }))
            })
        })
    }

    render() {
        const {items, includes} = this.props.data;

        const assetsById = {};
        includes.Asset.forEach((asset) => {
            assetsById[asset.sys.id] = asset.fields;
        });

        // Process product entries
        const products = {};
        includes.Entry.forEach((entry) => {
            if(entry.sys.contentType.sys.id === 'product') {
                products[entry.sys.id] = {
                    name: entry.fields.name,
                    slug: entry.fields.slug,
                    photo: assetsById[entry.fields.productPhotos[0].sys.id]
                };
            }
        });

        // Process category entries (need the products to be sorted so we can handle those)
        const categories = {};
        includes.Entry.forEach((entry) => {
            if(entry.sys.contentType.sys.id === 'brandCategory') {
                categories[entry.sys.id] = {
                    name: entry.fields.name,
                    products: (entry.fields.products || []).map(
                        (product) => products[product.sys.id]
                    )
                };
            }
        });

        const productNavigation = [];
        items.forEach((brand) => {
            productNavigation.push({
                name: brand.fields.name,
                slug: brand.fields.slug,
                children: brand.fields.categories.map((category) => categories[category.sys.id])
            });
        });

        return (
            <NavigationComponent
                products={productNavigation}
            />
        );
    }
}
