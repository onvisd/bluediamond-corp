import React, {Component, PropTypes} from 'react';

class Page extends Component {
    static propTypes = {
        children: PropTypes.node
    }

    parseEntries = (data) => {
        const modules = data.items[0].fields.modules;
        const includes = data.includes;
        const entries = includes.Entry;
        const assets = includes.Asset;

        const parsedEntries = {};
        if(modules && modules.length) {
            entries.forEach((entry) => {
                const entryId = entry.sys.contentType.sys.id;
                const entryData = {id: entryId};
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

                parsedEntries[entryId.replace('pageModule', '')] = entryData;
            });
        }

        return React.Children.map(this.props.children, (child) =>
            React.cloneElement(child, {
                ...parsedEntries[child.type.name]
            })
        );
    }

    render() {
        const {data} = this.props;

        return (
            <div>
                {data && this.parseEntries(data)}
            </div>
        );
    }
}

export default Page;
