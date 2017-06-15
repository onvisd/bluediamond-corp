import React, {Component} from 'react';
import {Title} from 'react-isomorphic-render';

import styles from './styles.module.css';

export default class CheckoutConfirmation extends Component {
    render() {
        return (
            <section className="content">
                <Title>Checkout Confirmation</Title>
                <div className={styles.container}>
                    <h1>Success!</h1>
                    <div className={styles.content}>
                        <div className={styles.half}>
                            <p><strong>Order #123456789</strong></p>
                            <p>Thank You [Customer Name]. Your order has been received and we're processing it now. A receipt has been e-mailed to [Customer E-Mail Address]. When your order is shipped, we'll send you a confirmation e-mail.</p>
                        </div>
                        <div className={styles.half}>
                            <p>Mini Cart</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
