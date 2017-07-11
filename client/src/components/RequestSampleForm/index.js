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
            this.form.reset();
            this.setState({
                error: false,
                sent: true,
                sending: false
            }, () => {
                this.sent.scrollIntoView({behavior: 'smooth'});
            });
        })
        .catch(() => {
            this.setState({
                sent: false,
                error: true,
                sending: false
            }, () => {
                this.error.scrollIntoView({behavior: 'smooth'});
            });
        });
    }

    render() {
        return (
            <Form
                onValidSubmit={this.submit}
                onValid={this.enableSubmit}
                onInvalid={this.disableSubmit}
                ref={(form) => {
                    this.form = form;
                }}
            >
                {this.state.sent
                    ? (
                        <p className={styles.sent} ref={(sent) => {
                            this.sent = sent;
                        }}>
                            Your request has been received and we will follow up with you as
                            soon as possible.
                        </p>
                    )
                    : null
                }
                {this.state.error
                    ? (
                        <p className={styles.error} ref={(error) => {
                            this.error = error;
                        }}>
                            There was a problem sending your request. Please try again.
                        </p>
                    )
                    : null
                }
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
                <Button
                    type="submit"
                    disabled={!this.state.canSubmit}
                >
                    {this.state.sending ? 'Submitting...' : 'Submit Request'}
                </Button>
            </Form>
        );
    }
}
