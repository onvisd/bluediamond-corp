import React, {PropTypes} from 'react';
import styles from './styles.module.css';

import Close from '../../../assets/images/icons/close.svg';

const ShoppingCartItem = ({
    imageUrl,
    title,
    description,
    quantity,
    price,
    onRemoveItem
}) => (
    <div className={styles.card}>
        <div className={styles.image}>
            <img src={imageUrl} alt={title} />
        </div>
        <div className={styles.info}>
            <h3 className={styles.title}>
                {title}
            </h3>
            {description}<br />
            Qty: {quantity}
            <div className={styles.row}>
                <p className={styles.price}>
                    ${price}
                </p>
            </div>
            <a className={styles.remove} onClick={onRemoveItem}>
                Remove
            </a>
        </div>
        <div className={styles.delete}>
            <Close onClick={() => onRemoveItem(this.props)} />
        </div>
    </div>
);

ShoppingCartItem.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    onRemoveItem: PropTypes.func.isRequired
};

export default ShoppingCartItem;
