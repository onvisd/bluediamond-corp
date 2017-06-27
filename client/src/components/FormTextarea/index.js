import React, {Component} from 'react';
import Formsy from 'formsy-react';
import classnames from 'classnames';

import styles from './styles.module.css';

@Formsy.Decorator()
export default class FormTextarea extends Component {
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
            getErrorMessage,
            classNames,
            required
        } = this.props;

        return (
            <label
                data-required={required}
                className={
                    classnames(
                        styles.container,
                        classNames.container,
                        {
                            [styles.error]: this.showError()
                        }
                    )
                }
            >
                <div className={classnames(styles.label, classNames.label)}>{label}</div>
                <textarea
                    name={name}
                    onChange={this.changeValue}
                    value={getValue() || ''}
                    required={required}
                ></textarea>
                <span>{getErrorMessage()}</span>
            </label>
        );
    }
}
