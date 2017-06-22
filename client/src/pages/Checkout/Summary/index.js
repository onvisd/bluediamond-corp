import React, {PropTypes} from 'react';

import styles from './styles.module.css';

const Summary = ({price}) => (
    <div className={styles.container}>
        <div className={styles.title}>Summary</div>
        <div className={styles.content}>
            <div className={styles.half}>
                <p>
                    <strong>
                        Subtotal<br />
                        Shipping<br />
                        Tax
                    </strong>
                </p>
            </div>
            <div className={`${styles.half} t--align-right`}>
                <p>
                    ${price.subtotal}<br />
                    ${price.shipping}<br />
                    ${price.tax}
                </p>
            </div>
        </div>
        <div className={`${styles.total} ${styles.content}`}>
            <div className={styles.half}>
                <h3>Total</h3>
            </div>
            <div className={`${styles.half} t--align-right`}>
                <h3 className={styles.orange}>${price.total}</h3>
            </div>
        </div>
    </div>
);

Summary.propTypes = {
    price: PropTypes.object
};

export default Summary;
