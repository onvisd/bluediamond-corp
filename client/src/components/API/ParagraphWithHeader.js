import React, {Component, PropTypes} from 'react';

import ParagraphComponent from '../ParagraphWithHeader';

export default class ParagraphWithHeader extends Component {
    static propTypes = {
        data: PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                header: PropTypes.string.isRequired,
                paragraph: PropTypes.string.isRequired
            })
        })
    }

    render() {
        const {fields} = this.props.data;

        return (
            <ParagraphComponent
                header={fields.header}
                paragraph={fields.paragraph}
            />
        );
    }
}
