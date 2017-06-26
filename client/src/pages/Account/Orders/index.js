import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import Panel from '../Panel';
import styles from './styles.module.css';

export default class Orders extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const user = this.props.auth.data;

        const lastOrder = user.orders.edges[0].node;
        const lineItems = lastOrder.lineItems.edges;

        const orders = user.orders.edges.slice(1);

        const format = (date) => moment(date).format('MMMM D, YYYY');

        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <Panel title="Current Order">
                        <p className={styles.title}>Order Information</p>
                        {lastOrder &&
                            <div>
                                <div className={styles.orderInfo}>
                                    <div className={styles.left}>
                                        <p><strong>Order Date : </strong> {format(lastOrder.processedAt)}</p>
                                        <p><strong>Order Number :</strong> {lastOrder.orderNumber}</p>
                                    </div>
                                    <div className={styles.right}>
                                        <p><strong>Estimated Delivery Date : </strong></p>
                                        <p><strong>Tracking Number : </strong></p>
                                    </div>
                                </div>
                                <div className={styles.orderLineItems}>
                                    <p className={styles.title}>Order Summary</p>
                                    {lineItems.map((item, i) =>
                                        <div key={`item${i}`}>
                                            <div className={styles.item}>
                                                <div className={styles.itemInfo}>
                                                    <p>
                                                        <strong>{item.node.title}</strong><br />
                                                        Attributes
                                                    </p>
                                                </div>
                                                <div className={styles.itemQuantity}>
                                                    <p>
                                                        <strong>Quantity</strong><br />
                                                        {item.node.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className={styles.orderTotal}>
                                    <p>Final Total</p>
                                    <h3>${lastOrder.totalPrice}</h3>
                                </div>
                            </div>
                        }
                        {!lastOrder && <p>No current orders.</p>}
                    </Panel>
                </div>
                <div className={styles.sidebar}>
                    <Panel title="Order History">
                        {orders.length > 0 && orders.map((order) =>
                            <div key={order.orderNumber} className={styles.tinyOrder}>
                                <p>
                                    <strong>Order #{order.orderNumber}</strong> <br/>
                                    Delivered on {format(order.processedAt)} <br />
                                    <strong>Total:</strong> ${order.totalPrice}
                                </p>
                            </div>
                        )}
                        {orders.length <= 0 && <p className={styles.title}>No archived orders.</p>}
                    </Panel>
                </div>
            </div>
        );
    }
}
