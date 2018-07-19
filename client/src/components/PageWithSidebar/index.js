import React, {Component, PropTypes} from 'react';

import Title from 'components/Title';
import Meta from 'components/Meta';

import styles from './styles.module.css';

export default class PageWithSidebar extends Component {
    static propTypes = {
        pageModules: PropTypes.object,
        pageData: PropTypes.object
    };

    renderChildren = (data, content) => {
        const {pageModules} = this.props;
        const modules = data.items[0].fields[content];
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
        const {fields} = pageData.items[0];

        return (
          <div className={styles.container}>
              <Title>{fields.title}</Title>
              <Meta>{[
                  {
                      property: 'og:title',
                      content: fields.title
                  },
                  {
                      property: 'og:description',
                      content: fields.metaDescription
                  },
                  {
                      property: 'description',
                      content: fields.metaDescription
                  },
                  {
                      name: 'keywords',
                      content: fields.metaKeywords && fields.metaKeywords.join(',')
                  }
              ]}</Meta>
              <div className={styles.row}>
                  <div className={styles.colLeft}>
                        {this.renderChildren(pageData, 'mainContentModules')}
                  </div>
                  <div className={styles.colRight}>
                      {this.renderChildren(pageData, 'sidebarContentModules')}
                  </div>
              </div>
          </div>
        );
    }
}
