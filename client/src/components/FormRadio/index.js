import React, {Component} from 'react';
import Formsy from 'formsy-react';

import styles from './styles.module.css';

@Formsy.Decorator()
export default class FormRadio extends Component {
    componentDidMount() {
        this.props.setValue(this.props.defaultChecked || false);
    }

    changeValue = (event) => {
        this.props.setValue(event.currentTarget.checked);
    }

    render() {
        const {
            name,
            label,
            getValue,
            value
        } = this.props;

        return (
            <div className={styles.container}>
                <input
                    type="radio"
                    name={name}
                    value={value || null}
                    checked={getValue() || false}
                    onChange={this.changeValue}
                    className={styles.radio}
                />
                <span className="t--size-xs c--blue-darker">
                    {label}
                </span>
            </div>
        );
    }
}
