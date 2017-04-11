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
    DocumentLink: require('../components/API/DocumentLink').default,
    Gallery: require('../components/API/ImageGallery').default,
    Hero: require('../components/API/PageHero').default,
    ButtonBar: require('../components/API/ButtonBar').default
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
