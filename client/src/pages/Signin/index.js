import React, {Component} from 'react';
import {Link} from 'react-isomorphic-render';
import {Form} from 'formsy-react';
import classnames from 'classnames';

import FormInput from '../../components/FormInput';
import Button from '../../components/Button';
import styles from './styles.module.css';

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

    handleSignIn = (model) => {
        console.log(model);
    }

    handleCreateAccount = (model) => {
        console.log(model);
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
                        <Form className={styles.form}>
                            <FormInput
                                name="email"
                                label="Email Address"
                                validations="isEmail"
                                validationError="This is not a valid email"
                                required
                            />
                            <FormInput
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
                        <Form className={styles.form}>
                            <FormInput
                                name="email"
                                label="Email Address"
                                validations="isEmail"
                                validationError="This is not a valid email"
                                required
                            />
                            <FormInput
                                name="password"
                                label="Password"
                                validations="minLength:1"
                                required
                            />
                            <FormInput
                                name="confirm"
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
