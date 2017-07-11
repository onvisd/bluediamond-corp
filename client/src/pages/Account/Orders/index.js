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
        const allOrders = user.orders;

        let lastOrder = null;
        let lineItems = [];
        let oldOrders = [];

        if(allOrders.edges.length) lastOrder = allOrders.edges[0].node;
        if(allOrders.edges.length) oldOrders = allOrders.edges.slice(1);
        if(lastOrder) lineItems = lastOrder.lineItems.edges;

        const format = (date) => moment(date).format('MMMM D, YYYY');

        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <Panel title="Current Order">
                        {lastOrder
                            ? (<div>
                                <p className={styles.title}>Order Information</p>
                                <div className={styles.orderInfo}>
                                    <div className={styles.left}>
                                        <p><strong>Order Date : </strong> {format(lastOrder.processedAt)}</p>
                                    </div>
                                    <div className={styles.right}>
                                        <p><strong>Order Number :</strong> {lastOrder.orderNumber}</p>
                                    </div>
                                </div>
                                <div className={styles.orderLineItems}>
                                    <p className={styles.title}>Order Summary</p>
                                    {lineItems.map((item, i) =>
                                        <div key={`item${i}`}>
                                            <div className={styles.item}>
                                                {item.node.variant.image &&
                                                    (<div className={styles.itemImage}>
                                                        <img src={item.node.variant.image.src} />
                                                    </div>)}
                                                <div className={styles.itemInfo}>
                                                    <p>
                                                        <strong>{item.node.title}</strong><br />
                                                        {item.node.variant.title}
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
                            </div>)
                            : <p>No current orders.</p>}
                    </Panel>
                </div>
                <div className={styles.sidebar}>
                    <Panel title="Order History">
                          {oldOrders.length > 0 &&
                              oldOrders.map((order) =>
                                  <div key={order.node.orderNumber} className={styles.tinyOrder}>
                                      <p>
                                          <strong>Order #{order.node.orderNumber}</strong> <br/>
                                          Delivered on {format(order.node.processedAt)} <br />
                                          <strong>Total:</strong> ${order.node.totalPrice}
                                      </p>
                                  </div>
                              )
                        }
                        {!oldOrders.length &&
                            <p className={styles.title}>No archived orders.</p>
                        }
                    </Panel>
                </div>
            </div>
        );
    }
}
