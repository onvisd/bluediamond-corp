import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

import Instagram from 'images/icons/instagram.svg';
import styles from './styles.module.css';

export default class Card extends Component {
    static PropTypes = {
        type: PropTypes.string,
        imageUrl: PropTypes.string.isRequired,
        linkTo: PropTypes.shape({
            url: PropTypes.string.isRequired,
            external: PropTypes.bool
        }).isRequired,
        children: PropTypes.node
    }

    render() {
        const {type, imageUrl, linkTo, children} = this.props;

        let imageLink = (
            <Link
                to={linkTo.url}
                className={styles.image}
                style={{backgroundImage: `url(${imageUrl})`}}
            />
        );

        if(linkTo.external) {
            imageLink = (
                <a
                    href={linkTo.url}
                    target="_blank"
                    className={styles.image}
                    style={{backgroundImage: `url(${imageUrl})`}}
                >
                    <Instagram />
                </a>
            );
        }

        return (
            <div className={styles.container}>
                {imageLink}
                {children && (
                    <Link
                        to={linkTo.url}
                        className={classnames(styles.meta, {
                            [styles.recipe]: type === 'recipes'
                        })}
                    >
                        {children}
                    </Link>
                )}
            </div>
        );
    }
}
