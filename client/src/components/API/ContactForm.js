import React, {Component, PropTypes} from 'react';

import ContactFormComponent from '../ContactForm';

export default class ContactForm extends Component {
    static propTypes = {
        data: PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                header: PropTypes.string.isRequired,
                emailTo: PropTypes.string.isRequired,
                allowSubject: PropTypes.bool.isRequired,
                allowMessage: PropTypes.bool.isRequired
            })
        })
    }

    render() {
        const {fields} = this.props.data;

        return (
            <ContactFormComponent
                header={fields.header}
                allowSubject={fields.allowSubject}
                allowMessage={fields.allowMessage}
            />
        );
    }
}
