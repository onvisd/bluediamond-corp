import React, {Component} from 'react';
import {Link, goto} from 'react-isomorphic-render';
import {connect} from 'react-redux';
import {Form} from 'formsy-react';

import {connector as authConnector} from 'state/auth';
import {resetCustomer} from 'state/auth';

import FormInput from 'components/FormInput';
import Button from 'components/Button';
import styles from './styles.module.css';

@connect(
    (state) => ({...authConnector(state.auth)}),
    {resetCustomer, goto}
)
export default class Signin extends Component {
    state = {
        submitting: false,
        canSubmit: false,
        error: null,
        success: null,
        message: ''
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

    message = (err) => {
        if(!err)
            return;

        switch (err) {
            case 'Unidentified customer':
                return 'Your email or password was incorrect. Please try again.';
            default:
                return 'We encountered a problem. Please try again.';
        }
    }

    throwError = (err) => {
        this.setState({
            error: true,
            message: this.message(err),
            canSubmit: true,
            submitting: false
        });
    }

    handleReset = (creds) => {
        this.setState({submitting: true});

        this.props.resetCustomer(creds)
            .then((result) => {
                if(this.props.auth.authenticated === true) {
                    this.setState({submitting: false, success: true});
                    this.props.goto('/store');
                } else {
                    this.throwError(this.props.auth.response.text);
                }

                return result;
            })
            .catch(() => {
                this.throwError(this.props.auth.response.text);
            });
    }

    buttonState() {
        if(this.state.submitting)
            return 'Resetting…';
        else if(this.state.success)
            return 'Success! Please wait…';

        return 'Reset Password';
    }

    render() {
        const {canSubmit, error, message} = this.state;

        return (
            <div className={styles.container}>
                <h1>Reset Your Password</h1>
                <div className={styles.formWrap}>
                    <Form
                        className={styles.form}
                        onValidSubmit={this.handleReset}
                        onValid={this.enableSubmit}
                        onInvalid={this.disableSubmit}
                    >
                        {error
                            ? (
                                <p className={styles.error}>
                                    {message}
                                </p>
                            )
                            : null
                        }
                        <FormInput
                            type="password"
                            name="password"
                            label="New Password"
                            validations="minLength:1"
                            required
                        />
                        <Button
                            type="submit"
                            layout="fw"
                            disabled={!canSubmit}
                        >
                            {this.buttonState()}
                        </Button>
                    </Form>
                </div>
                <Link to="/store" className={styles.continue}>
                    Continue as Guest
                </Link>
            </div>
        );
    }
}
