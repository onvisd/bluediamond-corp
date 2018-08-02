import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import marked from 'marked';
import classnames from 'classnames';

import ButtonBar from '../ButtonBar';
import styles from './styles.module.css';

@connect(
    (state) => ({
        responsive: state.responsive
    })
)
export default class ResponsiveHero extends Component {
    static propTypes = {
        desktopBackgroundImage: PropTypes.string.isRequired,
        tabletBackgroundImage: PropTypes.string.isRequired,
        mobileBackgroundImage: PropTypes.string.isRequired,
        imageAlt: PropTypes.string,
        content: PropTypes.string,
        buttons: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
            contentHeight: 0,
            imageHeight: 0
        };

        this.onResize = this.onResize.bind(this);
        this.getImageHeight = this.getImageHeight.bind(this);
        this.getContentHeight = this.getContentHeight.bind(this);
    }

    renderMarkup(field) {
        return {__html: marked(field)};
    }

    getImageHeight() {
        if(this.image) {
            this.setState({
                imageHeight: this.image.clientHeight
            });
        }
    }

    getContentHeight() {
        if(this.content) {
            this.setState({
                contentHeight: this.content.clientHeight
            });
        }
    }

    onResize() {
        if(this.rqf) return;
        if(typeof window !== 'undefined') {
            this.rqf = window.requestAnimationFrame(() => {
                this.rqf = null;
                this.getImageHeight();
                this.getContentHeight();
            });
        }
    }

    componentDidMount() {
        this.getImageHeight();
        this.getContentHeight();
        if(typeof window !== 'undefined')
            window.addEventListener('resize', this.onResize, false);
    }

    componentWillUnmount() {
        if(typeof window !== 'undefined')
            window.removeEventListener('resize', this.onResize);
    }

    render() {
        const {
          desktopBackgroundImage,
          tabletBackgroundImage,
          mobileBackgroundImage,
          imageAlt,
          content,
          buttons,
          responsive
        } = this.props;
        const {contentHeight, imageHeight} = this.state;

        let image = desktopBackgroundImage;
        if(responsive.xsmall)
            image = mobileBackgroundImage;
        else if(responsive.small)
            image = tabletBackgroundImage;

        const height = imageHeight > contentHeight ? imageHeight : contentHeight;

        return (
            <div className={styles.container} style={{backgroundImage: `url(${image})`, minHeight: `${height}px`}}>
                <div className={styles.innerContainer}>
                    <div
                        className={styles.contentWrap}
                        ref={(ref) => this.content = ref} // eslint-disable-line
                    >
                        {content &&
                            <div
                                className={styles.content}
                                dangerouslySetInnerHTML={this.renderMarkup(content)}
                            />
                        }
                        {buttons && (
                            <ButtonBar
                                customStyle={{marginBottom: 0}}
                                align="center"
                                buttons={[
                                    {
                                        text: buttons.fields.buttonOneText,
                                        link: buttons.fields.buttonOneLink,
                                        style: buttons.fields.buttonOneStyle,
                                        visibility: Boolean(buttons.fields.buttonOneText)
                                    },
                                    {
                                        text: buttons.fields.buttonTwoText,
                                        link: buttons.fields.buttonTwoLink,
                                        style: buttons.fields.buttonTwoStyle,
                                        visibility: Boolean(buttons.fields.buttonTwoText)
                                    },
                                    {
                                        text: buttons.fields.buttonThreeText,
                                        link: buttons.fields.buttonThreeLink,
                                        style: buttons.fields.buttonThreeStyle,
                                        visibility: Boolean(buttons.fields.buttonThreeText)
                                    }
                                ]}
                            />
                        )}
                    </div>
                </div>
                <img
                    src={image}
                    className={classnames(
                        styles.background,
                        contentHeight > imageHeight && styles.hidden
                    )}
                    alt={imageAlt}
                    ref={(ref) => this.image = ref} // eslint-disable-line
                />
            </div>
        );
    }
}
