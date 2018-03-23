import React, {Component} from 'react';
import {withFormsy} from 'formsy-react';
import classnames from 'classnames';

import styles from './styles.module.css';

class FormTextarea extends Component {
    static defaultProps = {
        classNames: {}
    }

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
            required,
            placeholder
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
                {label &&
                    <div className={classnames(styles.label, classNames.label)}>{label}</div>
                }
                <textarea
                    name={name}
                    onChange={this.changeValue}
                    value={getValue() || ''}
                    required={required}
                    placeholder={placeholder}
                ></textarea>
                <span>{getErrorMessage()}</span>
            </label>
        );
    }
}

export default withFormsy(FormTextarea);
