import React, {Component, PropTypes} from 'react';
import Button from '../Button';
import marked from 'marked';
import styles from './styles.module.css';

export default class RelatedPageLink extends Component {
    static propTypes = {
        headline: PropTypes.string,
        title: PropTypes.string.isRequired,
        linkText: PropTypes.string.isRequired,
        linkUrl: PropTypes.string.isRequired,
        linkTheme: PropTypes.string.isRequired,
        backgroundImage: PropTypes.string
    }

    static defaultProps = {
        backgroundImage: ''
    }

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    render() {
        const {
            headline,
            title,
            linkText,
            linkUrl,
            linkTheme,
            backgroundImage
        } = this.props;

        const style = {
            backgroundImage: `url(${backgroundImage})`
        };

        return (
            <div className={styles.container} style={style}>
                <div style={{width: '100%'}}>
                    {(title && headline) &&
                      <div>
                        <h1 className={styles.headline}>{headline}</h1>
                        <div
                            className={styles.title}
                            dangerouslySetInnerHTML={this.renderMarkup(title)}
                        />
                      </div>
                    }
                    {(title && !headline) && <h1>{title}</h1>}
                    {(!title && headline) &&
                        <div
                            className={styles.title}
                            dangerouslySetInnerHTML={this.renderMarkup(title)}
                        />
                    }
                    <Button href={linkUrl} theme={linkTheme}>
                        {linkText}
                    </Button>
                </div>
            </div>
        );
    }
}
