import React, {PropTypes} from 'react';

import Card from '../../Card';
import NavList from '../../NavList';
import NavItem from '../../NavItem';
import Category from '../Category';

const Brand = ({brand, setProductCards, productCards}) => (
    <Card theme={brand.fields.themeColor}>
        <NavList>
            {brand.fields.categories.map((category) => (
                <NavItem
                    key={category.sys.id}
                    theme={`brand--${brand.fields.themeColor}`}
                    active={productCards[1] && productCards[1].name === category.fields.name}
                    onMouseOver={() => setProductCards(productCards.splice(0, 1).concat([{
                        element: Category,
                        name: category.fields.name,
                        props: {brand, category}
                    }]))}
                >
                    {category.fields.name.replace('Flavors', '')}
                </NavItem>
            ))}
        </NavList>
    </Card>
);

Brand.propTypes = {
    brand: PropTypes.object.isRequired
};

export default Brand;
