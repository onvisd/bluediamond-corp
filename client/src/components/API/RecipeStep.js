import React, {Component, PropTypes} from 'react';

import RecipeStepComponent from '../RecipeStep';

export default class RecipeStep extends Component {
    static propTypes = {
        data: PropTypes.shape({
            fields: PropTypes.shape({
                name: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired
            })
        })
    }

    render() {
        const {fields} = this.props.data;

        return (
            <RecipeStepComponent title={fields.name} directions={fields.content} />
        );
    }
}
