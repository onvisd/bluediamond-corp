import React, {Component, PropTypes} from 'react';
import styles from './styles.module.css';

export default class Quantity extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired
    }

    state = {
        value: 1
    };

    onDecrement = () => {
        if(this.state.value <= 1) return;

        this.setState((state) => ({
            value: --state.value
        }), () => {
            this.props.onChange(this.state.value);
        });
    }

    onIncrement = () => {
        this.setState((state) => ({
            value: ++state.value
        }), () => {
            this.props.onChange(this.state.value);
        });
    }

    handleChange = (e) => {
        e.persist();

        this.setState(() => ({
            value: e.target.value
        }), () => {
            this.props.onChange(this.state.value);
        });
    }

    handleValidation = (e) => {
        const target = e.target;
        const wholeValue = Math.floor(target.value);

        let value = target.value;

        if(value <= 0)
            value = 1;

        else if(value !== wholeValue)
            value = wholeValue;

        this.setState(() => ({
            value
        }));
    }

    render() {
        const {value} = this.state;

        return (
            <div className={styles.container}>
                Qty
                <div className={styles.input}>
                    <div className={styles.quantity}>
                        <input
                            onChange={this.handleChange}
                            onKeyPress={this.handleChange}
                            onBlur={this.handleValidation}
                            min="1"
                            type="number"
                            value={value}
                        />
                    </div>
                    <div className={styles.controls}>
                        <span
                            className={styles.increment}
                            onClick={this.onIncrement}
                            onTouchStart={this.onIncrement}>
                        </span>
                        <span
                            className={styles.decrement}
                            onClick={this.onDecrement}
                            onTouchStart={this.onDecrement}>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
