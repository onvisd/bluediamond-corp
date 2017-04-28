import React, {Component, PropTypes} from 'react';

import BrandCategoryCmpt from '../BrandCategory';

export default class BrandCategory extends Component {
    static propTypes = {
        data: PropTypes.shape({
            entry: PropTypes.shape({
                fields: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                    description: PropTypes.string.isRequired,
                    products: PropTypes.arrayOf(PropTypes.shape({
                        name: PropTypes.string.isRequired,
                        slug: PropTypes.string.isRequired,
                        image: PropTypes.string.isRequired
                    }))
                })
            })
        })
    }

    render() {
        const {entry} = this.props.data;
        const {fields} = entry;

        return (
            <BrandCategoryCmpt
                name={fields.name}
                description={fields.description}
                products={fields.products}
            />
        );
    }
}
