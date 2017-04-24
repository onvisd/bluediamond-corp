import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';

import {connector, getPageData} from '../redux/pageData';
import NotFound from './NotFound';

// require pageModules ahead of time here using the format
// PageModuleName: require('../components/API/PageModuleName').default
const pageModules = {
    ButtonBar: require('../components/API/ButtonBar').default,
    DocumentLink: require('../components/API/DocumentLink').default,
    Hero: require('../components/API/PageHero').default,
    Gallery: require('../components/API/ImageGallery').default,
    GenericHero: require('../components/API/GenericHero').default,
    ParagraphWithHeader: require('../components/API/ParagraphWithHeader').default,
    ParagraphWithImage: require('../components/API/ParagraphWithImage').default
};

const pageLayouts = {
    page: require('../components/Page').default,
    pageWithSidebar: require('../components/PageWithSidebar').default,
    fullScreenPage: require('../components/FullScreenPage').default
};

@preload(({dispatch, location}) => dispatch(getPageData(location.pathname, location.search)))
@connect(
    (state) => ({...connector(state.pageData)}),
    {getPageData}
)
export default class Page extends Component {
    render() {
        const {pageData} = this.props;

        if(pageData.items.length) {
            return React.createElement(
                pageLayouts[pageData.items[0].sys.contentType.sys.id] || NotFound, {
                    pageModules,
                    pageData
                }
            );
        }

        return <NotFound />;
    }
}
