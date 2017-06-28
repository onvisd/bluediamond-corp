import React, {Component, PropTypes} from 'react';

import styles from './styles.module.css';

export default class ProductFilter extends Component {
    state = {
        visibleOptionCount: 3,
        totalOptions: 0,
        clicked: false
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        filter: PropTypes.string.isRequired,
        query: PropTypes.string,
        products: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired
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
        const {products, filter} = this.props;

        let items;

        if(filter === 'productType')
            items = this.compressArray(products.map((product) => product.node[filter]));

        if(filter === 'tags')
            items = this.filterByTag(products.map((product) => product.node[filter]));

        if(filter === 'options')
            items = this.filterByOption(products.map((product) => product.node[filter]));

        if(filter === 'collections')
            items = this.filterByCollection(products.map((product) => product.node[filter].edges));

        return items;
    }

    renderLoadMore = () => {
        const {visibleOptionCount, totalOptions, clicked} = this.state;

        return (
            <div>
                {(totalOptions >= visibleOptionCount) && (clicked === false) &&
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
            visibleOptionCount: 100,
            clicked: !state.clicked
        }));
    }

    componentWillMount() {
        this.setState(() => ({
            totalOptions: this.options().length
        }));
    }

    render() {
        const {visibleOptionCount} = this.state;
        const {title, onClick} = this.props;
        const options = this.options().slice(0, visibleOptionCount);

        return (
            <div className={styles.container}>
                <p><strong>{title}</strong></p>
                {options.map((option) => (
                    <label key={`filter${option.value}`} htmlFor={option.value}>
                        <input
                            onChange={onClick}
                            type="checkbox"
                            value={option.value}
                            id={option.value}
                        />
                        {option.value} ({option.count})
                    </label>
                ))}
                {this.renderLoadMore()}
            </div>
        );
    }
}
