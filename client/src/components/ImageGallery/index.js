import React, {Component, PropTypes} from 'react';

import styles from './styles.module.css';

export default class ImageGallery extends Component {
    static propTypes = {
        images: PropTypes.array.isRequired
    }

    renderGalleryItem(image, id) {
        const url = image.file.url;
        const alt = image.title;

        return (
            <div key={id} className={`l--col-12-at-s l--col-6-at-m l--col-4-at-l ${styles.image}`}>
                <img src={`${url}?fit=fill&f=face&w=800&h=800`} alt={alt} />
            </div>
        );
    }


    render() {
        const {images} = this.props;

        return (
            <div className={`${styles.container} l--row l--align-left`}>
                {images.map((image, idx) => this.renderGalleryItem(image, idx))}
            </div>
        );
    }
}
