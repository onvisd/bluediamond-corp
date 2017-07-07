import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Form} from 'formsy-react';
import classnames from 'classnames';

import {updateAddress, deleteAddress} from 'state/auth';

import Button from 'components/Button';
import FormInput from 'components/FormInput';

import styles from './styles.module.css';

@connect(
    null,
    {updateAddress, deleteAddress}
)
export default class EditAddress extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        address: PropTypes.object.isRequired,
        handleCancel: PropTypes.func.isRequired,
        handleDelete: PropTypes.func.isRequired
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

    handleUpdateAddress = (model) => {
        const {id} = this.props.address.node;
        model.id = id;

        this.props.updateAddress(model)
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

    handleDeleteAddress = () => {
        this.props.handleDelete();
        this.props.deleteAddress({id: this.props.address.node.id})
            .then((result) => {
                this.setState(() => ({success: true}));
                return result;
            })
            .catch((err) => {
                this.setState(() => ({success: false}));
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
                return 'Save';
        }
    }

    render() {
        const {canSubmit, success} = this.state;
        const {address, handleCancel} = this.props;

        return (
            <div className={styles.container}>
                <Form
                    onValidSubmit={this.handleUpdateAddress}
                    onValid={this.enableSubmit}
                    onInvalid={this.disableSubmit}
                >
                    <div className={styles.inputGroup}>
                        <FormInput
                            name="firstName"
                            label="First Name"
                            placeholder="First Name"
                            initialValue={address.node.firstName}
                        />
                        <FormInput
                            name="lastName"
                            label="Last Name"
                            placeholder="Last Name"
                            initialValue={address.node.lastName}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <FormInput
                            name="address1"
                            label="Address"
                            initialValue={address.node.address1}
                        />
                        <FormInput
                            name="address2"
                            label="Apt, Suit #"
                            initialValue={address.node.address2}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <FormInput
                            name="city"
                            label="City"
                            initialValue={address.node.city}
                        />
                        <div className={styles.inputGroup}>
                            <FormInput
                                name="province"
                                label="State"
                                initialValue={address.node.province}
                            />
                            <FormInput
                                name="zip"
                                label="Zip Code"
                                initialValue={address.node.zip}
                            />
                        </div>
                    </div>
                    <div className={styles.actions}>
                        <a
                            className={`${styles.action} ${styles.delete}`}
                            onClick={() => this.handleDeleteAddress()}
                        >
                            Delete Address
                        </a>
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
                </Form>
            </div>
        );
    }
}
