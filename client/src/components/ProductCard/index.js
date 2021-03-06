import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import styles from './styles.module.css';

export default class ProductCard extends Component {
    static PropTypes = {
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        images: PropTypes.object.isRequired,
        onClick: PropTypes.func
    }

    render() {
        const {title, slug, images, onClick} = this.props;

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
                                    alt={`${title} Photo`}
                                />
                            )
                            : 'Not Available'
                        }
                    </div>
                    <p>
                        {title}
                    </p>
                </Link>
            </div>
        );
    }
}
