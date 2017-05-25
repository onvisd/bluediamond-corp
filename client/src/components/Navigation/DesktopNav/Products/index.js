import React, {Component, PropTypes} from 'react';
import TransitionGroup from 'react-transition-group/CSSTransitionGroup';

import Card from '../../Card';
import NavList from '../../NavList';
import NavItem from '../../NavItem';
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

    getPanelStyles = () => {
        const {productCards} = this.props;

        if(productCards.length === 0)
            return {maxWidth: '12rem'};
        if(productCards.length === 1)
            return {maxWidth: '24rem'};
        if(productCards.length === 2)
            return {maxWidth: '72rem'};
    }

    render() {
        const {brands, productCards, setProductCards, toggleNav} = this.props;

        return (
            <div
                className={styles.container}
                style={this.getPanelStyles()}
            >
                <Card>
                    <NavList>
                        {brands.map((brand) => (
                            <NavItem
                                key={brand.fields.slug}
                                active={
                                    productCards[0] &&
                                    productCards[0].name === brand.fields.name
                                }
                                onClick={() => setProductCards([{
                                    element: this.cards.Brand,
                                    name: brand.fields.name,
                                    props: {brand}
                                }])}
                            >
                                {brand.fields.name}
                            </NavItem>
                        ))}
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
