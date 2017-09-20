import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Parallax} from 'react-parallax';

import ButtonDropdown from 'components/ButtonDropdown';

import callFloodlight from 'tools/callFloodlight';
import image from 'tools/image';

import styles from './styles.module.css';

@connect(
    (state) => ({
        responsive: state.responsive
    })
)
export default class Hero extends Component {
    static propTypes = {
        brand: PropTypes.object.isRequired,
        category: PropTypes.object.isRequired,
        product: PropTypes.object.isRequired,
        shopLinks: PropTypes.array.isRequired
    }

    render() {
        const {brand, category, product, shopLinks, responsive} = this.props;

        let size;
        if(responsive.xlarge)
            size = 'xl';
        else if(responsive.large)
            size = 'l';
        else if(responsive.small)
            size = 's';
        else if(responsive.xsmall)
            size = 'xs';
        else
            size = 's';

        return (
            <div>
                <div className={styles.hero}>
                    <Parallax
                        className={styles.background}
                        bgImage={image(
                            category.fields.heroBackground.fields.file.url,
                            {
                                format: 'jpg',
                                quality: 70,
                                progressive: true
                            }
                        )}
                        strength={100}
                    />
                    <div
                        className={styles.shelf}
                        style={{
                            backgroundImage: `url(${image(
                                category.fields.productShelfImage.fields.file.url,
                                {
                                    width: ({
                                        xl: 4096,
                                        l: 2048,
                                        s: 1024,
                                        xs: 600
                                    })[size]
                                }
                            )})`
                        }}
                    />
                </div>
                <div className={classnames(
                    styles.productHero,
                    styles[category.fields.productTextColor]
                )}>
                    <div className={styles.product}>
                        <div className={styles.photo}>
                            <img
                                src={product.fields.productPhotos[0].fields.file.url}
                                alt={product.fields.name}
                            />
                        </div>
                        <div className={styles.info}>
                            <div>
                                <div className={classnames(
                                    styles.tag,
                                    styles[brand.fields.themeColor]
                                )}>
                                    {category.fields.name}
                                </div>
                                <h1 className={classnames(
                                    styles.name,
                                    styles[category.fields.productTextColor]
                                )}>
                                    {product.fields.name}
                                </h1>
                                <ButtonDropdown
                                    items={shopLinks}
                                    theme={brand.fields.themeColor}
                                    layout="wide"
                                    onClick={(evt, name) => {
                                        callFloodlight.click('4035228', 'fy18s0', `${
                                            name
                                                .replace(/[^a-z0-9]/i, '')
                                                .slice(0, 5)
                                                .toLowerCase()
                                        }0`);
                                    }}
                                    dropUp
                                >
                                    Buy Online
                                </ButtonDropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
