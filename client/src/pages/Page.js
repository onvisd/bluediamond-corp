import React, {Component} from 'react';
import {connect} from 'react-redux';
import {preload} from 'react-isomorphic-render';

import {connector, getPageData} from '../state/pageData';
import NotFound from './Error/404';

// require pageModules ahead of time here using the format
// PageModuleName: require('../components/API/PageModuleName').default
const pageModules = {
    BrandCategory: require('../components/API/BrandCategory').default,
    ButtonBar: require('../components/API/ButtonBar').default,
    DocumentLink: require('../components/API/DocumentLink').default,
    FullBleedImage: require('../components/API/FullBleedImage').default,
    Gallery: require('../components/API/ImageGallery').default,
    GenericHero: require('../components/API/GenericHero').default,
    Hero: require('../components/API/PageHero').default,
    IFrame: require('../components/API/IFrame').default,
    ImageCluster: require('../components/API/ImageCluster').default,
    LinkedPageWithMedia: require('../components/API/LinkedPageMedia').default,
    LinkedPageWithSummary: require('../components/API/LinkedPageSummary').default,
    ParagraphWithHeader: require('../components/API/ParagraphWithHeader').default,
    ParagraphWithImage: require('../components/API/ParagraphWithImage').default,
    RelatedPages: require('../components/API/RelatedPages').default,
    RelatedPageLink: require('../components/API/RelatedPageLink').default
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
