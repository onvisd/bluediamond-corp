import React, {PropTypes} from 'react';

import Input from 'components/FormInput';
import Select from 'components/FormSelect';
import Checkbox from 'components/Checkbox';
import Radio from 'components/FormRadio';
import Button from 'components/Button';

import styles from './styles.module.css';

const cardTypes = [
    'Visa',
    'Mastercard'
];

const months = [
    'Month',
    'January'
];

const years = [
    'Year',
    '2017'
];

const Payment = ({active, editThis, clickHandler}) => (
    <div className={styles.container}>
        <div className={`${styles.title} ${active && styles.isActive}`}>
            Payment
            {!active && <a href="#" onClick={editThis} className={styles.edit}>Edit</a>}
        </div>
        <div className={`${styles.contentContainer} ${active && styles.isActive}`}>
            <div className={styles.content}>
                <div className={styles.half}>
                    <div className={styles.checkboxContainer}>
                        <p><strong>Payment Method</strong></p>
                        <div className={styles.multiInput}>
                            <Radio
                                name="method"
                                value="credit"
                                label="Credit / Debit"
                            />
                            <Radio
                                name="method"
                                value="paypal"
                                label="PayPal"
                            />
                        </div>
                    </div>
                    <Select
                        name="cardType"
                        label="Card Type *"
                        options={cardTypes}
                    />
                    <Input
                        name="cardNumber"
                        label="Card Number *"
                        validations="minLength:1"
                        required
                    />
                    <div className={styles.multiInput}>
                        <div className={styles.half}>
                            <Select
                                name="experationMonth"
                                label="Experation Date *"
                                options={months}
                            />
                        </div>
                        <div className={styles.half}>
                            <Select
                                name="experationYear"
                                options={years}
                            />
                        </div>
                    </div>
                    <Input
                        name="securityCode"
                        label="Security Code*"
                        validations="minLength:1"
                        required
                    />
                </div>
                <div className={styles.half}>
                    <div className={styles.checkboxContainer}>
                        <p><strong>Billing Address</strong></p>
                        <Checkbox
                            name="billingIsShipping"
                            label="Same as shipping address"
                        />
                    </div>
                    <Input
                        name="billingAddress"
                        label="Address *"
                        placeholder="Address"
                        validations="minLength:1"
                        required
                    />
                    <Input
                        name="billingAddressTwo"
                        placeholder="Suite, Apt #"
                        validations="minLength:1"
                        required
                    />
                    <Input
                        name="billingCity"
                        label="City *"
                        placeholder="City"
                        validations="minLength:1"
                        required
                    />
                    <Input
                        name="billingState"
                        label="State *"
                        placeholder="State"
                        validations="minLength:1"
                        required
                    />
                    <Input
                        name="billingZipCode"
                        label="Zip Code *"
                        placeholder="Zip Code"
                        validations="minLength:1"
                        required
                    />
                </div>
            </div>
            <div className={`${styles.content} ${styles.isLast}`}>
                <div className={styles.half}>
                    <div className={styles.checkboxContainer}>
                        <p className={styles.disclose}>
                            <span className={styles.red}>*</span>Required
                        </p>
                    </div>
                </div>
                <div className={`${styles.half} t--align-right`}>
                    <Button onClick={clickHandler}>Continue to Order Preview</Button>
                </div>
            </div>
        </div>
    </div>
);

Payment.propTypes = {
    active: PropTypes.bool.isRequired,
    editThis: PropTypes.func.isRequired,
    clickHandler: PropTypes.func.isRequired
};

export default Payment;
