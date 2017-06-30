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
            fromEmail: model.email,
            name: model.name,
            companyName: model.companyName,
            address: model.address,
            request: model.request
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
                    <Input
                        classNames={{container: styles.field}}
                        name="name"
                        label="Your name"
                        validations="minLength:1"
                        required
                    />
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
                        name="companyName"
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
