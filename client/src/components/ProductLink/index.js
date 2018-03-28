import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

import image from 'tools/image';

import styles from './styles.module.css';

export default class ProductLink extends Component {
    static propTypes = {
        product: PropTypes.object.isRequired,
        active: PropTypes.bool,
        action: PropTypes.string,
        onClick: PropTypes.func,
        activeClassName: PropTypes.string,
        inactiveClassName: PropTypes.string,
        showBrand: PropTypes.bool,
        type: PropTypes.string,
        modifierClass: PropTypes.any,
        textClass: PropTypes.any,
        theme: PropTypes.string
    }

    static defaultProps = {
        active: false,
        action: 'goto',
        showBrand: false,
        type: 'panel'
    }

    renderImage() {
        const {
            product
        } = this.props;

        return (
            <div className={styles.imageWrap}>
                <div className={styles.image}>
                    <img
                        src={image(
                            product.fields.productPhotos[0].fields.file.url,
                            {
                                width: 125,
                                height: 125
                            }
                        )}
                        srcSet={`
                            ${image(
                                product.fields.productPhotos[0].fields.file.url,
                                {
                                    width: 125,
                                    height: 125
                                }
                            )} 1x,
                            ${image(
                                product.fields.productPhotos[0].fields.file.url,
                                {
                                    width: 250,
                                    height: 250
                                }
                            )} 2x,
                            ${image(
                                product.fields.productPhotos[0].fields.file.url,
                                {
                                    width: 375,
                                    height: 375
                                }
                            )} 3x
                        `}
                        alt={product.fields.name}
                    />
                </div>
            </div>
        );
    }

    renderCopy() {
        const {
            product,
            showBrand,
            textClass
        } = this.props;

        return (
            <div className={styles.info}>
                {showBrand &&
                    <span className={styles.brand}>{product.fields.brand}</span>}
                <span className={classnames(styles.title, textClass)}>{product.fields.name}</span>
            </div>
        );
    }

    render() {
        const {
            product,
            active,
            action,
            onClick,
            activeClassName,
            inactiveClassName,
            type,
            className,
            modifierClass,
            theme
        } = this.props;

        const pathname =
            '/brand' +
            `/${product.fields.brand.split(' ').join('-').toLowerCase()}` +
            `/${product.fields.brandCategory.split(' ').join('-').toLowerCase()}` +
            `/${product.fields.slug}`;

        let child = (
            <Link className={styles.container} to={pathname} onClick={onClick}>
                {this.renderImage()}
                {this.renderCopy()}
            </Link>
        );

        if(action === 'push') {
            child = (
                <div className={styles.container} onClick={onClick}>
                    {this.renderImage()}
                    {this.renderCopy()}
                </div>
            );
        }

        return (
            <div
                className={
                    classnames(
                        styles.container,
                        styles[theme],
                        styles[type],
                        modifierClass,
                        {
                            [activeClassName]: activeClassName && active,
                            [inactiveClassName]: inactiveClassName && !active
                        },
                        className
                    )
                }
            >
                {child}
            </div>
        );
    }
}
