import React, {Component, PropTypes} from 'react';
import styles from './styles.module.css';

export default class ImageCluster extends Component {
    static propTypes = {
        images: PropTypes.array.isRequired
    }

    renderImage(image, id, width, height) {
        const url = image.url;
        const alt = image.alt;

        return (
            <div key={id} className={styles.clusterImage}>
                <img src={`${url}?fit=fill&f=face&w=${width}&h=${height}`} alt={alt} />
            </div>
        );
    }

    // 2:1 Aspect Ratio
    renderTwoUp(images) {
        return (
            <div className={`${styles.cluster} ${styles.twoUp} l--col-12`}>
                {images.map((image, idx) => this.renderImage(image, idx, '800', '400'))}
            </div>
        );
    }

    // 1.50:1 Aspect Ratio
    renderThreeUp(images) {
        return (
            <div className={`${styles.cluster} ${styles.threeUp} l--col-12`}>
                {images.map((image, idx) => this.renderImage(image, idx, '800', '533'))}
            </div>
        );
    }

    // 1:1 Aspect Ratio
    renderFourPlus(images) {
        return (
            <div className={`${styles.cluster} ${styles.fourPlus} l--col-12`}>
                {images.map((image, idx) => this.renderImage(image, idx, '800', '800'))}
            </div>
        );
    }

    render() {
        const {images} = this.props;
        const count = images.length;

        return (
            <div className={`${styles.container} l--container`}>
                <div className="l--row">
                    {count === 2 && this.renderTwoUp(images)}
                    {count === 3 && this.renderThreeUp(images)}
                    {count >= 4 && this.renderFourPlus(images)}
                </div>
            </div>
        );
    }
}
