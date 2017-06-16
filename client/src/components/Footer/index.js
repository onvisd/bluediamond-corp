import React, {PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import styles from './styles.module.css';

import Facebook from 'images/icons/facebook.svg';
import Youtube from 'images/icons/youtube.svg';
import Instagram from 'images/icons/instagram.svg';
import Pinterest from 'images/icons/pinterest.svg';
import Twitter from 'images/icons/twitter.svg';
import Phone from 'images/icons/phone.svg';
import Mail from 'images/icons/mail.svg';
import FooterBG from 'images/backgrounds/wood-footer.jpg';

const Footer = ({data}) => (
    <footer className={styles.container}>
        <div className={styles.innerContainer}>
            <div className={styles.header}>
                <div className={styles.social}>
                    <span>
                        <a href="https://www.facebook.com/BlueDiamondAlmonds/" target="_blank">
                            <Facebook />
                        </a>
                    </span>
                    <span>
                        <a href="https://www.youtube.com/user/BlueDiamondGrowers" target="_blank">
                            <Youtube />
                        </a>
                    </span>
                    <span>
                        <a href="https://www.instagram.com/bluediamond/" target="_blank">
                            <Instagram />
                        </a>
                    </span>
                    <span>
                        <a href="https://www.pinterest.com/bluediamond/" target="_blank">
                            <Pinterest />
                        </a>
                    </span>
                    <span>
                        <a href="https://twitter.com/bluediamond" target="_blank">
                            <Twitter />
                        </a>
                    </span>
                </div>
                <div className={styles.contact}>
                    <span><Phone />(800) 987-2329</span>
                    <span>
                        <Mail />
                        <a href="mailto:support@bluediamond.com">support@bluediamond.com</a>
                    </span>
                </div>
            </div>
            <nav className={styles.nav}>
                <div className={styles.navSection}>
                    {data.sort((a, b) => {
                        if(a.categories.length > b.categories.length) return -1;
                        if(a.categories.length < b.categories.length) return 1;
                        return 0;
                    }).map((brand) => (
                        <div className={styles.navListWrap} key={brand.name}>
                            <Link to={`/brand/${brand.slug}`}>{brand.name}</Link>
                            <ul className={styles.navList}>
                                {brand.categories.map((category) => (
                                    <li key={category}>
                                        <Link to={`/brand/${brand.slug}`}>
                                            {category}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className={styles.navSection}>
                    <div className={styles.navListWrap}>
                        <p>Information</p>
                        <ul className={styles.navList}>
                            <li>
                                <Link to="/terms">
                                    Terms of Use
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <a href="https://careers.bluediamond.com" target="_blank">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <Link to="/press">
                                    Press
                                </Link>
                            </li>
                            <li>
                                <Link to="/foodservice">
                                    Foodservice
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.navListWrap}>
                        <p>Company</p>
                        <ul className={styles.navList}>
                            <li>
                                <Link to="/craft">
                                    Our Craft
                                </Link>
                            </li>
                            <li>
                                <Link to="/history">
                                    Our History
                                </Link>
                            </li>
                            <li>
                                <Link to="/manifesto">
                                    Our Story
                                </Link>
                            </li>
                            <li>
                                <a href="http://bluediamondgrowers.com" target="_blank">
                                    Our Growers
                                </a>
                            </li>
                            <li>
                                <Link to="/product-locator">
                                    Product Locator
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <div
            className={styles.copyright}
            style={{backgroundImage: `url(${FooterBG})`}}
        >
            <div className="l--container">
                © {new Date().getFullYear()} Blue Diamond Growers
            </div>
        </div>
    </footer>
);

Footer.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        categories: PropTypes.arrayOf(PropTypes.string).isRequired
    }))
};

export default Footer;
