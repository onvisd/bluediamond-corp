import React, {Component, PropTypes} from 'react';

import styles from './styles.module.css';

export default class ImageGallery extends Component {
    static propTypes = {
        images: PropTypes.array.isRequired
    }

    renderGalleryItem(image, id) {
        const url = image.file.url;
        const alt = image.file.title;

        return (
            <div key={id}>
                <img src={url} alt={alt} />
            </div>
        );
    }


    render() {
        const {images} = this.props;

        return (
            <div className={styles.container}>
                {images.map((image, idx) => this.renderGalleryItem(image, idx))}
            </div>
        );
    }
}
