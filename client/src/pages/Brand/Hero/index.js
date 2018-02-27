import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import classnames from 'classnames';
import styles from './styles.module.css';

@connect(
    (state) => ({
        responsive: state.responsive
    })
)
export default class Hero extends Component {
    static PropTypes = {
        logo: PropTypes.string,
        mobileLogo: PropTypes.string,
        logoPosition: PropTypes.stirng,
        image: PropTypes.string.isRequired,
        textColor: PropTypes.string.isRequired,
        tagline: PropTypes.string,
        flavorLine: PropTypes.string,
        title: PropTypes.string,
        brand: PropTypes.string
    }

    render() {
        const {
            responsive,
            logo,
            mobileLogo,
            logoPosition,
            image,
            textColor,
            tagline,
            flavorLine,
            title,
            brand
        } = this.props;

        return (
            <div>
                <div
                    className={classnames(
                            styles.container,
                            styles[textColor],
                            styles[logoPosition],
                            styles[brand]
                    )}
                    style={{backgroundImage: `url(${image})`}}
                >
                    <div className={classnames(styles.innerContainer, styles[logoPosition])}>
                        {!responsive.small && logo &&
                            <img src={logo} className={classnames(styles.logo, styles[logoPosition])} alt={title} />
                        }
                        {responsive.small && mobileLogo &&
                            <img src={mobileLogo} className={classnames(styles.logo, styles[logoPosition])} alt={title} />
                        }
                        {title && <h2>{title}</h2>}
                        {tagline && <p>{tagline}</p>}
                    </div>
                    {flavorLine && <div className={styles.flavor}>{flavorLine}</div>}
                </div>
            </div>
        );
    }
}
