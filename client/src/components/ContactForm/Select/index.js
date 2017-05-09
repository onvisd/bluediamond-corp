import React, {Component} from 'react';
import Formsy from 'formsy-react';
import classnames from 'classnames';

import styles from './styles.module.css';

@Formsy.Decorator()
export default class Select extends Component {
    componentDidMount() {
        this.props.setValue('No subject');
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
            options,
            getValue,
            showRequired,
            getErrorMessage
        } = this.props;

        return (
            <label className={classnames(styles.container, {
                required: showRequired(),
                error: this.showError()
            })}>
                <div className={styles.label}>{label}</div>
                <div className={styles.selectWrap}>
                    <select name={name} onChange={this.changeValue} value={getValue() || 'No subject'}>
                        <option value="No subject">Please select one...</option>
                        {options.map((option) => (
                            <option value={option} key={option}>{option}</option>
                        ))}
                    </select>
                </div>
                <span>{getErrorMessage()}</span>
            </label>
        );
    }
}
