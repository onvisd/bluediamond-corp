import React, {Component} from 'react';
import {Form} from 'formsy-react';
import classnames from 'classnames';

import Button from 'components/Button';
import FormInput from 'components/FormInput';
import Panel from '../Panel';
import styles from './styles.module.css';

/* eslint-disable camelcase */
const addresses = [
    {
        first_name: 'John',
        last_name: 'Doe',
        address1: '12345 Example Dr.',
        city: 'Chicopee',
        province_code: 'MA',
        zip: '01020'
    },
    {
        first_name: 'Jane',
        last_name: 'Doe',
        address1: '421 Test Ln.',
        city: 'San Francisco',
        province_code: 'CA',
        zip: '95321'
    }
];
/* eslint-enable camelcase */

export default class Settings extends Component {
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

        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <Panel title="Contact Information">
                        <Form>
                            <div className={styles.inputGroup}>
                                <FormInput
                                    name="first_name"
                                    label="First Name"
                                    placeholder="First Name"
                                />
                                <FormInput
                                    name="last_name"
                                    label="Last Name"
                                    placeholder="Last Name"
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
                                    placeholder="Email Address"
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
                                    key={address.address1}
                                >
                                    <span className={styles.name}>
                                        {address.first_name} {address.last_name}
                                    </span><br />
                                    {address.address1}<br />
                                    {address.city}, {address.province_code} {address.zip}<br />
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
                                        initialValue={addresses[editingAddress[1]].first_name}
                                    />
                                    <FormInput
                                        name="last_name"
                                        label="Last Name"
                                        placeholder="Last Name"
                                        initialValue={addresses[editingAddress[1]].last_name}
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
                                                addresses[editingAddress[1]].province_code}
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
                <div className={styles.sidebar}>
                    <Panel title="Gift Certificate">
                        <div className={styles.giftCardInfo}>
                            <span className={styles.title}>Total Amount: </span>
                            <span className={styles.value}>$0.00</span>
                        </div>
                        <Form className={styles.giftCardCheck}>
                            <FormInput
                                name="gift_card_code"
                                label="Check Giftcard Balance"
                                placeholder="Enter Code (xxxx-xxxx-xxxx)"
                            />
                            <Button type="submit" layout="fw">
                                Check Balance
                            </Button>
                        </Form>
                    </Panel>
                </div>
            </div>
        );
    }
}
