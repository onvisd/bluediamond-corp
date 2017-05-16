import React from 'react';
import {Link} from 'react-isomorphic-render';
import styles from './styles.module.css';

import Facebook from '../../../assets/images/facebook.svg';
import Instagram from '../../../assets/images/instagram.svg';
import Twitter from '../../../assets/images/twitter.svg';

const Footer = () => (
    <footer className={styles.container}>
        <div className={styles.section}>
            <div>
                <Link to="/press">
                    Press
                </Link>
                <a href="https://careers.bluediamond.com" target="_blank">
                    Careers
                </a>
                <Link to="/contact">
                    Contact
                </Link>
            </div>
            <div>
                <a href="https://twitter.com/bluediamond" target="_blank">
                    <Twitter />
                </a>
                <a href="https://www.instagram.com/bluediamond/" target="_blank">
                    <Instagram />
                </a>
                <a href="https://www.facebook.com/BlueDiamondAlmonds/" target="_blank">
                    <Facebook />
                </a>
            </div>
        </div>
        <div className={styles.section}>
            <div>
                <Link to="/terms">
                    Terms
                </Link>
                <Link to="/privacy">
                    Privacy
                </Link>
            </div>
            <div className={styles.copyright}>
                © {new Date().getFullYear()} Blue Diamond Growers
            </div>
        </div>
    </footer>
);

export default Footer;
