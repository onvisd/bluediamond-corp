import React, {Component, PropTypes} from 'react';

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
                    theme={`brand--${brand.themeColor}`}
                    fixed
                    onClick={this.navigate}
                >
                    {category.name}
                </Breadcrumb>
                {category.products && (
                    <ul className={styles.products}>
                        {category.products.map((product) => (
                            <li className={styles.product} key={product._id} >
                                <img src={product.productPhotos[0].file.url} />
                                {product.name}
                            </li>
                        ))}
                    </ul>
                )}
                <Button
                    theme="yellow"
                    href={`/brand/${brand.slug}`}
                    onClick={toggleNav.hide}
                    style={{
                        position: 'fixed',
                        right: '1.5rem',
                        bottom: '1rem',
                        left: '1.5rem'
                    }}
                >
                    {`See All ${brand.name}`}
                </Button>
            </Card>
        );
    }
}
