import React, {Component, PropTypes} from 'react';

import ProductCardComponent from '../ProductCard';

export default class StoreProductCard extends Component {
    static propTypes = {
        data: PropTypes.shape({
            products: PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                handle: PropTypes.string.isRequired,
                product_type: PropTypes.string.isRequired, // eslint-disable-line
                tags: PropTypes.string.isRequired,
                image: PropTypes.shape({
                    src: PropTypes.string.isRequired
                })
            })
        })
    }

    render() {
        const {products} = this.props.data;

        return (
            <ProductCardComponent
                id={products.id}
                type={products.product_type}
                title={products.title}
                slug={`/store/product/${products.handle}`}
                imageFile={products.image.src}
                imageAlt={products.title}
            />
        );
    }
}
