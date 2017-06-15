import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import {Form} from 'formsy-react';

import Button from '../Button';
import Input from '../FormInput';
import Select from '../FormSelect';

import styles from './styles.module.css';

export default class RequestSampleForm extends Component {
    state = {
        canSubmit: false
    };

    static propTypes = {
        header: PropTypes.string.isRequired,
        emailTo: PropTypes.string.isRequired,
        snackAlmondOptions: PropTypes.arrayOf(PropTypes.string),
        almondBreezeOptions: PropTypes.arrayOf(PropTypes.string),
        nutThinsOptions: PropTypes.arrayOf(PropTypes.string),
        culinaryNutOptions: PropTypes.arrayOf(PropTypes.string)
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
            snackAlmonds: model.snackAlmonds,
            almondBreeze: model.almondBreeze,
            nutThins: model.nutThins,
            culinaryNuts: model.culinaryNuts
        })
        .then(() => {
            console.log('Request sent successfully!');
        })
        .catch((err) => {
            console.log('Something went wrong, please try again!', err);
        });
    }

    render() {
        const {
            snackAlmondOptions,
            almondBreezeOptions,
            nutThinsOptions,
            culinaryNutOptions
        } = this.props;

        return (
            <Form
                onValidSubmit={this.submit}
                onValid={this.enableSubmit}
                onInvalid={this.disableSubmit}
            >
                <div className={styles.container}>
                    <div className={styles.left}>
                        <Select
                            name="snackAlmonds"
                            label="Snack Almonds"
                            options={snackAlmondOptions}
                        />
                        <Select
                            name="almondBreeze"
                            label="Almond Breeze"
                            options={almondBreezeOptions}
                        />
                        <Select
                            name="nutThins"
                            label="Nut-Thins"
                            options={nutThinsOptions}
                        />
                        <Select
                            name="culinaryNuts"
                            label="Culinary Nuts"
                            options={culinaryNutOptions}
                        />
                    </div>
                    <div className={styles.right}>
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
                        <Input
                            name="companyName"
                            label="Company Name*"
                            validations="minLength:1"
                            required
                        />
                        <Input
                            name="address"
                            label="Address*"
                            validations="minLength:1"
                            required
                        />
                    </div>
                </div>
                <Button type="submit" disabled={!this.state.canSubmit}>Submit Request</Button>
            </Form>
        );
    }
}
