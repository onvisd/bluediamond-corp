import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {Form} from 'formsy-react';

import Button from '../Button';
import Input from '../FormInput';
import Textarea from '../FormTextarea';

import styles from './styles.module.css';

export default class RequestSampleForm extends Component {
    state = {
        canSubmit: false
    };

    static propTypes = {
        header: PropTypes.string.isRequired,
        emailTo: PropTypes.string.isRequired
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
            email: model.email,
            firstName: model.firstName,
            lastName: model.lastName,
            company: model.company,
            address: model.address,
            request: model.request,
            template: 'FSRequestSample'
        })
        .then(() => {
            console.log('Request sent successfully!');
        })
        .catch((err) => {
            console.log('Something went wrong, please try again!', err);
        });
    }

    render() {
        return (
            <Form
                onValidSubmit={this.submit}
                onValid={this.enableSubmit}
                onInvalid={this.disableSubmit}
            >
                <div className={styles.container}>
                    <div className={styles.fieldPair}>
                        <Input
                            name="firstName"
                            label="First Name"
                            validations="minLength:1"
                            classNames={{container: styles.input, label: styles.label}}
                            required
                        />
                        <Input
                            name="lastName"
                            label="Last Name"
                            validations="minLength:1"
                            classNames={{container: styles.input, label: styles.label}}
                            required
                        />
                    </div>
                    <Input
                        classNames={{container: styles.field}}
                        name="email"
                        label="Email address"
                        validations="isEmail"
                        validationError="This is not a valid email"
                        required
                    />
                    <Input
                        classNames={{container: styles.field}}
                        name="company"
                        label="Company Name"
                        validations="minLength:1"
                        required
                    />
                    <Input
                        classNames={{container: styles.field}}
                        name="address"
                        label="Address"
                        validations="minLength:1"
                        required
                    />
                    <Textarea
                        name="request"
                        label="Which product(s) would you like to receive samples of?"
                        required
                    />
                </div>
                <Button type="submit" disabled={!this.state.canSubmit}>Submit Request</Button>
            </Form>
        );
    }
}
