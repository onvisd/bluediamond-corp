import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

export default class ImageCluster extends Component {
    static propTypes = {
        images: PropTypes.array.isRequired,
        change: PropTypes.bool.isRequired,
        className: PropTypes.any
    }

    renderImage(image, id, width, height) {
        const url = image.url;
        const alt = image.alt;

        return (
            <div key={id} className={styles.clusterImage}>
                {width && height &&
                    <img src={`${url}?fit=fill&f=face&w=${width}&h=${height}`} alt={alt} />
                }
                <img src={url} alt={alt} />
            </div>
        );
    }

    // 2:1 Aspect Ratio
    renderTwoUp(images) {
        const {change, className} = this.props;

        return (
            <div className={classNames(styles.cluster, styles.twoUp, 'l--col-12', className)}>
                {change && images.map((image, idx) => this.renderImage(image, idx, '800', '400'))}
                {!change && images.map((image, idx) => this.renderImage(image, idx))}
            </div>
        );
    }

    // 1.50:1 Aspect Ratio
    renderThreeUp(images) {
        const {change, className} = this.props;

        return (
            <div className={classNames(styles.cluster, styles.threeUp, 'l--col-12', className)}>
                {change && images.map((image, idx) => this.renderImage(image, idx, '800', '533'))}
                {!change && images.map((image, idx) => this.renderImage(image, idx))}
            </div>
        );
    }

    // 1:1 Aspect Ratio
    renderFourPlus(images) {
        const {change, className} = this.props;

        return (
            <div className={classNames(styles.cluster, styles.fourPlus, 'l--col-12', className)}>
                {change && images.map((image, idx) => this.renderImage(image, idx, '800', '800'))}
                {!change && images.map((image, idx) => this.renderImage(image, idx))}
            </div>
        );
    }

    render() {
        const {images} = this.props;
        const count = images.length;

        return (
            <div className="l--container">
                <div className="l--row">
                    {count === 2 && this.renderTwoUp(images)}
                    {count === 3 && this.renderThreeUp(images)}
                    {count >= 4 && this.renderFourPlus(images)}
                </div>
            </div>
        );
    }
}
