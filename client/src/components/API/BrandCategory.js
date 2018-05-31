import React, {Component, PropTypes} from 'react';

import BrandCategoryCmpnt from '../BrandCategory/Module';

export default class BrandCategory extends Component {
    static propTypes = {
        data: PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.object.isRequired
        })
    }

    render() {
        const {fields} = this.props.data;

        return (
            <BrandCategoryCmpnt fields={fields} />
        );
    }
}
