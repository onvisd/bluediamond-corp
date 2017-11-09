import React, {Component, PropTypes} from 'react';

import ProductCardComponent from '../ProductCard';

export default class StoreProductCard extends Component {
    static propTypes = {
        data: PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            handle: PropTypes.string.isRequired,
            tags: PropTypes.array.isRequired,
            images: PropTypes.shape({
                edges: PropTypes.object({
                    node: PropTypes.shape({
                        src: PropTypes.string
                    })
                })
            }).isRequired
        }),
        images: PropTypes.object.isRequired,
        onClick: PropTypes.func
    }

    render() {
        const {data, images, onClick} = this.props;

        return (
            <ProductCardComponent
                id={data.id}
                title={data.title}
                slug={`/store/product/${data.handle}`}
                images={images}
                imageAlt={data.title}
                onClick={onClick}
            />
        );
    }
}
