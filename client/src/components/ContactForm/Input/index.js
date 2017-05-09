import React, {Component} from 'react';
import Formsy from 'formsy-react';
import classnames from 'classnames';

import styles from './styles.module.css';

@Formsy.Decorator()
export default class Input extends Component {
    changeValue = (event) => {
        this.props.setValue(event.currentTarget.value);
    }

    showError = () => {
        const {isValid, isPristine} = this.props;

        if(isPristine())
            return false;

        return !isValid();
    }

    render() {
        const {
            name,
            label,
            getValue,
            getErrorMessage
        } = this.props;

        return (
            <label className={classnames(styles.container, {
                [styles.error]: this.showError()
            })}>
                <div className={styles.label}>{label}</div>
                <input
                    type="text"
                    name={name}
                    onChange={this.changeValue}
                    value={getValue() || ''}
                />
                <span>{getErrorMessage()}</span>
            </label>
        );
    }
}
