import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import classnames from 'classnames';

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
        type: PropTypes.string
    }

    static defaultProps = {
        active: false,
        action: 'goto',
        showBrand: false,
        type: 'panel'
    }

    componentWillMount() {
        this.pathname =
            '/brand' +
            `/${this.props.product.fields.brand.split(' ').join('-').toLowerCase()}` +
            `/${this.props.product.fields.brandCategory.split(' ').join('-').toLowerCase()}` +
            `/${this.props.product.fields.slug}`;
    }

    render() {
        const {
            product,
            active,
            action,
            onClick,
            activeClassName,
            inactiveClassName,
            showBrand,
            type
        } = this.props;

        let child = (
            <Link to={this.pathname} onClick={onClick}>
                <div className={styles.image}>
                    <img src={product.fields.productPhotos[0].fields.file.url} />
                </div>
                <div className={styles.info}>
                    {showBrand &&
                        <span className={styles.brand}>{product.fields.brand}</span>}
                    <span className={styles.title}>{product.fields.name}</span>
                </div>
            </Link>
        );

        if(action === 'push') {
            child = (
                <a onClick={onClick}>
                    <div className={styles.image}>
                        <img src={product.fields.productPhotos[0].fields.file.url} />
                    </div>
                    <div className={styles.info}>
                        {showBrand &&
                            <span className={styles.brand}>{product.fields.brand}</span>}
                        <span className={styles.title}>{product.fields.name}</span>
                    </div>
                </a>
            );
        }

        return (
            <div
                className={classnames(styles[type], {
                    [activeClassName]: activeClassName && active,
                    [inactiveClassName]: inactiveClassName && !active
                })}
            >
                {child}
            </div>
        );
    }
}
