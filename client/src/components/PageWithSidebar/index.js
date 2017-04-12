import React, {Component, PropTypes} from 'react';
import {Title} from 'react-isomorphic-render';

export default class PageWithSidebar extends Component {
    static propTypes = {
        pageModules: PropTypes.object,
        pageData: PropTypes.object
    };

    renderChildren = (data, content) => {
        const {pageModules} = this.props;
        const modules = data.items[0].fields[content];
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
                key: `pageModule${idx}`
            }));
    }

    render() {
        const {pageData} = this.props;

        return (
            <div className="l--row">
                <div className="l--col-8">
                    <Title>{pageData.items[0].fields.title}</Title>
                    {this.renderChildren(pageData, 'mainContentModules')}
                </div>
                <div className="l--col-4">
                    {this.renderChildren(pageData, 'sidebarContentModules')}
                </div>
            </div>
        );
    }
}
