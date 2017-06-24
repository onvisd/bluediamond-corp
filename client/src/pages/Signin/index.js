import React, {Component} from 'react';
import {Link, goto} from 'react-isomorphic-render';
import {connect} from 'react-redux';
import {Form} from 'formsy-react';
import classnames from 'classnames';

import {registerCustomer, signinCustomer} from 'state/auth';

import FormInput from 'components/FormInput';
import Button from 'components/Button';
import styles from './styles.module.css';

@connect(
    null,
    {registerCustomer, signinCustomer, goto}
)
export default class Signin extends Component {
    state = {
        view: 'signin',
        canSubmit: false
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

    handleSignIn = (creds) => {
        this.props.signinCustomer(creds)
            .then((result) => {
                this.props.goto('/contact'); // contact is used for demo purposes only

                return result;
            })
            .catch((err) => console.log(err));
    }

    handleRegister = (creds) => {
        if(creds.password === creds.password_confirmation) {
            this.props.registerCustomer(creds)
                .then((result) => {
                    this.props.goto('/contact'); // contact is used for demo purposes only

                    return result;
                })
                .catch((err) => console.log(err));
        } else {
            console.log('Passwords dont match');
        }
    }

    render() {
        const {view, canSubmit} = this.state;

        return (
            <div className={styles.container}>
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
                        <Form
                            className={styles.form}
                            onValidSubmit={this.handleSignIn}
                            onValid={this.enableSubmit}
                            onInvalid={this.disableSubmit}
                        >
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
                                Sign in
                            </Button>
                        </Form>
                    )}
                    {view === 'create' && (
                        <Form
                            className={styles.form}
                            onValidSubmit={this.handleRegister}
                            onValid={this.enableSubmit}
                            onInvalid={this.disableSubmit}
                        >
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
                                Create account
                            </Button>
                        </Form>
                    )}
                </div>
                <Link to="/checkout" className={styles.continue}>
                    Continue as Guest
                </Link>
            </div>
        );
    }
}
