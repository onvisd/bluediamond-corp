import React, {PropTypes} from 'react';
import moment from 'moment';

import Input from 'components/FormInput';
import Radio from 'components/FormRadio';
import Button from 'components/Button';

import styles from './styles.module.css';

const standard = moment().day(7).format('M/D/YYYY');
const twoDay = moment().day(2).format('M/D/YYYY');
const overnight = moment().day(1).format('M/D/YYYY');

const Shipping = ({active, editThis, clickHandler}) => (
    <div className={styles.container}>
        <div className={`${styles.title} ${active && styles.isActive}`}>
            Shipping
            {!active && <a href="#" onClick={editThis} className={styles.edit}>Edit</a>}
        </div>
        <div className={`${styles.contentContainer} ${active && styles.isActive}`}>
            <div className={styles.content}>
                <div className={styles.half}>
                    <Input
                        name="firstName"
                        label="First Name *"
                        placeholder="Enter your first name"
                        validations="minLength:1"
                        required
                    />
                    <Input
                        name="lastName"
                        label="Last Name *"
                        placeholder="Enter your last name"
                        validations="minLength:1"
                        required
                    />
                </div>
                <div className={styles.half}>
                    <Input
                        name="shippingAddress"
                        label="Address *"
                        placeholder="Address"
                        validations="minLength:1"
                        required
                    />
                    <Input
                        name="shippingAddressTwo"
                        placeholder="Suite, Apt #"
                        validations="minLength:1"
                        required
                    />
                    <Input
                        name="shippingCity"
                        label="City *"
                        placeholder="City"
                        validations="minLength:1"
                        required
                    />
                    <Input
                        name="shippingState"
                        label="State *"
                        placeholder="State"
                        validations="minLength:1"
                        required
                    />
                    <Input
                        name="shippingZipCode"
                        label="Zip Code *"
                        placeholder="Zip Code"
                        validations="minLength:1"
                        required
                    />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.half}>
                    <div className={styles.RadioContainer}>
                        <p><strong>Select Shipping Method:</strong></p>
                        <Radio
                            name="shpping"
                            value="standard"
                            defaultChecked
                            label={`Standard (Arrives by ${standard}) $8.00`}
                        />
                        <Radio
                            name="shpping"
                            value="twoDay"
                            label={`Two Day (Arrives by ${twoDay}) $12.00`}
                        />
                        <Radio
                            name="shpping"
                            value="overnight"
                            label={`Overnight (Arrives by ${overnight}) $24.00`}
                        />
                        <p className={styles.disclose}>
                            <span className={styles.red}>*</span> Required
                        </p>
                    </div>
                </div>
                <div className={`${styles.half} ${styles.alignBottom}`}>
                    <Button onClick={clickHandler}>Continue to Payment</Button>
                </div>
            </div>
        </div>
    </div>
);

Shipping.propTypes = {
    active: PropTypes.bool.isRequired,
    editThis: PropTypes.func.isRequired,
    clickHandler: PropTypes.func.isRequired
};

export default Shipping;
