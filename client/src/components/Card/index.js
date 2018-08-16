import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

import Instagram from 'images/icons/instagram.svg';
import styles from './styles.module.css';

export default class Card extends Component {
    static PropTypes = {
        className: PropTypes.any,
        type: PropTypes.string,
        imageUrl: PropTypes.string.isRequired,
        linkTo: PropTypes.shape({
            url: PropTypes.string.isRequired,
            external: PropTypes.bool
        }).isRequired,
        children: PropTypes.node,
        label: PropTypes.string
    }

    handleTracking() {
        if(typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
                event: 'interaction',
                action: 'click',
                label: `View ${this.props.label || this.props.type}`
            });
        }
    }

    render() {
        const {type, imageUrl, linkTo, children, className, style} = this.props;

        let imageLink = (
            <Link
                to={linkTo.url}
                className={classnames(styles.container, {
                    [styles.recipe]: type === 'recipes'
                }, className)}
                onClick={() => this.handleTracking()}
                style={style}
            >
                <div className={styles.image} style={imageUrl ? {backgroundImage: `url(${imageUrl})`} : null} />
                {children && <div className={styles.meta}>{children}</div>}
            </Link>
        );

        if(linkTo.external) {
            imageLink = (
                <a
                    href={linkTo.url}
                    target="_blank"
                    className={classnames(styles.container, {
                        [styles.recipe]: type === 'recipes'
                    }, className)}
                    title={linkTo.url}
                    style={style}
                >
                    <div className={styles.image} style={imageUrl ? {backgroundImage: `url(${imageUrl})`} : null}>
                        <Instagram />
                    </div>
                    {children && <div className={styles.meta}>{children}</div>}
                </a>
            );
        }

        return imageLink;
    }
}
