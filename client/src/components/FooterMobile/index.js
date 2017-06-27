import React from 'react';
import {Link} from 'react-isomorphic-render';
import styles from './styles.module.css';

import Facebook from 'images/icons/facebook.svg';
import Youtube from 'images/icons/youtube.svg';
import Instagram from 'images/icons/instagram.svg';
import Pinterest from 'images/icons/pinterest.svg';
import Twitter from 'images/icons/twitter.svg';
import FooterBG from 'images/backgrounds/wood-footer.jpg';

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
                <Link to="/faqs">
                    FAQs
                </Link>
                <Link to="/contact">
                    Contact
                </Link>
            </div>
            <div className={styles.social}>
                <a href="https://www.facebook.com/BlueDiamondAlmonds/" target="_blank">
                    <Facebook />
                </a>
                <a href="https://twitter.com/bluediamond" target="_blank">
                    <Youtube />
                </a>
                <a href="https://www.instagram.com/bluediamond/" target="_blank">
                    <Instagram />
                </a>
                <a href="https://twitter.com/bluediamond" target="_blank">
                    <Pinterest />
                </a>
                <a href="https://twitter.com/bluediamond" target="_blank">
                    <Twitter />
                </a>
            </div>
            <div>
                <Link to="/terms">
                    Terms
                </Link>
                <Link to="/privacy">
                    Privacy
                </Link>
            </div>
        </div>
        <div
            className={styles.copyright}
            style={{backgroundImage: `url(${FooterBG})`}}
        >
            © {new Date().getFullYear()} Blue Diamond Growers
        </div>
    </footer>
);

export default Footer;
