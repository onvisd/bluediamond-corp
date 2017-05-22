import React, {PropTypes} from 'react';

import Card from '../../Card';
import NavList from '../../NavList';
import NavItem from '../../NavItem';
import Category from '../Category';

const Brand = ({brand, setProductCards, productCards}) => (
    <Card theme={brand.themeColor}>
        <NavList>
            {brand.categories.map((category) => (
                <NavItem
                    key={category._id}
                    theme={`brand--${brand.themeColor}`}
                    active={productCards[1] && productCards[1].name === category.name}
                    onClick={() => setProductCards(productCards.splice(0, 1).concat([{
                        element: Category,
                        name: category.name,
                        props: {brand, category}
                    }]))}
                >
                    {category.name.replace('Flavors', '')}
                </NavItem>
            ))}
        </NavList>
    </Card>
);

Brand.propTypes = {
    brand: PropTypes.object.isRequired
};

export default Brand;
