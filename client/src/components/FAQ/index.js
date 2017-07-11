import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import marked from 'marked';

import Button from 'components/Button';

import CaretRight from 'images/icons/caret-right.svg';
import styles from './styles.module.css';

@connect((state) => ({
    responsive: state.responsive
}))
export default class FAQ extends Component {
    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            question: PropTypes.string.isRequired,
            answer: PropTypes.string.isRequired,
            brand: PropTypes.string.isRequired
        })),
        limit: PropTypes.number
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
        const {limit, responsive} = this.props;
        const {activeNavItem} = this.state;
        const data = this.props.data.filter((d) => d.brand === activeNavItem);
        const navItems = this.getNavItems();

        return (
            <div className={styles.container}>
                <ul className={styles.nav}>
                    {navItems.map((navItem) => ([
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
                            {responsive.small
                                ? null
                                : (<CaretRight />)
                            }
                        </li>,
                        responsive.small
                        ? (
                            <li
                                className={classnames(styles.navContent, {
                                    [styles.active]: activeNavItem === navItem
                                })}
                            >
                                <ul className={styles.content}>
                                    {data.slice(0, limit || data.length).map((d) => (
                                        <li key={d._id} className={styles.item}>
                                            <h4>{d.question}</h4>
                                            <p dangerouslySetInnerHTML={
                                                this.renderMarkup(d.answer)
                                            } />
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ) : null
                    ]))}
                </ul>
                {responsive.small
                    ? (
                        limit && (
                            <Button href="/faqs" className={styles.seeAll}>
                                See all FAQs
                            </Button>
                        )
                    ) : (
                    <ul className={styles.content}>
                        {data.slice(0, limit || data.length).map((d) => (
                            <li key={d._id} className={styles.item}>
                                <h4>{d.question}</h4>
                                <p dangerouslySetInnerHTML={this.renderMarkup(d.answer)} />
                            </li>
                        ))}
                        {limit && (
                            <Button href="/faqs" className={styles.seeAll}>
                                See all FAQs
                            </Button>
                        )}
                    </ul>
                )}
            </div>
        );
    }
}
