import React, {Component, PropTypes} from 'react';
import marked from 'marked';

import styles from './styles.module.css';

export default class ParagraphWithImage extends Component {
    static propTypes = {
        header: PropTypes.string.isRequired,
        paragraph: PropTypes.string.isRequired,
        imageFile: PropTypes.string.isRequired,
        imageName: PropTypes.string.isRequired,
        imageDescription: PropTypes.string.isRequired,
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

        const alignClass = `styles.${imageAlign}`;
        const alignCheck = imageAlign ? alignClass : '';

        return (
            <div className={styles.container}>
                <h3>{header}</h3>

                {imageDescription &&
                    <figure className={alignCheck}>
                        <img src={imageFile} alt={imageName} />
                        <figcaption>{imageDescription}</figcaption>
                    </figure>
                }

                {!imageDescription &&
                    <img src={imageFile} alt={imageName} className={alignCheck} />
                }

                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={this.renderMarkup(paragraph)}
                />
            </div>
        );
    }
}
