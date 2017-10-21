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
        query: PropTypes.string,
        products: PropTypes.array.isRequired,
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
        const {products, filter, initState} = this.props;

        let items;

        if(filter === 'productType')
            items = this.compressArray(products.map((product) => product.node[filter]));

        if(filter === 'tags')
            items = this.filterByTag(products.map((product) => product.node[filter]));

        if(filter === 'options')
            items = this.filterByOption(products.map((product) => product.node[filter]));

        if(filter === 'collections')
            items = this.filterByCollection(products.map((product) => product.node[filter].edges));

        // Check if items are selected via inital state (query params)
        items.map((item) => {
            if(initState && initState.includes(item.value))
                item.checked = true;
            else
                item.checked = false;
        });

        return items;
    }

    renderLoadMore = () => {
        const {visibleOptionCount, totalOptions, clicked} = this.state;

        return (
            <div>
                {(totalOptions > visibleOptionCount) && (clicked === false) &&
                    <a onClick={this.handleClick} className={styles.seeMore}>
                        See More +
                    </a>
                }
            </div>
        );
    }

    handleClick = (e) => {
        e.preventDefault();

        this.setState((state) => ({
            visibleOptionCount: this.state.totalOptions,
            clicked: !state.clicked
        }));
    }

    toggleExpand = (e) => {
        if(!e.target.closest('label')) {
            e.preventDefault();
            this.setState({expanded: !this.state.expanded});
        }
    }

    componentWillMount() {
        this.setState(() => ({
            totalOptions: this.options().length
        }));
    }

    render() {
        const {visibleOptionCount, expanded} = this.state;
        const {title, onClick, dropdown} = this.props;
        const options = this.options();

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
                <p className={styles.title}><strong>{title}</strong></p>
                {options.slice(0, dropdown ? options.length : visibleOptionCount).map((option) => {
                    if(option.value) {
                        return (
                          <label key={`filter${option.value}`} htmlFor={option.value}>
                              <input
                                  onChange={onClick}
                                  type="checkbox"
                                  value={option.value}
                                  id={option.value}
                                  checked={option.checked}
                              />
                              {option.value} ({option.count})
                          </label>
                        );
                    }
                })}
                {!dropdown && this.renderLoadMore()}
            </div>
        );
    }
}
