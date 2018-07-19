import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

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
        const fields = data.items[0].fields;
        const modules = fields.modules;
        const includes = data.includes;
        const entries = includes.Entry;

        const parsedModules = modules.map((mdle) =>
            entries.filter((entry) =>
                entry.sys.id === mdle.sys.id
            ).map((entry) => ({
                component: entry.sys.contentType.sys.id.replace('pageModule', ''),
                data: mdle.sys.contentType.sys.id === 'pageModuleBrandCategory' ? mdle : entry
            }))[0]);

        return parsedModules.filter((mdle) => pageModules[mdle.component])
            .map((mdle, idx) => React.createElement(pageModules[mdle.component], {
                data: mdle.data,
                theme: fields.theme,
                assets: includes.Asset,
                entries,
                key: `pageModule${idx}`
            }));
    }

    render() {
        const {pageData} = this.props;
        const {fields} = pageData.items[0];

        return (
            <div className={classnames(styles.container, styles[fields.theme])}>
                <Title>{fields.title}</Title>
                <Meta>{[
                    {
                        property: 'og:title',
                        content: fields.title
                    },
                    {
                        property: 'og:description',
                        content: fields.metaDescription
                    },
                    {
                        property: 'description',
                        content: fields.metaDescription
                    },
                    {
                        name: 'keywords',
                        content: fields.metaKeywords && fields.metaKeywords.join(',')
                    }
                ]}</Meta>
                {this.renderChildren(pageData)}
            </div>
        );
    }
}
