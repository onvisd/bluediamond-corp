import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import styles from './styles.module.css';

export default class ProductCard extends Component {
    static PropTypes = {
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        imageFile: PropTypes.string.isRequired,
        imageAlt: PropTypes.string.isRequired,
        onClick: PropTypes.func
    }

    render() {
        const {type, title, slug, imageFile, imageAlt, onClick} = this.props;

        return (
            <div className={styles.container}>
                <Link href={slug} onClick={onClick}>
                    <div className={styles.image}>
                        <img src={imageFile} alt={imageAlt} />
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
