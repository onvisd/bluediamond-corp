import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Title, preload} from 'react-isomorphic-render';

import {connector, getPageData} from '../redux/pageData';
import NotFound from './NotFound';

// require pageModules ahead of time here using the format
// PageModuleName: require('../components/PageModuleName').default
const pageModules = {};

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
        const assets = includes.Asset;

        const parsedEntries = [];
        if(modules && modules.length) {
            entries.forEach((entry) => {
                const entryId = entry.sys.contentType.sys.id;
                const entryData = {
                    id: entryId,
                    component: entryId.replace('pageModule', '')
                };
                Object.keys(entry.fields).forEach((key) => {
                    let assetURL = false;

                    if(entry.fields[key].sys && entry.fields[key].sys.linkType === 'Asset') {
                        assetURL = assets
                            .filter((asset) => asset.sys.id === entry.fields[key].sys.id)
                            .map((asset) => asset.fields.file.url)[0];
                    }

                    if(assetURL) entryData[key] = assetURL;
                    else entryData[key] = entry.fields[key];
                });

                parsedEntries.push(entryData);
            });
        }

        return parsedEntries.filter((entry) => pageModules[entry.component])
            .map((entry) => React.createElement(pageModules[entry.component], entry));
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
