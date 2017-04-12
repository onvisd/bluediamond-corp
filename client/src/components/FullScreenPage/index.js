import React, {Component, PropTypes} from 'react';
import {Title} from 'react-isomorphic-render';

export default class FullScreenPage extends Component {
    static propTypes = {
        pageModules: PropTypes.object,
        pageData: PropTypes.object
    };

    render() {
        const {pageData} = this.props;
        const {pageModules} = this.props;
        const mdle = pageData.items[0].fields.module;
        const includes = pageData.includes;
        const entries = includes.Entry;

        const parsedModule = entries.filter((entry) =>
            entry.sys.id === mdle.sys.id
        ).map((entry) => ({
            component: entry.sys.contentType.sys.id.replace('pageModule', ''),
            data: entry
        }))[0];

        return (
            <div>
                <Title>{pageData.items[0].fields.title}</Title>
                {pageModules[parsedModule.component]
                    ? React.createElement(pageModules[parsedModule.component], {
                        data: parsedModule.data,
                        assets: includes.Asset
                    })
                    : (<div>No content found.</div>)
                }
            </div>
        );
    }
}
