import React, {Component, PropTypes} from 'react';
import marked from 'marked';
import styles from './styles.module.css';

export default class FullBleedImage extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    render() {
        const {title, description, image} = this.props;

        return (
            <div className={styles.container} style={{backgroundImage: `url(${image})`}}>
                <div className={styles.innerContainer}>
                    <h1 className="t--type-display-one">{title}</h1>
                    <div
                        className="t--type-prose"
                        dangerouslySetInnerHTML={this.renderMarkup(description)}
                    />
                </div>
            </div>
        );
    }
}
