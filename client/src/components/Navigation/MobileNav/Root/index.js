import React, {Component, PropTypes} from 'react';

import NavList from 'components/Navigation/NavList';
import NavItem from 'components/Navigation/NavItem';
import Card from 'components/Navigation/Card';

export default class Root extends Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        toggleNav: PropTypes.object.isRequired
    }

    navigate = (card) => {
        this.props.navigate(card, {enter: 'right', leave: 'left'});
    }

    render() {
        const {navData, toggleNav} = this.props;

        return (
            <Card>
                <NavList>
                    {navData.primary.actions.map((action) => (
                        <NavItem
                            key={action.name}
                            onClick={() => this.navigate(action.card)}
                        >
                            {action.name}
                        </NavItem>
                    ))}
                    <NavItem
                        key="/store"
                        href="/store"
                        onClick={toggleNav.hide}
                    >
                        Store
                    </NavItem>
                </NavList>
                <NavList type="secondary">
                    {navData.secondary.map((link) => (
                        <NavItem
                            type="secondary"
                            key={link.slug}
                            extHref={link.slug}
                        >
                            {link.name}
                        </NavItem>
                    ))}
                </NavList>
                <NavList>
                    {navData.primary.globalLinks.concat(
                        navData.primary.companyLinks
                    ).map((link) => {
                        if(link.slug === '/store') // special case
                            return;

                        let rest = {href: link.slug, onClick: toggleNav.hide};
                        if(link.external)
                            rest = {extHref: link.slug};

                        return (
                            <NavItem
                                key={link.slug}
                                {...rest}
                            >
                                {link.name}
                            </NavItem>
                        );
                    })}
                </NavList>
            </Card>
        );
    }
}
