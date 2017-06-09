import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';

import Button from '../../../Button';
import Breadcrumb from '../Breadcrumb';
import Card from '../../Card';
import styles from './styles.module.css';

export default class Category extends Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        brand: PropTypes.object.isRequired,
        category: PropTypes.object.isRequired,
        toggleNav: PropTypes.object.isRequired
    }

    navigate = () => {
        this.props.navigate(
            'Brand',
            {enter: 'left', leave: 'right'},
            {brand: this.props.brand}
        );
    }

    render() {
        const {brand, category, toggleNav} = this.props;

        return (
            <Card>
                <Breadcrumb
                    theme={`brand--${brand.fields.themeColor}`}
                    fixed
                    onClick={this.navigate}
                >
                    {category.fields.name}
                </Breadcrumb>
                <ul className={styles.products}>
                    {brand.fields.products.filter(
                        (product) => product.fields.brandCategory === category.fields.name)
                        .map((product) => (
                        <li className={styles.product} key={product.sys.id} >
                            <Link
                                to={
                                '/brand' +
                                `/${brand.fields.slug}` +
                                `/${category.fields.slug}` +
                                `/${product.fields.slug}`}
                                onClick={toggleNav.hide}
                            >
                                <img src={product.fields.productPhotos[0].fields.file.url} />
                                {product.fields.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Button
                    theme="yellow"
                    href={`/brand/${brand.fields.slug}`}
                    onClick={toggleNav.hide}
                    style={{
                        position: 'fixed',
                        right: '1.5rem',
                        bottom: '1rem',
                        left: '1.5rem'
                    }}
                >
                    {`See All ${brand.fields.name}`}
                </Button>
            </Card>
        );
    }
}
