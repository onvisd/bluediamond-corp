import React, {Component, PropTypes} from 'react';
import styles from './styles.module.css';

export default class Quantity extends Component {
    state = {
        value: 1
    };

    static propTypes = {
        handleChange: PropTypes.func || this.onChange
    }

    onDecrement = () => {
        if(this.state.value <= 0) return;

        this.setState((state) => ({
            value: --state.value
        }));
    }

    onIncrement = () => {
        this.setState((state) => ({
            value: ++state.value
        }));
    }

    onChange = (e) => {
        e.persist();

        this.setState(() => ({
            value: e.target.value
        }));
    }

    render() {
        const {value} = this.state;
        const {handleChange} = this.props;

        return (
            <div className={styles.container}>
                Quantity
                <div className={styles.input}>
                    <div className={styles.quantity}>
                        <input
                            onChange={handleChange}
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
