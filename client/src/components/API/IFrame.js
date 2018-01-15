import React, {Component, PropTypes} from 'react';

import IFrameComponent from '../IFrame';

export default class IFrame extends Component {
    static propTypes = {
        data: PropTypes.shape({
            fields: PropTypes.shape({
                url: PropTypes.string.isRequired,
                width: PropTypes.string,
                height: PropTypes.string.isRequired,
                style: PropTypes.object
            })
        })
    }

    render() {
        const {fields} = this.props.data;

        return (
            <IFrameComponent
                url={fields.url}
                width={fields.width}
                height={fields.height}
                style={fields.style}
            />
        );
    }
}
