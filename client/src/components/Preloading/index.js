import React, {Component} from 'react';
import {connect} from 'react-redux';

import styles from './styles.module.css';

@connect((state) => ({pending: state.preload.pending}))
export default class Preloading extends Component {
    render() {
        const {pending} = this.props;
        return (
            <div className={`${styles.preloading} ${pending ? styles.shown : ''}`}>
                {/* Insert spinner */}
            </div>
        );
    }
}
