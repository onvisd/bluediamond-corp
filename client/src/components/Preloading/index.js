import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator} from 'react-responsive-ui';

import styles from './styles.module.css';

@connect((state) => ({pending: state.preload.pending}))
export default class Preloading extends Component {
    render() {
        const {pending} = this.props;
        return (
            <div className={`${styles.preloading} ${pending ? styles.shown : ''}`}>
                <ActivityIndicator />
            </div>
        );
    }
}
