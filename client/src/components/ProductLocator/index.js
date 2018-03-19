import React, {Component, PropTypes} from 'react';

// import styles from './styles.module.css';

export default class ProductLocator extends Component {
    static propTypes = {
        /* width and height can be represented as either {600} or {'100%'} */
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        query: PropTypes.string
    }

    render() {
        const {width, height, query} = this.props;
        const destiniBase = 'https://destinilocators.com/bluediamondnuts';

        return (
            <iframe
                src={`${destiniBase}/site${query && query}`}
                width={width || null}
                height={height || null}
                frameBorder="0"
                title="Product Locator"
            ></iframe>
        );
    }
}
