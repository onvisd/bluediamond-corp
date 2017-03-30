import React, {Component, PropTypes} from 'react';
import Formsy from 'formsy-react';

import ContactFormInput from '../ContactFormInput';
import ContactFormTextarea from '../ContactFormTextarea';

// import styles from './styles.module.css';

export default class ContactForm extends Component {
    state = {
        canSubmit: false
    };

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

    constructor() {
        super();
        this.enableSubmit = this.enableSubmit.bind(this);
        this.disableSubmit = this.disableSubmit.bind(this);
    }

    enableSubmit() {
        this.setState({
            canSubmit: true
        });
    }

    disableSubmit() {
        this.setState({
            canSubmit: false
        });
    }

    submit(model) {
        console.log(model);
    }

    render() {
        const {fields} = this.props.data;

        return (
            <Formsy.Form
                onValidSubmit={this.submit}
                onValid={this.enableSubmit}
                onInvalid={this.disableSubmit}
            >
                <h3>{fields.header}</h3>
                <ContactFormInput
                    name="name"
                    label="Name"
                    required
                />
                <ContactFormInput
                    name="email"
                    label="Email"
                    validations="isEmail"
                    validationError="This is not a valid email"
                    required
                />
                {fields.allowSubject && (
                    <ContactFormInput
                        name="subject"
                        label="Subject"
                        required
                    />
                )}
                {fields.allowMessage && (
                    <ContactFormTextarea
                        name="message"
                        label="Message"
                        required
                    />
                )}
                <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
            </Formsy.Form>
        );
    }
}
