import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {redirect, pushLocation} from 'react-isomorphic-render';
import classnames from 'classnames';

import {connector as authConnector} from 'state/auth';

import Orders from './Orders';
import Settings from './Settings';
import styles from './styles.module.css';

@withRouter
@connect(
    (state) => ({...authConnector(state.auth)}),
    {redirect}
)
export default class Account extends Component {
    updateView = (path) => {
        pushLocation({pathname: `/account/${path}`}, this.props.router);
    }

    render() {
        const {view} = this.props.params;
        const {auth, redirect} = this.props; // eslint-disable-line no-shadow

        if(!auth || !auth.data) {
            redirect('/store');
            return (<div />);
        }

        return (
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <h1 className={styles.title}>My Account</h1>
                    <div className={styles.tabs}>
                        <button
                            className={classnames(styles.tab, {
                                [styles.active]: view === 'orders'
                            })}
                            onClick={() => {
                                this.updateView('orders');
                            }}
                        >
                            Orders
                        </button>
                        <button
                            className={classnames(styles.tab, {
                                [styles.active]: view === 'settings'
                            })}
                            onClick={() => {
                                this.updateView('settings');
                            }}
                        >
                            Settings
                        </button>
                    </div>
                    <div className={styles.panel}>
                        {view === 'orders' && <Orders auth={auth} />}
                        {view === 'settings' && <Settings auth={auth} />}
                    </div>
                </div>
            </div>
        );
    }
}
