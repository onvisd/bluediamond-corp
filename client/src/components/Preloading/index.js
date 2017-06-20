import React, {Component} from 'react';
import classNames from 'classnames';
import {connect} from 'react-redux';

import styles from './styles.module.css';

@connect((state) => ({pending: state.preload.pending}))
export default class Preloading extends Component {
    render() {
        const {pending} = this.props;
        return (
            <div className={classNames(
                styles.preloading,
                pending ? styles.shown : styles.done
            )}>
                <div className={styles.bar} />
            </div>
        );
    }
}
