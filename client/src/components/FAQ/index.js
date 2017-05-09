import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import marked from 'marked';

import CaretRight from '../../../assets/images/caret-right.svg';
import styles from './styles.module.css';

export default class FAQ extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            question: PropTypes.string.isRequired,
            answer: PropTypes.string.isRequired,
            brand: PropTypes.string.isRequired
        }))
    }

    state = {
        activeNavItem: null
    }

    componentWillMount() {
        this.setState(() => ({
            activeNavItem: this.getNavItems()[0]
        }));
    }

    renderMarkup = (field) => ({__html: marked(field)});

    updateNav = (navItem) => {
        this.setState(() => ({
            activeNavItem: navItem
        }));
    }

    getNavItems = () => {
        const {data} = this.props;
        const items = [];

        for (let i = 0; i < data.length; i++) {
            if(items.indexOf(data[i].brand) === -1)
                items.push(data[i].brand);
        }

        return items;
    }

    render() {
        const {activeNavItem} = this.state;
        const data = this.props.data.filter((d) => d.brand === activeNavItem);
        const navItems = this.getNavItems();

        return (
            <div className={styles.container}>
                <ul className={styles.nav}>
                    {navItems.map((navItem) => (
                        <li
                            className={classnames(styles.navItem, {
                                [styles.active]: activeNavItem === navItem
                            })}
                            onClick={() => {
                                this.updateNav(navItem);
                            }}
                            key={navItem}
                        >
                            {navItem}
                            <CaretRight />
                        </li>
                    ))}
                </ul>
                <ul className={styles.content}>
                    {data.map((d) => (
                        <li key={d._id}>
                            <h4>{d.question}</h4>
                            <p dangerouslySetInnerHTML={this.renderMarkup(d.answer)} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}
