import React, {Component, PropTypes} from 'react';

import ProductCardComponent from '../ProductCard';

export default class ProductCard extends Component {
    static propTypes = {
        data: PropTypes.shape({
            items: PropTypes.arrayOf(PropTypes.shape({
                fields: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    slug: PropTypes.string.isRequired,
                    productPhotos: PropTypes.arrayOf(PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string
                        })
                    })).isRequired,
                    description: PropTypes.string.isRequired
                })
            })),
            includes: PropTypes.shape({
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
        const {fields} = items[0];

        const assetsById = {};
        includes.Asset.forEach((asset) => {
            assetsById[asset.sys.id] = asset.fields;
        });

        return (
            <ProductCardComponent
                title={fields.name}
                slug={fields.slug}
                imageFile={assetsById[fields.productPhotos[0].sys.id].file.url}
                imageAlt={assetsById[fields.productPhotos[0].sys.id].file.name}
            />
        );
    }
}
