import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {redirect} from 'react-isomorphic-render';

import Button from 'components/Button';
import Panel from '../Panel';
import Address from '../Address';
import UpdateInfo from '../UpdateInfo';
import EditAddress from '../EditAddress';
import AddAddress from '../AddAddress';
import {signoutCustomer} from 'state/auth';

import styles from './styles.module.css';

@connect(
    null,
    {signoutCustomer}
)
export default class Settings extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    state = {
        editingAddress: false,
        selectedAddress: null,
        addingAddress: false
    }

    editAddress = (idx) => {
        this.setState(() => ({
            editingAddress: true,
            selectedAddress: idx
        }));
    }

    cancelEdit = () => {
        this.setState(() => ({
            editingAddress: false,
            selectedAddress: null
        }));
    }

    deleteAddress = () => {
        this.setState(() => ({
            editingAddress: false,
            selectedAddress: null,
            addingAddress: false
        }));
    }

    addAddress = () => {
        this.setState(() => ({addingAddress: true}));
    }

    cancelAdd = () => {
        this.setState(() => ({addingAddress: false}));
    }

    handleSignOut = () => {
        this.props.signoutCustomer();
        redirect('/store');
    }

    render() {
        const {editingAddress, selectedAddress, addingAddress} = this.state;
        const user = this.props.auth.data;
        const addresses = user.addresses.edges;

        return (
            <div className={styles.container}>
                <Panel title="Contact Information">
                    <UpdateInfo user={user} />
                </Panel>
                <Panel title="Shipping Addresses">
                    <div className={styles.addresses}>
                        {addresses.map((address, idx) => (
                            <Address
                                key={`address${idx}`}
                                address={address}
                                idx={idx}
                                editingAddress={editingAddress}
                                handleClick={() => this.editAddress(idx)}
                            />
                        ))}
                    </div>
                    {addresses.map((address, idx) => {
                        if(editingAddress && (selectedAddress === idx)) {
                            return (
                              <EditAddress
                                  key={`editAddress${idx}`}
                                  user={user}
                                  address={address}
                                  handleCancel={() => this.cancelEdit()}
                                  handleDelete={() => this.deleteAddress()}
                              />
                            );
                        }
                    })}
                    {(!editingAddress && !addingAddress) &&
                        <a className={styles.action} onClick={() => this.addAddress()}>
                            Add New Address
                        </a>
                    }
                    {(!editingAddress && addingAddress) &&
                        <AddAddress
                            user={user}
                            handleCancel={() => this.cancelAdd()}
                        />
                    }
                </Panel>
                <Button onClick={this.handleSignOut}>Sign out</Button>
            </div>
        );
    }
}
