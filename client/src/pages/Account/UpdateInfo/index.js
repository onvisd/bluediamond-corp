import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Formsy from 'formsy-react';
import classnames from 'classnames';

import {updateCustomer} from 'state/auth';

import Button from 'components/Button';
import FormInput from 'components/FormInput';

import styles from './styles.module.css';

@connect(
    null,
    {updateCustomer}
)
export default class UpdateInfo extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    }

    state = {
        canSubmit: false,
        success: null,
        counter: 5
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

    handleUpdate = (model) => {
        if(model.password === model.password_confirmation) {
            // Removes password_confirmation to avoid GraphQL errors
            delete model['password_confirmation'];

            // Send the update
            this.props.updateCustomer(model)
                .then(() => {
                    this._counter = setInterval(() => {
                        if(this.state.counter > 1) {
                            this.setState(() => ({
                                success: true,
                                counter: this.state.counter - 1
                            }));
                        } else {
                            this.setState(() => ({success: null}));
                        }
                    }, 1000);
                })
                .catch((err) => {
                    this._counter = setInterval(() => {
                        if(this.state.counter > 1) {
                            this.setState(() => ({
                                success: false,
                                counter: this.state.counter - 1
                            }));
                        } else {
                            this.setState(() => ({success: null}));
                        }
                    }, 1000);
                    console.log(err);
                });
        } else {
            this.props.updateCustomer(model)
                .then(() => {
                    this._counter = setInterval(() => {
                        if(this.state.counter > 1) {
                            this.setState(() => ({
                                success: true,
                                counter: this.state.counter - 1
                            }));
                        } else {
                            this.setState(() => ({success: null}));
                        }
                    }, 1000);
                })
                .catch((err) => {
                    this._counter = setInterval(() => {
                        if(this.state.counter > 1) {
                            this.setState(() => ({
                                success: false,
                                counter: this.state.counter - 1
                            }));
                        } else {
                            this.setState(() => ({success: null}));
                        }
                    }, 1000);
                    console.log(err);
                });
        }
    }

    btnContent = () => {
        const {success} = this.state;

        switch (success) {
            case true:
                return 'Success!';
            case false:
                return 'Something went wrong. Try again?';
            default:
                return 'Update Contact Info';
        }
    }

    componentWillUnmount() {
        clearInterval(this._counter);
    }

    render() {
        const {canSubmit, success} = this.state;
        const {user} = this.props;

        return (
            <div className={styles.container}>
              <Formsy
                  onValidSubmit={this.handleUpdate}
                  onValid={this.enableSubmit}
                  onInvalid={this.disableSubmit}
              >
                  <div className={styles.inputGroup}>
                      <FormInput
                          name="firstName"
                          label="First Name"
                          initialValue={user.firstName || 'First Name'}
                      />
                      <FormInput
                          name="lastName"
                          label="Last Name"
                          initialValue={user.lastName || 'Last Name'}
                      />
                  </div>
                  <div className={styles.inputGroup}>
                      <FormInput
                          type="password"
                          name="password"
                          label="Password"
                          placeholder="***********"
                      />
                      <FormInput
                          type="password"
                          name="password_confirmation"
                          label="Confirm Password"
                          placeholder="***********"
                      />
                  </div>
                  <div className={styles.inputGroup}>
                      <FormInput
                          name="email"
                          label="Email Address"
                          initialValue={user.email || 'Email Address'}
                      />
                      <Button
                          type="submit"
                          layout="fw"
                          disabled={!canSubmit}
                          className={classnames({
                              [styles.success]: success === true,
                              [styles.fail]: success === false
                          })}
                      >
                          {this.btnContent()}
                      </Button>
                  </div>
              </Formsy>
            </div>
        );
    }
}
