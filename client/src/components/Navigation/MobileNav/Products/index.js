import React, {Component, PropTypes} from 'react';

import Card from 'components/Navigation/Card';
import Breadcrumb from '../Breadcrumb';

import styles from './styles.module.css';

export default class Products extends Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired
    }

    navigate = {
        backwards: () => {
            this.props.navigate('Root', {enter: 'left', leave: 'right'});
        },
        forwards: (brand) => {
            this.props.navigate('Category', {enter: 'right', leave: 'left'}, {brand});
        }
    }

    render() {
        const {brands} = this.props;

        return (
            <Card>
                <Breadcrumb onClick={this.navigate.backwards}>
                    Our Products
                </Breadcrumb>
                <ul className={styles.container}>
                    {brands.map((brand) => (
                        <li
                            key={brand.fields.slug}
                            className={styles.tile}
                            onClick={() => this.navigate.forwards(brand)}
                        >
                            <h2>{brand.fields.name}</h2>
                        </li>
                    ))}
                </ul>
            </Card>
        );
    }
}
