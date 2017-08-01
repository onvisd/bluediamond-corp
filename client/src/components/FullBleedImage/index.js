import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import marked from 'marked';
import styles from './styles.module.css';

@connect(
    (state) => ({
        responsive: state.responsive
    })
)
export default class FullBleedImage extends Component {
    static propTypes = {
        title: PropTypes.string,
        description: PropTypes.string,
        image: PropTypes.string.isRequired
    }

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    render() {
        const {title, description, image, imageTablet, imageMobile, responsive} = this.props;

        let displayImage = image;
        if(responsive.xsmall && imageMobile)
            displayImage = imageMobile;
        else if(responsive.small && imageTablet)
            displayImage = imageTablet;

        return (
            <div className={styles.container} style={{backgroundImage: `url(${displayImage})`}}>
                <div className={styles.innerContainer}>
                    {title && <h1 className="t--type-display-one">{title}</h1>}
                    {description && <div
                        className="t--type-prose"
                        dangerouslySetInnerHTML={this.renderMarkup(description)}
                    />}
                </div>
            </div>
        );
    }
}
