import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

import styles from './styles.module.css';

@connect(
    (state) => ({
        responsive: state.responsive
    })
)
export default class StoreHero extends Component {
    static propTypes = {
        desktopImage: PropTypes.string.isRequired,
        smallDesktopImage: PropTypes.string.isRequired,
        tabletImage: PropTypes.string.isRequired,
        mobileImage: PropTypes.string.isRequired,
        isRecipes: PropTypes.bool
    };

    static defaultProps = {
        isRecipes: false
    };

    render() {
        const {
            desktopImage,
            smallDesktopImage,
            tabletImage,
            mobileImage,
            isRecipes,
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
                className={classnames(styles.container, {[styles.recipes]: isRecipes})}
                style={{
                    backgroundImage: `url(${image})`
                }}
            />
        );
    }
}
