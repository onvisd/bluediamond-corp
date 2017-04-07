import React, {Component} from 'react';
import {Link} from 'react-isomorphic-render';

import styles from './styles.module.css';

export default class CompanyNavigation extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ul className={styles.tabs}>
                    <li className={styles.tab}>
                        <Link className={styles.title} to="/company/coop">Co-op Manifesto</Link>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                    <li className={styles.tab}>
                        <Link className={styles.title} to="/company/craft">Our Craft</Link>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </li>
                    <li className={styles.tab}>
                        <Link className={styles.title} to="/company/history">Our History</Link>
                        <span>Lorem ipsum dolor sit amet.</span>
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
