import React, {Component, PropTypes} from 'react';
import RelatedPageLink from '../API/RelatedPageLink';
import styles from './styles.module.css';

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

    render() {
        const {data, entries, assets} = this.props;

        return (
            <div className={styles.container}>
                {data.fields.links.map((link, idx) => (
                    <RelatedPageLink
                        linkId={link.sys.id}
                        entries={entries}
                        assets={assets}
                        key={`relatedLink${idx}`}
                    />
                ))}
                <div className={styles.separator} />
            </div>
        );
    }
}
