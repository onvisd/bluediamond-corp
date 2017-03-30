import React, {Component, PropTypes} from 'react';

import ProductLocatorCmpnt from '../ProductLocator';

export default class ProductLocator extends Component {
    static propTypes = {
        data: PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            })
        })
    }

    render() {
        const {fields} = this.props.data;

        return (
            <ProductLocatorCmpnt
                width={fields.width}
                height={fields.height}
            />
        );
    }
}
