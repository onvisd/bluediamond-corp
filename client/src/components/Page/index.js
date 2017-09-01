import React, {Component, PropTypes} from 'react';

import Title from 'components/Title';
import Meta from 'components/Meta';

import styles from './styles.module.css';

export default class Page extends Component {
    static propTypes = {
        pageModules: PropTypes.object,
        pageData: PropTypes.object
    };

    renderChildren = (data) => {
        const {pageModules} = this.props;
        const modules = data.items[0].fields.modules;
        const includes = data.includes;
        const entries = includes.Entry;

        const parsedModules = modules.map((mdle) =>
            entries.filter((entry) =>
                entry.sys.id === mdle.sys.id
            ).map((entry) => ({
                component: entry.sys.contentType.sys.id.replace('pageModule', ''),
                data: entry
            }))[0]);

        return parsedModules.filter((mdle) => pageModules[mdle.component])
            .map((mdle, idx) => React.createElement(pageModules[mdle.component], {
                data: mdle.data,
                assets: includes.Asset,
                entries,
                key: `pageModule${idx}`
            }));
    }

    render() {
        const {pageData} = this.props;

        return (
            <div className={styles.container}>
                <Title>{pageData.items[0].fields.title}</Title>
                <Meta>{[
                    {
                        property: 'og:title',
                        content: pageData.items[0].fields.title
                    },
                    {
                        property: 'og:description',
                        content: ''
                    }
                ]}</Meta>

                {this.renderChildren(pageData)}
            </div>
        );
    }
}
