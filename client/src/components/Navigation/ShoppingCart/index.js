import React, {Component, PropTypes} from 'react';

import Button from '../../Button';
import ShoppingCartItem from '../../ShoppingCartItem';
import styles from './styles.module.css';

export default class ShoppingCart extends Component {
    static propTypes = {
        children: PropTypes.node,
        onToggle: PropTypes.shape({
            show: PropTypes.func.isRequired,
            hide: PropTypes.func.isRequired
        }).isRequired
    }

    handleRemoveItem = (item) => {
        console.log(`Deleted ${item}`);
    }

    render() {
        const {children, onToggle} = this.props;

        return (
            <div>
                <div className={styles.cart}>
                    <h2>My Shopping Cart</h2>
                    <ShoppingCartItem
                        imageUrl="//images.contentful.com/v50q1scweni9/Ek9LNGNDzMOSAuMWUec8W/3a1ee75aa45299abf727a465f1725f31/6oz_Can_Whole_Natural_Front.png" // eslint-disable-line
                        title="Whole Natural Almonds"
                        description="6 oz can (Case of 12)"
                        quantity={1}
                        price="$34.68"
                        onRemoveItem={() => {
                            this.handleRemoveItem('Whole Natural Almonds');
                        }}
                    />
                    <ShoppingCartItem
                        imageUrl="//images.contentful.com/v50q1scweni9/653q6EnyW4aW2EAcmGgKY0/45ca483ad09f8294646caf492f89c857/4.25oz_Box_Smokehouse_Nut-Thins_Front.png" // eslint-disable-line
                        title="Smokehouse Nut-Thins"
                        description="6 oz box (Case of 12)"
                        quantity={1}
                        price="$28.31"
                        onRemoveItem={() => {
                            this.handleRemoveItem('Smokehouse Nut-Thins');
                        }}
                    />
                    <div className={styles.subtotal}>
                        <h2>Subtotal</h2>
                        <div className={styles.price}>
                            $69.36
                        </div>
                    </div>
                    <div className={styles.checkout}>
                        <Button layout="fw">
                            Checkout
                        </Button>
                        <a
                            className={styles.continue}
                            onClick={() => {
                                onToggle.hide();
                            }}
                        >
                            Continue Shopping
                        </a>
                    </div>
                </div>
                {children}
            </div>
        );
    }
}
