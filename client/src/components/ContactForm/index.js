import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {Form} from 'formsy-react';

import Button from '../Button';
import Input from '../FormInput';
import Select from '../FormSelect';
import Textarea from '../FormTextarea';

import styles from './styles.module.css';

export default class ContactForm extends Component {
    state = {
        canSubmit: false
    };

    static propTypes = {
        header: PropTypes.string.isRequired,
        emailTo: PropTypes.string.isRequired,
        allowSubject: PropTypes.bool.isRequired,
        allowCompany: PropTypes.bool.isRequired,
        allowMessage: PropTypes.bool.isRequired,
        predefinedSubjects: PropTypes.arrayOf(PropTypes.string),
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

    submit(model) {
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
            template: 'Contact'
        })
        .then(() => {
            console.log('Message sent successfully!');
        })
        .catch((err) => {
            console.log('Something went wrong, please try again!', err);
        });
    }

    render() {
        const {
            allowSubject,
            allowCompany,
            allowMessage,
            predefinedSubjects
        } = this.props;

        return (
            <Form
                onValidSubmit={this.submit}
                onValid={this.enableSubmit}
                onInvalid={this.disableSubmit}
                className={styles.form}
            >
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
                    <Input
                        name="state"
                        label="State"
                        validations="minLength:1"
                        classNames={{container: styles.input, label: styles.label}}
                        required
                    />
                </div>
                <div className={styles.fieldPair}>
                    <Input
                        name="country"
                        label="Country"
                        validations="minLength:1"
                        classNames={{container: styles.input, label: styles.label}}
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
                <Button type="submit" disabled={!this.state.canSubmit}>Send Message</Button>
            </Form>
        );
    }
}
