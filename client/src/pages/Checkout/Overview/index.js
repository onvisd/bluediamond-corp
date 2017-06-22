import React, {PropTypes} from 'react';

import Cart from '../Cart';
import Button from 'components/Button';

import styles from './styles.module.css';

const Overview = ({active, editShipping, editPayment, clickHandler, products}) => (
    <div className={styles.container}>
        <div className={`${styles.title} ${active && styles.isActive}`}>Order Preview</div>
        <div className={`${styles.contentContainer} ${active && styles.isActive}`}>
            <div className={styles.content}>
                <div className={styles.full}>
                    <p>
                        <strong>
                            Please take a moment to review your shipping info, payment info,
                            and cart summary.
                        </strong>
                    </p>
                </div>
                <div className={styles.half}>
                    <p><strong>Shipping</strong></p>
                    <p>
                        Vince Joy <br />
                        123 Somewhere Lane <br />
                        Place, ST 000000
                    </p>
                    <p>
                        Standard (Arrives )
                    </p>
                    <a href="#" onClick={editShipping} className={styles.edit}>Edit</a>
                </div>
                <div className={styles.half}>
                    <p><strong>Payment</strong></p>
                    <p>
                        Vince Joy <br />
                        123 Somewhere Lane <br />
                        Place, ST 000000
                    </p>
                    <p>
                        Standard (Arrives )
                    </p>
                    <a href="#" onClick={editPayment} className={styles.edit}>Edit</a>
                    <div className={styles.miniCart}>
                        <Cart products={products} />
                    </div>
                </div>
                <div className={`${styles.full} ${styles.submit} t--align-right`}>
                    <Button onClick={clickHandler}>Place Order</Button>
                </div>
            </div>
        </div>
    </div>
);

Overview.propTypes = {
    active: PropTypes.bool.isRequired,
    editShipping: PropTypes.func.isRequired,
    editPayment: PropTypes.func.isRequired,
    clickHandler: PropTypes.func.isRequired,
    products: PropTypes.array
};

export default Overview;
