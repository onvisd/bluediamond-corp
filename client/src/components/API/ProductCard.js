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
            images: PropTypes.object.isRequired
        })
    }

    render() {
        const {items, images} = this.props.data;
        const {fields} = items[0];

        return (
            <ProductCardComponent
                title={fields.name}
                slug={`/product/${fields.slug}`}
                images={images}
                imageAlt={fields.name}
            />
        );
    }
}
