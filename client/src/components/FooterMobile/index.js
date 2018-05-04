import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import {connect} from 'react-redux';
import styles from './styles.module.css';

import Facebook from 'images/icons/facebook.svg';
import Youtube from 'images/icons/youtube.svg';
import Instagram from 'images/icons/instagram.svg';
import Pinterest from 'images/icons/pinterest.svg';
import Twitter from 'images/icons/twitter.svg';
import FooterBG from 'images/backgrounds/wood-footer.jpg';

import {connector as navConnector} from 'state/navigation';

@connect(
    (state) => ({
        ...navConnector(state.navigation)
    })
)
export default class Footer extends Component {
    static propTypes = {
        params: PropTypes.object,
        isStorePage: PropTypes.bool
    }

    render() {
        const {params, isStorePage, navigation} = this.props;

        const social = {
            facebook: 'https://www.facebook.com/BlueDiamondAlmonds/',
            youtube: 'https://www.youtube.com/user/BlueDiamondGrowers',
            instagram: 'https://www.instagram.com/bluediamond/',
            pinterest: 'https://www.pinterest.com/bluediamond/',
            twitter: 'https://twitter.com/bluediamond'
        };

        if(params && (params.slug === 'almond-breeze' || params.brandSlug === 'almond-breeze')) {
            social.facebook = 'https://www.facebook.com/almondbreeze/';
            social.instagram = 'https://www.instagram.com/almondbreeze/';
            social.pinterest = 'https://www.pinterest.com/almondbreeze/';
            social.twitter = 'https://twitter.com/AlmondBreeze';
        }

        return (
            <footer className={`${styles.container}
                    ${navigation && navigation.style && styles[navigation.style.className]}`}>
                {isStorePage && (
                    <div className={styles.returnPolicy}>
                        <strong>Our Return Policy: </strong>
                        Returns items for up to 30 days after purchase.
                    </div>
                )}
                <div className={styles.section}>
                    <div>
                        <Link to="/press">
                            Press
                        </Link>
                        <a href="http://careers.bluediamond.com" target="_blank">
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
                        <a
                          className={styles.socialLink}
                          href={social.facebook}
                          target="_blank"
                        >
                            <Facebook />
                            <span>Facebook</span>
                        </a>
                        <a
                          className={styles.socialLink}
                          href={social.youtube}
                          target="_blank"
                        >
                            <Youtube />
                            <span>Youtube</span>
                        </a>
                        <a
                          className={styles.socialLink}
                          href={social.instagram}
                          target="_blank"
                        >
                            <Instagram />
                            <span>Instagram</span>
                        </a>
                        <a
                          className={styles.socialLink}
                          href={social.pinterest}
                          target="_blank"
                        >
                            <Pinterest />
                            <span>Pinterest</span>
                        </a>
                        <a
                          className={styles.socialLink}
                          href={social.twitter}
                          target="_blank"
                        >
                            <Twitter />
                            <span>Twitter</span>
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
    }
}
