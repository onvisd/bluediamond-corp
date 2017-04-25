import React, {Component, PropTypes} from 'react';
import marked from 'marked';
import classNames from 'classnames';

import styles from './styles.module.css';

export default class ParagraphWithImage extends Component {
    static propTypes = {
        header: PropTypes.string.isRequired,
        paragraph: PropTypes.string.isRequired,
        imageFile: PropTypes.string.isRequired,
        imageName: PropTypes.string.isRequired,
        imageDescription: PropTypes.string,
        imageAlign: PropTypes.string.isRequired
    }

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    render() {
        const {
            header,
            paragraph,
            imageFile,
            imageName,
            imageDescription,
            imageAlign
        } = this.props;

        return (
            <div className={styles.container}>
                <div className={classNames(styles.content, {[styles[imageAlign]]: imageAlign})}>
                    <h2 className="t--type-display-two">{header}</h2>
                    <div
                        className={`${styles.description} t--type-prose`}
                        dangerouslySetInnerHTML={this.renderMarkup(paragraph)}
                    />
                </div>

                <div className={classNames(styles.imageWrap, {[styles[imageAlign]]: imageAlign})}>
                    {imageDescription &&
                        <figure>
                            <img src={imageFile} alt={imageName} />
                            <figcaption>{imageDescription}</figcaption>
                        </figure>
                    }

                    {!imageDescription &&
                        <img src={imageFile} alt={imageName} />
                    }
                </div>
            </div>
        );
    }
}
