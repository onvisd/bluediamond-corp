import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {Form} from 'formsy-react';

import Button from '../Button';
import Input from '../FormInput';
import Select from '../FormSelect';
import Textarea from '../FormTextarea';

import countryState from 'tools/countryState';

const countries = countryState.countries.map((item) => item.country);
const states = {};
countryState.countries.forEach((item) => {
    states[item.country] = item.states;
});

import styles from './styles.module.css';

export default class ContactForm extends Component {
    state = {
        canSubmit: false,
        stateList: states['United States']
    };

    static propTypes = {
        header: PropTypes.string.isRequired,
        emailTo: PropTypes.string.isRequired,
        allowSubject: PropTypes.bool.isRequired,
        allowCompany: PropTypes.bool.isRequired,
        allowMessage: PropTypes.bool.isRequired,
        predefinedSubjects: PropTypes.arrayOf(PropTypes.string),
        predefinedInquiry: PropTypes.arrayOf(PropTypes.string),
        showNote: PropTypes.bool.isRequired
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

    submit = (model) => {
        this.setState({
            error: false,
            sent: false,
            canSubmit: false,
            sending: true
        });

        axios.post('/api/email', {
            toEmail: this.props.emailTo,
            email: model.email,
            firstName: model.firstName,
            lastName: model.lastName,
            streetAddress: model.streetAddress,
            city: model.city,
            state: model.state,
            country: model.country,
            postalCode: model.postalCode,
            lotCode: model.lotCode,
            bestBeforeDate: model.bestBeforeDate,
            timeStamp: model.timeStamp,
            upc: model.upc,
            company: model.company,
            subject: model.subject,
            message: model.message,
            inquiry: model.inquiry,
            template: 'Contact'
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

    updateCountry = (country) => {
        this.setState({stateList: states[country]});
    }

    render() {
        const {
            allowSubject,
            allowCompany,
            allowMessage,
            predefinedSubjects,
            predefinedInquiry
        } = this.props;

        return (
            <Form
                onValidSubmit={this.submit}
                onValid={this.enableSubmit}
                onInvalid={this.disableSubmit}
                className={styles.form}
                ref={(form) => {
                    this.form = form;
                }}
            >
                {this.state.sent
                    ? (
                        <p className={styles.sent} ref={(sent) => {
                            this.sent = sent;
                        }}>
                            Your message has been received and we will follow up with you as
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
                            There was a problem sending your message. Please try again.
                        </p>
                    )
                    : null
                }
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
                    name="email"
                    label="Email address"
                    validations="isEmail"
                    validationError="Please enter a valid email address"
                    classNames={{container: styles.input, label: styles.label}}
                    required
                />
                <Input
                    name="verifyEmail"
                    label="Verify your email address"
                    validations="isEmail,equalsField:email"
                    validationError="The email addresses entered do not match"
                    classNames={{container: styles.input, label: styles.label}}
                    required
                />
                <Input
                    name="streetAddress"
                    label="Street address"
                    classNames={{container: styles.input, label: styles.label}}
                />
                <div className={styles.fieldPair}>
                    <Input
                        name="city"
                        label="City"
                        validations="minLength:1"
                        classNames={{container: styles.input, label: styles.label}}
                        required
                    />
                    {this.state.stateList
                        ? (
                            <Select
                                name="state"
                                label="State/Province"
                                options={this.state.stateList}
                                classNames={{container: styles.input, label: styles.label}}
                                required
                            />
                        )
                        : (
                            <Input
                                name="state"
                                label="State/Province"
                                validations="minLength:1"
                                classNames={{container: styles.input, label: styles.label}}
                                required
                            />
                        )
                    }
                </div>
                <div className={styles.fieldPair}>
                    <Select
                        name="country"
                        label="Country"
                        options={countries}
                        classNames={{container: styles.input, label: styles.label}}
                        onChange={this.updateCountry}
                        value="United States"
                        required
                    />
                    <Input
                        name="postalCode"
                        label="Postal Code"
                        validations="minLength:1,isAlphanumeric"
                        validationError="Please enter a valid postal code"
                        classNames={{container: styles.input, label: styles.label}}
                        required
                    />
                </div>
                {allowSubject && (
                    <Select
                        name="subject"
                        label="What is your inquiry regarding?"
                        options={predefinedSubjects}
                        classNames={{container: styles.input, label: styles.label}}
                        required
                    />
                )}
                {allowSubject && (
                    <Select
                        name="inquiry"
                        label="Product I am inquring about"
                        options={predefinedInquiry}
                        classNames={{container: styles.input, label: styles.label}}
                        required
                    />
                )}
                <div className={styles.fieldPair}>
                    <Input
                        name="lotCode"
                        label="Lot Code"
                        classNames={{container: styles.input, label: styles.label}}
                    />
                    <Input
                        name="bestBeforeDate"
                        label="Best Before Date"
                        classNames={{container: styles.input, label: styles.label}}
                    />
                </div>
                <div className={styles.fieldPair}>
                    <Input
                        name="timeStamp"
                        label="Time Stamp"
                        classNames={{container: styles.input, label: styles.label}}
                    />
                    <Input
                        name="upc"
                        label="UPC Code"
                        classNames={{container: styles.input, label: styles.label}}
                    />
                </div>
                {allowCompany && (
                    <Input
                        name="company"
                        label="Company"
                        classNames={{container: styles.input, label: styles.label}}
                    />
                )}
                {allowMessage && (
                    <Textarea
                        name="message"
                        label="Your message"
                        validations="minLength:1"
                        classNames={{container: styles.input, label: styles.label}}
                        required
                    />
                )}
                <Button
                    type="submit"
                    disabled={!this.state.canSubmit}
                >
                    {this.state.sending ? 'Sending...' : 'Send Message'}
                </Button>
            </Form>
        );
    }
}
