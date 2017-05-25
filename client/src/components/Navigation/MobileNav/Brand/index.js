import React, {Component, PropTypes} from 'react';

import Breadcrumb from '../Breadcrumb';
import Card from '../../Card';
import NavList from '../../NavList';
import NavItem from '../../NavItem';

export default class Brand extends Component {
    static propTypes = {
        brand: PropTypes.object.isRequired,
        navigate: PropTypes.func.isRequired
    }

    navigate = {
        backwards: () => {
            this.props.navigate('Products', {enter: 'left', leave: 'right'});
        },
        forwards: (brand, category) => {
            this.props.navigate(
                'Category',
                {enter: 'right', leave: 'left'},
                {brand, category}
            );
        }
    }

    render() {
        const {brand} = this.props;

        return (
            <Card theme={brand.fields.themeColor}>
                <Breadcrumb
                    theme={`brand--${brand.fields.themeColor}_light`}
                    onClick={this.navigate.backwards}
                >
                    {brand.fields.name}
                </Breadcrumb>
                <NavList>
                    {brand.fields.categories.map((category) => (
                        <NavItem
                            key={category.sys.id}
                            theme={`brand--${brand.fields.themeColor}`}
                            onClick={() => this.navigate.forwards(brand, category)}
                        >
                            {category.fields.name}
                        </NavItem>
                    ))}
                </NavList>
            </Card>
        );
    }
}
