import React, {Component, PropTypes} from 'react';
import {Title} from 'react-isomorphic-render';
import axios from 'axios';

class Page extends Component {
    static propTypes = {
        slug: PropTypes.string.isRequired,
        children: PropTypes.node
    }

    state = {
        data: null
    }

    componentDidMount() {
        axios.get(`/api/${this.props.slug}`)
            .then((response) => {
                this.setState({data: response.data});
            })
            .catch((err) => {
                console.log('oops!', err);
            });
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
        const {data} = this.state;

        return (
            <div>
                {data && <Title>{data.items[0].fields.title}</Title>}
                {data && this.parseEntries(data)}
            </div>
        );
    }
}

export default Page;
