import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

import styles from './styles.module.css';

export default class IFrame extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        width: PropTypes.string,
        height: PropTypes.string.isRequired,
        style: PropTypes.object,
        className: PropTypes.any
    };

    static defaultProps = {
        width: '100%',
        style: {}
    };

    render() {
        const {url, width, height, style, className} = this.props;

        const styleProps = {width, ...style};
        let classes = className;

        if(height === 'full')
            classes = classnames(styles.fullHeight, className);
        else
            styleProps.height = height;

        return (
            <iframe
                frameBorder={0}
                src={url}
                target="_parent"
                allowFullScreen={true}
                style={styleProps}
                className={classes}
            />
        );
    }
}
