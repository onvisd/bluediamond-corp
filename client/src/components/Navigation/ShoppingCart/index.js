import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Formsy from 'formsy-react';
import {Link} from 'react-isomorphic-render';

import {connector, addAttribute, removeFromCart} from 'state/checkout';

import Button from 'components/Button';
import Textarea from 'components/FormTextarea';
import Checkbox from 'components/Checkbox';
import ShoppingCartItem from 'components/ShoppingCartItem';

import styles from './styles.module.css';

@connect(
    (state) => ({...connector(state.checkout)}),
    {addAttribute, removeFromCart}
)
export default class ShoppingCart extends Component {
    static propTypes = {
        children: PropTypes.node,
        checkout: PropTypes.object,
        onToggle: PropTypes.shape({
            show: PropTypes.func.isRequired,
            hide: PropTypes.func.isRequired
        }).isRequired,
        auth: PropTypes.object
    }

    state = {
        note: false
    };

    handleRemoveItem = (item) => {
        this.props.removeFromCart({checkoutId: this.props.checkout.id, lineItemIds: [item.id]});

        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'interaction',
                action: 'expand',
                label: item.title
            });
        }
    }

    handleToggleNote = () => {
        this.setState({
            note: !this.state.note
        });

        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'interaction',
                action: 'click',
                label: 'This is a gift'
            });
        }
    }

    handleGoToCheckout = (data) => {
        const {note} = this.state;
        const {checkout, auth} = this.props;
        const checkoutLink = auth ? `${checkout.webUrl}&auth=true` : checkout.webUrl;

        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'interaction',
                action: 'click',
                label: 'Checkout'
            });

            window.dataLayer.push({
                event: 'checkout'
            });
        }

        if(!note || !data)
            return window.location.assign(checkoutLink);

        const info = {
            checkoutId: this.props.checkout.id,
            attributes: {
                note: data.note,
                customAttributes: [{
                    key: 'Gift?',
                    value: 'True'
                }]
            }
        };

        this.props.addAttribute(info).then(() => window.location.assign(checkoutLink));
    }

    getImageUrl = (variant) => {
        if(!variant.image && !variant.product)
            return '';

        if(!variant.image)
            return variant.product.images.edges[0].node.src;

        return variant.image.src;
    }

    render() {
        const {note} = this.state;
        const {children, checkout, onToggle} = this.props;

        return (
            <div>
                <div className={styles.cart}>
                    {(!checkout.orderStatusUrl) &&
                      (checkout.lineItems && checkout.lineItems.edges.length) ? (
                        <div>
                            <h2>My Shopping Cart</h2>
                            {checkout.lineItems &&
                                checkout.lineItems.edges.map(({node: lineItem}) => (
                                <ShoppingCartItem
                                    key={lineItem.id}
                                    imageUrl={this.getImageUrl(lineItem.variant)}
                                    title={lineItem.title}
                                    description={lineItem.variant.title}
                                    quantity={lineItem.quantity}
                                    price={lineItem.variant.price}
                                    onRemoveItem={() => {
                                        this.handleRemoveItem(lineItem);
                                    }}
                                />
                            ))}
                            <div className={styles.subtotal}>
                                <h2>Subtotal</h2>
                                <div className={styles.price}>
                                    ${checkout.subtotalPrice}
                                </div>
                            </div>
                            <Formsy
                                onValidSubmit={this.handleGoToCheckout}
                                className={styles.form}
                                ref={(form) => {
                                    this.form = form;
                                }}
                            >
                              <div className={styles.gift}>
                                  <div
                                    className={styles.isGift}
                                    onClick={() => this.handleToggleNote()}
                                  >
                                    <Checkbox
                                        name="gift"
                                        label="This is a gift"
                                        checked={note}
                                    />
                                  </div>
                                  <div className={`
                                    ${styles.message}
                                    ${note ? ` ${styles.open}` : null}
                                  `}>
                                    <Textarea
                                        name="note"
                                        lable="Gift Message (optional)"
                                        value="Hi, enjoy your gift!"
                                    />
                                  </div>
                              </div>
                              <div className={styles.checkout}>
                                  <Button layout="fw" type="submit">
                                      Checkout
                                  </Button>
                                  <Link
                                      className={styles.continue}
                                      href="/store"
                                      onClick={() => {
                                          onToggle.hide();
                                      }}
                                  >
                                      Continue Shopping
                                  </Link>
                              </div>
                            </Formsy>
                            {children}
                        </div>
                    ) : 'Your shopping cart is empty'}
                </div>
            </div>
        );
    }
}
