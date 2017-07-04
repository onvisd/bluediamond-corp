import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {Form} from 'formsy-react';

import Button from '../Button';
import Input from '../FormInput';
import Select from '../FormSelect';
import Textarea from '../FormTextarea';

import styles from './styles.module.css';

export default class FoodserviceContact extends Component {
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
            company: model.company,
            subject: model.subject,
            message: model.message,
            template: 'FSContact'
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
                {allowSubject && (
                    <Select
                        name="subject"
                        label="What is your inquiry regarding?"
                        options={predefinedSubjects}
                        classNames={{container: styles.input, label: styles.label}}
                        required
                    />
                )}
                <Input
                    name="company"
                    label="Company"
                    classNames={{container: styles.input, label: styles.label}}
                />
                <Textarea
                    name="message"
                    label="Your message"
                    validations="minLength:1"
                    classNames={{container: styles.input, label: styles.label}}
                    required
                />
                <Button type="submit" disabled={!this.state.canSubmit}>Send Message</Button>
            </Form>
        );
    }
}
