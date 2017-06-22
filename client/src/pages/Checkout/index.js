import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Title} from 'react-isomorphic-render';
import {Form} from 'formsy-react';

import styles from './styles.module.css';

import Summary from './Summary';
import Cart from './Cart';
import Shipping from './Shipping';
import Payment from './Payment';
import Overview from './Overview';

// Mock Data
const price = {
    subtotal: '69.36',
    shipping: '8.00',
    tax: '4.20',
    total: '81.56'
};

// Mock Data
const products = [
    {
        title: 'Product Name',
        size: '6 oz can (Case of 12)',
        qty: 1,
        price: '34.68'
    },
    {
        title: 'Product Name #2',
        size: '6 oz can (Case of 12)',
        qty: 1,
        price: '34.68'
    }
];

@connect(
    (state) => ({
        responsive: state.responsive
    })
)
export default class Checkout extends Component {
    state = {
        canSubmit: false,
        activePanel: 'shipping'
    };

    enableSubmit = () => {
        this.setState({
            canSubmit: true
        });
    }

    disableSubmit = () => {
        this.setState({
            canSubmit: false
        });
    }

    submit(model) {
        axios.post('/api/checkout', {
            firstName: model.firstName,
            lastName: model.lastName
        })
        .then(() => {
            console.log('Checkout Successful!');
        })
        .catch((err) => {
            console.log('Something went wrong, please try again!', err);
        });
    }

    handleClick = (space, e) => {
        e.preventDefault();

        this.setState(() => ({
            activePanel: space
        }));
    }

    isActive = (space) => {
        const {activePanel} = this.state;
        return activePanel === space;
    }

    render() {
        const {responsive} = this.props;
        const productCount = products.length;

        let sidebar = (
            <div className={styles.right}>
                <Summary price={price} />
                <Cart products={products} />
            </div>
        );

        let cartOverview = (
            <div className={styles.cartOverview}>
              <p>
                  {productCount} {productCount === 1 ? 'item' : 'items'}
                  <span className={styles.orange}>${price.total}</span>
              </p>
            </div>
        );

        if(responsive.small !== undefined && responsive.small) { // eslint-disable-line
            sidebar = null;
        }

        if(responsive.small !== undefined && !responsive.small) { // eslint-disable-line
            cartOverview = null;
        }

        return (
            <section className="content">
                <Title>Checkout</Title>
                <div className={styles.container}>
                  <h1>Checkout</h1>
                  {cartOverview}
                  <div className={styles.row}>
                    <div className={styles.left}>
                        <Form
                            onValidSubmit={this.submit}
                            onValid={this.enableSubmit}
                            onInvalid={this.disableSubmit}
                        >
                            <Shipping
                                active={this.isActive('shipping')}
                                editThis={(e) => this.handleClick('shipping', e)}
                                clickHandler={(e) => this.handleClick('payment', e)}
                            />
                            <Payment
                                active={this.isActive('payment')}
                                editThis={(e) => this.handleClick('payment', e)}
                                clickHandler={(e) => this.handleClick('overview', e)}
                            />
                            <Overview
                                active={this.isActive('overview')}
                                editShipping={(e) => this.handleClick('shipping', e)}
                                editPayment={(e) => this.handleClick('payment', e)}
                                clickHandler={this.submit}
                                products={products}
                            />
                        </Form>
                    </div>
                    {sidebar}
                  </div>
                </div>
            </section>
        );
    }
}
