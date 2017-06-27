import React, {Component, PropTypes} from 'react';

import Button from 'components/Button';
import ProductLink from 'components/ProductLink';
import Card from 'components/Navigation/Card';
import Breadcrumb from '../Breadcrumb';
import styles from './styles.module.css';

export default class Category extends Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        brand: PropTypes.object.isRequired,
        toggleNav: PropTypes.object.isRequired
    }

    navigate = () => {
        this.props.navigate(
            'Products',
            {enter: 'left', leave: 'right'},
            {brand: this.props.brand}
        );
    }

    render() {
        const {brand, toggleNav} = this.props;

        return (
            <Card>
                <Breadcrumb
                    theme={`brand--${brand.fields.themeColor}`}
                    onClick={this.navigate}
                >
                    {brand.fields.name}
                </Breadcrumb>
                <div className={styles.categories}>
                    {brand.fields.categories
                        .filter((category) => !category.fields.hidden)
                        .map((category) => (
                            <div className={styles.category} key={category.fields.slug}>
                                <div className={styles.title}>
                                    {category.fields.name}
                                </div>
                                <div className={styles.products}>
                                    {brand.fields.products.filter((product) =>
                                        product.fields.brandCategory === category.fields.name)
                                        .map((product) => (
                                            <ProductLink
                                                key={product.fields.slug}
                                                product={product}
                                                small
                                                onClick={toggleNav.hide}
                                            />
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <Button
                    theme={brand.fields.themeColor}
                    href={`/brand/${brand.fields.slug}`}
                    onClick={toggleNav.hide}
                    style={{
                        position: 'absolute',
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
