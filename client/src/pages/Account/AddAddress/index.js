import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Formsy from 'formsy-react';
import classnames from 'classnames';

import {createAddress} from 'state/auth';

import Button from 'components/Button';
import FormInput from 'components/FormInput';

import styles from './styles.module.css';

@connect(
    null,
    {createAddress}
)
export default class AddAddress extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        handleCancel: PropTypes.func.isRequired
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

    handleCreateAddress = (model) => {
        this.props.createAddress(model)
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

                // Closes the 'Add Address' box upon success.
                this.props.handleCancel();
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

    btnContent = () => {
        const {success} = this.state;

        switch (success) {
            case true:
                return 'Success!';
            case false:
                return 'Something went wrong. Try again?';
            default:
                return 'Add Address';
        }
    }

    render() {
        const {canSubmit, success} = this.state;
        const {handleCancel} = this.props;

        return (
            <div className={styles.container}>
                <Formsy
                    onValidSubmit={this.handleCreateAddress}
                    onValid={this.enableSubmit}
                    onInvalid={this.disableSubmit}
                >
                    <FormInput
                        type="hidden"
                        name="country"
                        value="United States"
                    />
                    <div className={styles.inputGroup}>
                        <FormInput
                            name="firstName"
                            label="First Name"
                            placeholder="First Name"
                        />
                        <FormInput
                            name="lastName"
                            label="Last Name"
                            placeholder="Last Name"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <FormInput
                            name="address1"
                            label="Address"
                        />
                        <FormInput
                            name="address2"
                            label="Apt, Suit #"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <FormInput
                            name="city"
                            label="City"
                        />
                        <div className={styles.inputGroup}>
                            <FormInput
                                name="province"
                                label="State"
                                placeholder="State"
                            />
                            <FormInput
                                name="zip"
                                label="Zip Code"
                                placeholder="Zip Code"
                            />
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <div className={styles.submit}>
                            <a className={styles.action} onClick={handleCancel}>
                                Cancel
                            </a>
                            <Button
                                type="submit"
                                disabled={!canSubmit}
                                className={classnames({
                                    [styles.success]: success === true,
                                    [styles.fail]: success === false
                                })}
                            >
                                {this.btnContent()}
                            </Button>
                        </div>
                    </div>
                </Formsy>
            </div>
        );
    }
}
