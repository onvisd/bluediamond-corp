import React, {Component} from 'react';
import Formsy from 'formsy-react';
import classnames from 'classnames';

import styles from './styles.module.css';

@Formsy.Decorator()
export default class FormInput extends Component {
    static defaultProps = {
        classNames: {
            container: null,
            label: null
        }
    }

    componentWillMount() {
        if(this.props.initialValue)
            this.props.setValue(this.props.initialValue || '');
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
            type,
            placeholder,
            getValue,
            getErrorMessage,
            classNames,
            required,
            autocomplete
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
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={this.changeValue}
                    value={getValue() || ''}
                    required={required}
                    autoComplete={autocomplete}
                />
                <span>{getErrorMessage()}</span>
            </label>
        );
    }
}
