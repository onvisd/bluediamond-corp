import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {Form} from 'formsy-react';

import Button from '../Button';
import Input from './Input';
import Select from './Select';
import Textarea from './Textarea';
import Checkbox from './Checkbox';

export default class ContactForm extends Component {
    state = {
        canSubmit: false
    };

    static propTypes = {
        header: PropTypes.string.isRequired,
        emailTo: PropTypes.string.isRequired,
        allowSubject: PropTypes.bool.isRequired,
        allowMessage: PropTypes.bool.isRequired,
        predefinedSubjects: PropTypes.arrayOf(PropTypes.string)
    }

    enableSubmit = () => {
        this.setState({
            canSubmit: true
        });
    }

    disableSubmit = () => {
        this.setState({
            canSubmit: false
        });
    }

    submit(model) {
        axios.post('/api/email', {
            toEmail: this.props.emailTo,
            fromEmail: model.email,
            name: model.name,
            subject: model.subject,
            message: model.message,
            subscribe: model.subscribe
        })
        .then(() => {
            console.log('Message sent successfully!');
        })
        .catch((err) => {
            console.log('Something went wrong, please try again!', err);
        });
    }

    render() {
        const {allowSubject, allowMessage, predefinedSubjects} = this.props;

        return (
            <Form
                onValidSubmit={this.submit}
                onValid={this.enableSubmit}
                onInvalid={this.disableSubmit}
            >
                <Input
                    name="name"
                    label="Your name*"
                    validations="minLength:1"
                    required
                />
                <Input
                    name="email"
                    label="Email address*"
                    validations="isEmail"
                    validationError="This is not a valid email"
                    required
                />
                {allowSubject && (
                    <Select
                        name="subject"
                        label="My inquiry is regarding"
                        options={predefinedSubjects}
                    />
                )}
                {allowMessage && (
                    <Textarea
                        name="message"
                        label="Your message*"
                        validations="minLength:1"
                        required
                    />
                )}
                <p className="t--type-incidental">
                    In order for us to better serve you (or address your concerns),
                    please include the product's Lot Code,
                    Best Before Date, Time Stamp, and UPC code.
                </p>
                <Checkbox
                    name="subscribe"
                    defaultChecked
                    label="Sign me up to receive emails from Blue Diamond Growers about the latest products, special offers, and more." // eslint-disable-line
                />
                <Button type="submit" disabled={!this.state.canSubmit}>Send message</Button>
            </Form>
        );
    }
}
