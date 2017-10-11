import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import styles from './styles.module.css';

export default class ProductCard extends Component {
    static PropTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.object.isRequired,
        imageAlt: PropTypes.string.isRequired,
        onClick: PropTypes.func
    }

    render() {
        const {type, title, slug, images, imageAlt, onClick} = this.props;

        return (
            <div className={styles.container}>
                <Link to={slug} onClick={onClick}>
                    <div className={styles.image}>
                        {images
                            ? (
                                <img
                                    src={images[256]}
                                    srcSet={`
                                        ${images[256]},
                                        ${images[512]} 2x,
                                        ${images[1024]} 3x
                                    `}
                                    alt={imageAlt}
                                />
                            )
                            : 'Not Available'
                        }
                    </div>
                    <p>
                        <strong>{type}</strong><br />
                        {title}
                    </p>
                </Link>
            </div>
        );
    }
}
