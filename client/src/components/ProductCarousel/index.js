import React, {Component, PropTypes} from 'react';
import {Link} from 'react-isomorphic-render';
import {ViewPager, Frame, Track, View} from 'react-view-pager';
import classnames from 'classnames';
import styles from './styles.module.css';

export default class ProductCarousel extends Component {
    static propTypes = {
        products: PropTypes.arrayOf(PropTypes.shape({

        }))
    }

    state = {
        activeTab: 0
    }

    handleSwipe = (currentIndices) => {
        this.setState(() => ({
            activeTab: currentIndices[0]
        }));
    }

    render() {
        const {activeTab} = this.state;
        const {products} = this.props;

        return (
            <div className={styles.container}>
                <ul className={styles.productList}>
                    {products.map((product) => (
                        <li className={styles.product} key={product._id}>
                            <Link to={`/${product.slug}`}>
                                <img src={product.productPhotos[0].file.url} />
                                {product.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ViewPager className={styles.productListMobile}>
                    <Frame style={{width: '100%'}}>
                        <Track
                            viewsToShow="auto"
                            align={0.5}
                            onViewChange={this.handleSwipe}
                            style={{display: 'flex'}}
                            ref={(track) => {
                                this.carouselTrack = track;
                            }}
                        >
                            {products.map((product) => (
                                <View style={{flex: '1'}} key={product._id}>
                                    <div className={styles.product}>
                                        <Link to={`/${product.slug}`}>
                                            <img src={product.productPhotos[0].file.url} />
                                            {product.name}
                                        </Link>
                                    </div>
                                </View>
                            ))}
                        </Track>
                    </Frame>
                </ViewPager>
                <div className={styles.overlay} />
                {products.length > 1 &&
                    <div className={styles.tabs}>
                        {products.map((product, idx) => (
                            <div
                                key={product._id}
                                className={classnames(styles.tab, {
                                    [styles.tabActive]: activeTab === idx
                                })}
                                onClick={() => {
                                    this.handleActiveTab(idx);
                                }}
                            />
                        ))}
                    </div>
                }
            </div>
        );
    }
}
