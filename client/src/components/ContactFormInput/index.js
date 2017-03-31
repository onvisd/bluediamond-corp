import React, {Component} from 'react';
import Formsy from 'formsy-react';
import classnames from 'classnames';

// import styles from './styles.module.css';

@Formsy.Decorator()
export default class ContactFormInput extends Component {
    constructor() {
        super();

        this.changeValue = this.changeValue.bind(this);
        this.showError = this.showError.bind(this);
    }

    changeValue(event) {
        this.props.setValue(event.currentTarget.value);
    }

    showError() {
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
            showRequired,
            getErrorMessage
        } = this.props;

        return (
            <label className={classnames({
                required: showRequired(),
                error: this.showError()
            })}>
                <div>{label}</div>
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
