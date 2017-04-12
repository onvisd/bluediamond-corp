import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-isomorphic-render';

import styles from './styles.module.css';

@connect((state) => ({
    responsive: state.responsive
}))
export default class CompanyNavigation extends Component {
    render() {
        const {responsive} = this.props;

        return (
            <div className={styles.container}>
                <ul className={styles.tabs}>
                    <li className={styles.tab}>
                        <Link className={styles.title} to="/company/coop">Co-op Manifesto</Link>
                        {!responsive.small && (
                            <span>Lorem ipsum dolor sit amet.</span>
                        )}
                    </li>
                    <li className={styles.tab}>
                        <Link className={styles.title} to="/company/craft">Our Craft</Link>
                        {!responsive.small && (
                            <span>Lorem ipsum dolor sit amet.</span>
                        )}
                    </li>
                    <li className={styles.tab}>
                        <Link className={styles.title} to="/company/history">Our History</Link>
                        {!responsive.small && (
                            <span>Lorem ipsum dolor sit amet.</span>
                        )}
                    </li>
                </ul>
                <ul className={styles.links}>
                    <li className={styles.link}>
                        <Link to="/foodservice">Foodservice</Link>
                    </li>
                    <li className={styles.link}>
                        <a href="https://careers.bluediamond.com" target="_blank">Careers</a>
                    </li>
                    <li className={styles.link}>
                        <Link to="/press">Press</Link>
                    </li>
                    <li className={styles.link}>
                        <Link to="/contact">Contact Us</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
