import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';

export default class ProductFilter extends Component {
    state = {
        visibleOptionCount: 10,
        totalOptions: 0,
        clicked: false,
        expanded: false
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        filter: PropTypes.string.isRequired,
        filters: PropTypes.array.isRequired,
        query: PropTypes.string,
        onClick: PropTypes.func.isRequired,
        dropdown: PropTypes.bool,
        initState: PropTypes.array
    }

    compressArray = (arr) => {
        const compressed = [];
        const copy = arr.slice(0);

        for (let i = 0; i < arr.length; i++) {
            let count = 0;

            for (let w = 0; w < copy.length; w++) {
                if(arr[i] === copy[w]) {
                    count++;
                    delete copy[w];
                }
            }

            if(count > 0) {
                const a = {};
                a.value = arr[i];
                a.count = count;
                compressed.push(a);
            }
        }

        return compressed;
    };

    filterByTag = (arr) => {
        const {query} = this.props;
        const items = [];

        for (let i = 0; i < arr.length; i++) {
            const item = JSON.stringify(arr[i]).match(new RegExp(`${query}:([^,"]*)`, 'g'));

            if(item)
                items.push(item[0].split(':')[1].replace('"', ''));
        }

        return this.compressArray(items);
    }

    filterByOption = (arr) => {
        const {title, query} = this.props;
        const options = arr.reduce((a, b) => a.concat(b), []);
        const items = [];

        for (let i = 0; i < options.length; i++) {
            const option = options[i];

            if(option && option.name === title)
                items.push(option[query]);
        }

        const flatItems = items.reduce((a, b) => a.concat(b), []);

        return this.compressArray(flatItems);
    }

    filterByCollection = (arr) => {
        const collections = arr.reduce((a, b) => a.concat(b), []);
        const items = [];

        for (let i = 0; i < collections.length; i++) {
            const collection = collections[i].node;
            items.push(collection.title);
        }

        return this.compressArray(items);
    }

    options = () => {
        const {initState, filters} = this.props;

        // Check if items are selected via inital state (query params)
        return filters.map((f) => {
            const option = {value: f};

            if(initState && initState.includes(f))
                option.checked = true;
            else
                option.checked = false;

            return option;
        });
    };

    renderLoadMore = (options) => {
        const {visibleOptionCount, clicked} = this.state;

        return (
            <div>
                {(options) && (options.length > visibleOptionCount) && (clicked === false) &&
                    <a onClick={this.handleClick} className={styles.seeMore}>
                        See More +
                    </a>
                }
            </div>
        );
    };

    handleClick = (e) => {
        e.preventDefault();

        this.setState((state) => ({
            visibleOptionCount: this.state.totalOptions,
            clicked: !state.clicked
        }));
    };

    toggleExpand = (e) => {
        if(!e.target.closest('label')) {
            e.preventDefault();
            this.setState({expanded: !this.state.expanded});
        }
    };

    componentWillMount() {
        this.setState(() => ({
            totalOptions: this.options().length
        }));
    }

    render() {
        const {visibleOptionCount, expanded} = this.state;
        const {title, onClear, onClick, dropdown} = this.props;
        const options = this.options();
        const numCheckedOptions = options.filter((option) => option.checked).length;

        if(options && options.length > 0) {
            return (
                <div
                    className={classnames(
                        styles.container, {
                            [styles.expanded]: expanded,
                            [styles.dropdown]: dropdown
                        }
                    )}
                    onClick={dropdown ? this.toggleExpand : null}
                >
                    <div className={classnames(styles.title, 'l--row-full')}>
                        <div className={classnames(styles.titleContainer, 'l--col-6-full')}>
                            {title}
                        </div>
                        <div
                            className={classnames(
                                styles.clearContainer,
                                'l--col-6-full',
                            )} onClick={onClear}>
                            <span className={classnames(
                                styles.clearLabel, {
                                    [styles.hidden]: numCheckedOptions === 0
                                })}
                            >CLEAR</span>
                        </div>
                    </div>
                    {options
                        .slice(0, dropdown ? options.length : visibleOptionCount)
                        .map((option) => {
                            if(option.value) {
                                return (
                                    <label
                                        key={`filter${option.value}`}
                                        htmlFor={option.value}
                                        className={classnames(styles.label, {
                                            [styles.disabled]: option.count === 0
                                        })}
                                    >
                                        <input
                                            onChange={onClick}
                                            type="checkbox"
                                            value={option.value}
                                            id={option.value}
                                            checked={option.checked}
                                        />
                                        <div className={classnames(styles.checkbox)}>
                                            <div className={classnames({
                                                [styles.checkboxContent]: option.checked
                                            })}></div>
                                        </div>
                                        {option.value}
                                    </label>
                                );
                            }
                        })
                    }
                    {!dropdown}
                    {!dropdown && this.renderLoadMore(options)}
                </div>
            );
        }

        return (<div/>);
    }
}
