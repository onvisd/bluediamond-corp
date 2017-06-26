import React, {Component, PropTypes} from 'react';

import ProductCardComponent from '../ProductCard';

export default class StoreProductCard extends Component {
    static propTypes = {
        data: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            handle: PropTypes.string.isRequired,
            productType: PropTypes.string.isRequired, // eslint-disable-line
            tags: PropTypes.array.isRequired,
            images: PropTypes.shape({
                edges: PropTypes.object({
                    node: PropTypes.shape({
                        src: PropTypes.string
                    })
                })
            }).isRequired
        })
    }

    render() {
        const {data} = this.props;

        return (
            <ProductCardComponent
                id={data.id}
                type={data.productType}
                title={data.title}
                slug={`/store/product/${data.handle}`}
                imageFile={data.images.edges[0].node.src}
                imageAlt={data.title}
            />
        );
    }
}
