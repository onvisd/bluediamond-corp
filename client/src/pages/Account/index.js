import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {pushLocation} from 'react-isomorphic-render';
import classnames from 'classnames';

import Orders from './Orders';
import Settings from './Settings';
import styles from './styles.module.css';

@withRouter
export default class Account extends Component {

    updateView = (path) => {
        pushLocation({pathname: `/account/${path}`}, this.props.router);
    }

    render() {
        const {view} = this.props.params;

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
                        {view === 'orders' && <Orders />}
                        {view === 'settings' && <Settings />}
                    </div>
                </div>
            </div>
        );
    }
}
