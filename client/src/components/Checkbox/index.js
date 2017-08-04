import React, {Component} from 'react';
import Formsy from 'formsy-react';

import styles from './styles.module.css';

@Formsy.Decorator()
export default class Checkbox extends Component {
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
            checked
        } = this.props;

        return (
            <div className={styles.container}>
                <input
                    type="checkbox"
                    name={name}
                    checked={checked || getValue() || false}
                    onChange={this.changeValue}
                    className={styles.checkbox}
                />
                <span className="t--size-xs c--blue-darker">
                    {label}
                </span>
            </div>
        );
    }
}
