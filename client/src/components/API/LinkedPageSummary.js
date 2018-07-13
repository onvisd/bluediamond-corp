import React, {Component, PropTypes} from 'react';

import LinkedPageSmryCmpnt from '../LinkedPageSummary';

export default class LinkedPageSummary extends Component {
    static propTypes = {
        data: PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                linkTitle: PropTypes.string.isRequired,
                linkUrl: PropTypes.string.isRequired,
                summary: PropTypes.string.isRequired
            })
        })
    }

    render() {
        const {fields} = this.props.data;

        return (
            <LinkedPageSmryCmpnt
                title={fields.linkTitle}
                url={fields.linkUrl}
                summary={fields.summary}
            />
        );
    }
}
