import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector, getPageData} from '../redux/pageData';
import NotFound from './NotFound';

// require pageModules ahead of time here using the format
// PageModuleName: require('../components/API/PageModuleName').default
const pageModules = {
    ParagraphWithHeader: require('../components/API/ParagraphWithHeader').default,
    ParagraphWithImage: require('../components/API/ParagraphWithImage').default,
    DocumentLink: require('../components/API/DocumentLink').default
};

@preload(({dispatch, location}) => dispatch(getPageData(location.pathname)))
@connect(
    (state) => ({...connector(state.pageData)}),
    {getPageData}
)
export default class Page extends Component {
    renderChildren = (data) => {
        const modules = data.items[0].fields.modules;
        const includes = data.includes;
        const entries = includes.Entry;

        const parsedEntries = [];
        if(modules && modules.length) {
            entries.forEach((entry) => {
                const entryId = entry.sys.contentType.sys.id;
                const entryComponent = entryId.replace('pageModule', '');
                parsedEntries.push({
                    component: entryComponent,
                    data: entry,
                    assets: includes.Asset
                });
            });
        }
        return parsedEntries.filter((entry) => pageModules[entry.component])
            .map((entry) => React.createElement(pageModules[entry.component], {
                data: entry.data,
                assets: entry.assets
            }));
    }

    render() {
        const {pageData} = this.props;

        if(pageData.items.length) {
            return (
                <div>
                    <Title>{pageData.items[0].fields.title}</Title>
                    {this.renderChildren(pageData)}
                </div>
            );
        }

        return <NotFound />;
    }
}
