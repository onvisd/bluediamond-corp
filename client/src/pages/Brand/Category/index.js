import React, {Component, PropTypes} from 'react';

import ProductPanel from 'components/ProductPanel';
import slugify from 'tools/slugify';
import classnames from 'classnames';

import styles from './styles.module.css';

export default class Category extends Component {
    static PropTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        products: PropTypes.array,
        theme: PropTypes.string
    }

    render() {
        const {name, description, products, appetizerImages, theme} = this.props;

        return (
            <div
                id={`category-${slugify(name)}`}
                className={classnames(styles.container, [styles[theme]])}
                style={{
                    backgroundImage:
                        `url(${appetizerImages[0].fields.file.url}), ` +
                        `url(${appetizerImages[1].fields.file.url})`
                }}
            >
                <div className={styles.innerContainer}>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <ProductPanel
                        products={products}
                        showActiveClasses={false}
                        theme={theme}
                    />
                </div>
            </div>
        );
    }
}
