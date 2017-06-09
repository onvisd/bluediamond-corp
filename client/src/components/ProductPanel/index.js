import React, {Component, PropTypes} from 'react';
import {Link, pushLocation} from 'react-isomorphic-render';
import {withRouter} from 'react-router';
import classnames from 'classnames';

import styles from './styles.module.css';

@withRouter
export default class ProductPanel extends Component {
    static propTypes = {
        activeProduct: PropTypes.object,
        products: PropTypes.array.isRequired,
        linkAction: PropTypes.string.isRequired
    }

    static defaultProps = {
        linkAction: 'goto'
    }

    handleNavigate = (product) => {
        const {router} = this.props;

        const pathname =
            '/brand' +
            `/${product.fields.brand.replace(' ', '-').toLowerCase()}` +
            `/${product.fields.brandCategory.replace(' ', '-').toLowerCase()}` +
            `/${product.fields.slug}`;

        pushLocation({pathname}, router);
    }

    renderLink = (product) => {
        const {linkAction} = this.props;

        if(linkAction === 'push') {
            return (
                <a onClick={() => this.handleNavigate(product)}>
                    <img src={product.fields.productPhotos[0].fields.file.url} />
                    {product.fields.name}
                </a>
            );
        }

        return (
            <Link
                to={
                '/brand' +
                `/${product.fields.brand.replace(' ', '-').toLowerCase()}` +
                `/${product.fields.brandCategory.replace(' ', '-').toLowerCase()}` +
                `/${product.fields.slug}`}
            >
                <img src={product.fields.productPhotos[0].fields.file.url} />
                {product.fields.name}
            </Link>
        );
    };

    render() {
        const {activeProduct, products} = this.props;

        return (
            <div className={styles.container}>
                <ul className={styles.productList}>
                    {products.map((product) => (
                        <li
                            className={classnames(styles.product, {
                                [styles.opaque]: !activeProduct,
                                [styles.active]: activeProduct &&
                                    activeProduct.fields.slug === product.fields.slug
                            })}
                            key={product.sys.id}
                        >
                            {this.renderLink(product)}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
