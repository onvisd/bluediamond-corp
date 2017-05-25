import React, {Component, PropTypes} from 'react';

import Breadcrumb from '../Breadcrumb';
import Card from '../../Card';
import NavList from '../../NavList';
import NavItem from '../../NavItem';

export default class Products extends Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired
    }

    navigate = {
        backwards: () => {
            this.props.navigate('Root', {enter: 'left', leave: 'right'});
        },
        forwards: (brand) => {
            this.props.navigate('Brand', {enter: 'right', leave: 'left'}, {brand});
        }
    }

    render() {
        const {brands} = this.props;

        return (
            <Card>
                <Breadcrumb onClick={this.navigate.backwards}>
                    Our Products
                </Breadcrumb>
                <NavList>
                    {brands.map((brand) => (
                        <NavItem
                            key={brand.fields.slug}
                            onClick={() => this.navigate.forwards(brand)}
                        >
                            {brand.fields.name}
                        </NavItem>
                    ))}
                </NavList>
            </Card>
        );
    }
}
