import React, {Component} from 'react';
import Formsy from 'formsy-react';
import classnames from 'classnames';

import styles from './styles.module.css';

@Formsy.Decorator()
export default class FormSelect extends Component {
    static defaultProps = {
        classNames: {
            container: null,
            label: null
        }
    }

    componentWillMount() {
        this.props.setValue(this.props.value || '');
    }

    changeValue = (event) => {
        this.props.setValue(event.currentTarget.value);

        if(this.props.onChange)
            this.props.onChange(event.currentTarget.value);
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
            options,
            getValue,
            showRequired,
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
                            required: showRequired(),
                            error: this.showError()
                        }
                    )
                }
            >
                <div className={classnames(classNames.label, styles.label)}>{label}</div>
                <div className={styles.selectWrap}>
                    <select
                        name={name}
                        onChange={this.changeValue}
                        value={getValue()}
                        required={required}
                    >
                        <option value="" disabled>Please select one...</option>
                        {options.map((option) => (
                            <option
                                value={option}
                                key={option}
                            >
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <span>{getErrorMessage()}</span>
            </label>
        );
    }
}
