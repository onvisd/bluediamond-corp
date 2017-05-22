import React, {Component, PropTypes} from 'react';

import Breadcrumb from '../Breadcrumb';
import Card from '../../Card';
import NavList from '../../NavList';
import NavItem from '../../NavItem';

export default class Brand extends Component {
    static propTypes = {
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
            <Card theme={brand.themeColor}>
                <Breadcrumb
                    theme={`brand--${brand.themeColor}_light`}
                    onClick={this.navigate.backwards}
                >
                    {brand.name}
                </Breadcrumb>
                <NavList>
                    {brand.categories.map((category) => (
                        <NavItem
                            key={category._id}
                            theme={`brand--${brand.themeColor}`}
                            onClick={() => this.navigate.forwards(brand, category)}
                        >
                            {category.name}
                        </NavItem>
                    ))}
                </NavList>
            </Card>
        );
    }
}
