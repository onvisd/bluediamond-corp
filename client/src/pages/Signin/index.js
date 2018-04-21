import React, {Component} from 'react';
import {Link, goto} from 'react-isomorphic-render';
import {connect} from 'react-redux';
import Formsy from 'formsy-react';
import classnames from 'classnames';

import {connector as authConnector} from 'state/auth';
import {registerCustomer, signinCustomer, recoverCustomerPass} from 'state/auth';

import Title from 'components/Title';
import Meta from 'components/Meta';
import FormInput from 'components/FormInput';
import Button from 'components/Button';

import styles from './styles.module.css';

@connect(
    (state) => ({...authConnector(state.auth)}),
    {registerCustomer, signinCustomer, recoverCustomerPass, goto}
)
export default class Signin extends Component {
    state = {
        view: 'signin',
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

    handleSignIn = (creds) => {
        this.setState({submitting: true});

        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'floodlight',
                activity: 'signi00'
            });
        }

        this.props.signinCustomer(creds)
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

    handleRegister = (creds) => {
        this.setState({submitting: true});

        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'floodlight',
                activity: 'creat0'
            });
        }

        if(creds.password === creds.password_confirmation) {
            this.props.registerCustomer(creds)
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
        } else {
            this.throwError('Passwords do not match');
        }
    }

    handleRecover = (creds) => {
        this.setState({submitting: true});

        this.props.recoverCustomerPass(creds)
            .then((result) => {
                this.setState({submitting: false, success: true});
                return result;
            })
            .catch(() => {
                this.throwError(this.props.auth.response.text);
            });
    }

    signInState() {
        if(this.state.submitting)
            return 'Signing in…';
        else if(this.state.success)
            return 'Success! Please wait…';

        return 'Sign in';
    }

    registerState() {
        if(this.state.submitting)
            return 'Creating account…';
        else if(this.state.success)
            return 'Success! Please wait…';

        return 'Create Account';
    }

    recoverState() {
        if(this.state.submitting)
            return 'Looking up…';
        else if(this.state.success)
            return 'Success! Sending recovery email.';

        return 'Recover Password';
    }

    render() {
        const {view, canSubmit, error, message} = this.state;

        return (
            <div className={styles.container}>
                <Title>Sign In / Create Account</Title>
                <Meta>{[
                    {
                        property: 'og:title',
                        content: 'Sign In / Create Account'
                    },
                    {
                        property: 'og:description',
                        content: (
                            'If you have registered with us before, sign in' +
                            'now to save time during checkout. Signing in is optional.' +
                            'You can check out without signing in.'
                        )
                    },
                    {
                        name: 'description',
                        content: (
                            'If you have registered with us before, sign in' +
                            'now to save time during checkout. Signing in is optional.' +
                            'You can check out without signing in.'
                        )
                    }
                ]}</Meta>
                <h1>Shopped with us before?</h1>
                <p>
                    If you have registered with us before, sign in
                    now to save time during checkout. Signing in is optional.
                    You can check out without signing in.
                </p>
                <div className={styles.formWrap}>
                    <div className={styles.tabs}>
                        <button
                            className={classnames(styles.tab, {
                                [styles.inactive]: view !== 'signin'
                            })}
                            onClick={() => {
                                this.setState(() => ({view: 'signin'}));
                            }}
                        >
                            Sign In
                        </button>
                        <button
                            className={classnames(styles.tab, {
                                [styles.inactive]: view !== 'create'
                            })}
                            onClick={() => {
                                this.setState(() => ({view: 'create'}));
                            }}
                        >
                            Create Account
                        </button>
                    </div>
                    {view === 'signin' && (
                        <Formsy
                            className={styles.form}
                            onValidSubmit={this.handleSignIn}
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
                                name="email"
                                label="Email Address"
                                validations="isEmail"
                                validationError="This is not a valid email"
                                required
                            />
                            <FormInput
                                type="password"
                                name="password"
                                label="Password"
                                validations="minLength:1"
                                required
                            />
                            <Button
                                type="submit"
                                layout="fw"
                                disabled={!canSubmit}
                            >
                                {this.signInState()}
                            </Button>
                            <div className={styles.forgotPass}>
                                <a onClick={() => this.setState(() => ({view: 'recover'})) }>
                                    Forgot Password?
                                </a>
                            </div>
                        </Formsy>
                    )}
                    {view === 'create' && (
                        <Formsy
                            className={styles.form}
                            onValidSubmit={this.handleRegister}
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
                                name="email"
                                label="Email Address"
                                validations="isEmail"
                                validationError="This is not a valid email"
                                required
                            />
                            <FormInput
                                type="password"
                                name="password"
                                label="Password"
                                validations="minLength:1"
                                required
                            />
                            <FormInput
                                type="password"
                                name="password_confirmation"
                                label="Confirm password"
                                validations="minLength:1"
                                required
                            />
                            <Button
                                type="submit"
                                layout="fw"
                                disabled={!canSubmit}
                            >
                                {this.registerState()}
                            </Button>
                        </Formsy>
                    )}
                    {view === 'recover' && (
                        <Formsy
                            className={styles.form}
                            onValidSubmit={this.handleRecover}
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
                                name="email"
                                label="Email Address"
                                validations="isEmail"
                                validationError="This is not a valid email"
                                required
                            />
                            <Button
                                type="submit"
                                layout="fw"
                                disabled={!canSubmit}
                            >
                                {this.recoverState()}
                            </Button>
                        </Formsy>
                    )}
                </div>
                <Link to="/store" className={styles.continue}>
                    Continue as Guest
                </Link>
            </div>
        );
    }
}
