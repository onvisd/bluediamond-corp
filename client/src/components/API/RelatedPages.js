import React, {Component, PropTypes} from 'react';

import RelatedPagesCmpt from '../RelatedPages';
import RelatedPageLinkCmpt from '../RelatedPageLink';

export default class RelatedPages extends Component {
    static propTypes = {
        data: PropTypes.shape({
            fields: PropTypes.shape({
                basePage: PropTypes.string,
                links: PropTypes.arrayOf(PropTypes.shape({
                    sys: PropTypes.shape({
                        id: PropTypes.string
                    })
                })).isRequired
            })
        }),
        entries: PropTypes.arrayOf(PropTypes.shape({
            sys: PropTypes.shape({
                id: PropTypes.string.isRequired
            }),
            fields: PropTypes.shape({
                headline: PropTypes.string,
                title: PropTypes.string,
                linkText: PropTypes.string,
                linkUrl: PropTypes.string,
                linkTheme: PropTypes.string,
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
    }

    render() {
        const {data, entries, assets} = this.props;

        const entryById = {};
        entries.forEach((entry) => {
            entryById[entry.sys.id] = entry.fields;
        });

        return (
            <RelatedPagesCmpt>
              {data.fields.links.map((link, i) => {
                  const entry = entryById[link.sys.id];

                  let image = null;
                  if(entry.backgroundImage) {
                      image = assets.filter((asset) =>
                          asset.sys.id === entry.backgroundImage.sys.id
                      )[0];
                  }

                  return (
                      <RelatedPageLinkCmpt
                          key={`relatedLink-${i}`}
                          headline={entry.headline}
                          title={entry.title}
                          linkText={entry.linkText}
                          linkUrl={entry.linkUrl}
                          linkTheme={entry.linkTheme}
                          backgroundImage={image && image.fields.file.url}
                      />
                  );
              })}
            </RelatedPagesCmpt>
        );
    }
}
