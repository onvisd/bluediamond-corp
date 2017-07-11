import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import styles from './styles.module.css';

@connect(
    (state) => ({
        responsive: state.responsive
    })
)
export default class Story extends Component {
    static propTypes = {
        desktopImage: PropTypes.string.isRequired,
        smallDesktopImage: PropTypes.string.isRequired,
        tabletImage: PropTypes.string.isRequired,
        mobileImage: PropTypes.string.isRequired
    };

    render() {
        const {
            desktopImage,
            smallDesktopImage,
            tabletImage,
            mobileImage,
            responsive
        } = this.props;

        let image = desktopImage;
        if(responsive.xsmall)
            image = mobileImage;
        else if(responsive.small)
            image = tabletImage;
        else if(responsive.medium)
            image = smallDesktopImage;

        return (
            <div
                className={styles.container}
                style={{
                    backgroundImage: `url(${image})`
                }}
            />
        );
    }
}
