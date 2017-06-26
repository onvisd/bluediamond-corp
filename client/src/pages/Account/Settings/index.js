import React, {Component, PropTypes} from 'react';
import {Form} from 'formsy-react';
import classnames from 'classnames';

import Button from 'components/Button';
import FormInput from 'components/FormInput';
import Panel from '../Panel';
import styles from './styles.module.css';

export default class Settings extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    state = {
        view: 'signin',
        canSubmit: false,
        editingAddress: [false]
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

    editAddress = (idx) => {
        this.setState(() => ({editingAddress: [true, idx]}));
    }

    cancelEdit = () => {
        this.setState(() => ({editingAddress: [false]}));
    }

    handleSignIn = (model) => {
        console.log(model);
    }

    render() {
        const {editingAddress} = this.state;
        const user = this.props.auth.data;
        const addresses = user.addresses.edges;

        console.log(user);

        return (
            <div className={styles.container}>
                <Panel title="Contact Information">
                    <Form>
                        <div className={styles.inputGroup}>
                            <FormInput
                                name="first_name"
                                label="First Name"
                                placeholder={user.lastName ? user.firstName : 'First Name'}
                            />
                            <FormInput
                                name="last_name"
                                label="Last Name"
                                placeholder={user.lastName ? user.lastName : 'Last Name'}
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
                                placeholder={user.email ? user.email : 'Email Address'}
                            />
                            <Button type="submit" layout="fw">
                                Update Contact Info
                            </Button>
                        </div>
                    </Form>
                </Panel>
                <Panel title="Shipping Addresses">
                    <div className={styles.addresses}>
                        {addresses.map((address, idx) => (
                            <div
                                className={classnames(styles.address, {
                                    [styles.editing]: editingAddress[1] === idx,
                                    [styles.hidden]:
                                        editingAddress[1] !== undefined && // eslint-disable-line
                                        editingAddress[1] !== idx
                                })}
                                key={address.node.address1}
                            >
                                <span className={styles.name}>
                                    {address.node.firstName} {address.node.lastName}
                                </span><br />
                                {address.node.address1}<br />
                                {address.node.city}, {address.node.provinceCode} {address.node.zip}<br />
                                {!editingAddress[0] && (
                                    <a
                                        className={styles.edit}
                                        onClick={() => {
                                            this.editAddress(idx);
                                        }}
                                    >
                                        Edit
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                    {editingAddress[0] ? (
                        <Form>
                            <div className={styles.inputGroup}>
                                <FormInput
                                    name="first_name"
                                    label="First Name"
                                    placeholder="First Name"
                                    initialValue={addresses[editingAddress[1]].firstName}
                                />
                                <FormInput
                                    name="last_name"
                                    label="Last Name"
                                    placeholder="Last Name"
                                    initialValue={addresses[editingAddress[1]].lastName}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <FormInput
                                    name="address1"
                                    label="Address Field One"
                                    placeholder="Address Field One"
                                    initialValue={addresses[editingAddress[1]].address1}
                                />
                                <FormInput
                                    name="address2"
                                    label="Address Field Two"
                                    placeholder="Address Field Two"
                                    initialValue={addresses[editingAddress[1]].address2}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <FormInput
                                    name="city"
                                    label="City"
                                    placeholder="City"
                                    initialValue={addresses[editingAddress[1]].city}
                                />
                                <div className={styles.inputGroup}>
                                    <FormInput
                                        name="province_code"
                                        label="State"
                                        placeholder="State"
                                        initialValue={
                                            addresses[editingAddress[1]].provinceCode}
                                    />
                                    <FormInput
                                        name="zip"
                                        label="Zip Code"
                                        placeholder="Zip Code"
                                        initialValue={addresses[editingAddress[1]].zip}
                                    />
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <a
                                    className={`${styles.action} ${styles.delete}`}
                                    onClick={() => {
                                        this.deleteAddress(editingAddress[1]);
                                    }}
                                >
                                    Delete Address
                                </a>
                                <div className={styles.submit}>
                                    <a className={styles.action} onClick={this.cancelEdit}>
                                        Cancel
                                    </a>
                                    <Button>
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    ) : (
                        <a className={styles.action}>
                            Add New Address
                        </a>
                    )}
                </Panel>
            </div>
        );
    }
}
