import React, {Component, PropTypes} from 'react';

import RelatedPagesCmpt from '../RelatedPages';

export default class RelatedPages extends Component {
    static propTypes = {
        data: PropTypes.shape({
            entry: PropTypes.shape({
                fields: PropTypes.shape({
                    links: PropTypes.arrayOf(PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string.isRequired
                        })
                    }))
                })
            }),
            entries: PropTypes.arrayOf(PropTypes.shape({
                sys: PropTypes.shape({
                    id: PropTypes.string.isRequired
                }),
                fields: PropTypes.shape({
                    headline: PropTypes.string,
                    title: PropTypes.string.isRequired,
                    linkText: PropTypes.string.isRequired,
                    linkUrl: PropTypes.string.isRequired,
                    linkTheme: PropTypes.string.isRequired,
                    backgroundImage: PropTypes.shape({
                        sys: PropTypes.shape({
                            id: PropTypes.string
                        })
                    })
                })
            })),
            assets: PropTypes.arrayOf(PropTypes.shape({
                sys: PropTypes.shape({
                    id: PropTypes.string
                }),
                fields: PropTypes.shape({
                    file: PropTypes.shape({
                        url: PropTypes.string
                    })
                })
            }))
        })
    }

    static defaultProps = {
        entries: PropTypes.arrayOf(PropTypes.shape({
            fields: PropTypes.shape({
                headline: '',
                backgroundImage: PropTypes.shape({
                    sys: PropTypes.shape({
                        id: ''
                    })
                })
            })
        })),
        assets: PropTypes.arrayOf(PropTypes.shape({
            sys: PropTypes.shape({
                id: ''
            }),
            fields: PropTypes.shape({
                file: PropTypes.shape({
                    url: ''
                })
            })
        }))
    }

    render() {
        const {data, entries, assets} = this.props;

        return <RelatedPagesCmpt data={data} entries={entries} assets={assets} />;
    }
}
