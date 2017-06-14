import React, {Component, PropTypes} from 'react';
import TransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Card from 'components/Navigation/Card';
import NavList from 'components/Navigation/NavList';
import NavItem from 'components/Navigation/NavItem';
import styles from './styles.module.css';

export default class Products extends Component {
    static propTypes = {
        brands: PropTypes.array.isRequired,
        productCards: PropTypes.array.isRequired,
        setProductCards: PropTypes.func.isRequired,
        toggleNav: PropTypes.object.isRequired
    }

    cards = {
        Brand: require('../Brand').default,
        Category: require('../Category').default
    }

    renderBrand = (brand) => {
        const {productCards, setProductCards} = this.props;

        let category = productCards[1];
        if(brand.fields.name !== productCards[0].name) {
            category = {
                element: this.cards.Category,
                name: brand.fields.categories[0].fields.name,
                props: {brand, category: brand.fields.categories[0]}
            };
        }

        return (
            <NavItem
                key={brand.fields.slug}
                active={
                    productCards[0] &&
                    productCards[0].name === brand.fields.name
                }
                onMouseOver={() => setProductCards([{
                    element: this.cards.Brand,
                    name: brand.fields.name,
                    props: {brand}
                }, category])}
            >
                {brand.fields.name}
            </NavItem>
        );
    }

    render() {
        const {brands, productCards, setProductCards, toggleNav} = this.props;

        return (
            <div className={styles.container}>
                <Card>
                    <NavList>
                        {brands.map((brand) => this.renderBrand(brand))}
                    </NavList>
                </Card>
                <TransitionGroup
                    transitionName={{
                        enter: styles['transition-enter'],
                        enterActive: styles['transition-enter-active'],
                        leave: styles['transition-leave'],
                        leaveActive: styles['transition-leave-active']
                    }}
                    transitionEnter={true}
                    transitionEnterTimeout={150}
                    transitionLeave={true}
                    transitionLeaveTimeout={150}
                >
                    {productCards.map((card, idx) =>
                        React.createElement(card.element, {
                            key: `card-${idx}`,
                            setProductCards,
                            productCards,
                            toggleNav,
                            brands,
                            ...card.props
                        })
                    )}
                </TransitionGroup>
            </div>
        );
    }
}
