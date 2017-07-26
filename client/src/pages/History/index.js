import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Track, TrackDocument} from 'react-track';
import {tween} from 'react-imation';
import {topTop, topBottom, bottomTop, calculateScrollY} from 'react-track/tracking-formulas';
import {scale} from 'react-imation/tween-value-factories';
import {Parallax} from 'react-parallax';
import classnames from 'classnames';

import Title from 'components/Title';
import GenericHero from 'components/GenericHero';
import RelatedPages from 'components/RelatedPages';
import RelatedPageLink from 'components/RelatedPageLink';

import styles from './styles.module.css';

import Diamond from 'images/icons/diamond.svg';
import Leaves from 'images/backgrounds/almond-leaf-right.png';
import Almonds from 'images/relatedLinks/almonds-on-left.png';
import Blossom from 'images/relatedLinks/blossom-on-right.png';
import Burlap from 'images/backgrounds/burlap.png';
import Paint from 'images/backgrounds/blue-paint.png';
import Hero from 'images/history/hero.png';
import Timeline1850 from 'images/history/timeline-1850.png';
import Timeline1910 from 'images/history/timeline-1910.png';
import Timeline1914 from 'images/history/timeline-1914.png';
import Timeline1915 from 'images/history/timeline-1915.jpg';
import Timeline1931First from 'images/history/timeline-1931-first.png';
import Timeline1931Second from 'images/history/timeline-1931-second.png';
import Timeline1949 from 'images/history/timeline-1949.jpg';
import Timeline1980 from 'images/history/timeline-1980.png';
import Timeline1986 from 'images/history/timeline-1986.jpg';
import Timeline2010 from 'images/history/timeline-2010.jpg';
import Timeline2013First from 'images/history/timeline-2013.jpg';
import Timeline2013Second from 'images/history/timeline-2013-2.jpg';
import TimelineToday from 'images/history/timeline-today.jpg';

@connect(
    (state) => ({
        responsive: state.responsive
    })
)
export default class HistoryPage extends Component {
    trackDocument(children) {
        return (
            <TrackDocument formulas={[
                calculateScrollY, topTop, topBottom, bottomTop
            ]}>
                {children}
            </TrackDocument>
        );
    }

    renderYear(
        scrollY, // eslint-disable-line no-shadow
        topBottom, // eslint-disable-line no-shadow
        container,
        children,
        first
    ) {
        if(!container)
            container = {};

        return (
            <div
                className={classnames(styles.container, container.className)}
                style={container.style}
            >
                <div className={styles.row}>
                    <div className={styles.left}>
                        {children.left}
                    </div>
                    <Track
                        className={styles.center}
                        formulas={[topBottom]}
                    >
                    {(Div, posTopBottom) => (
                        <Div className={styles.center}>
                            <div
                                style={
                                    tween(scrollY, [
                                        [posTopBottom, {
                                            transform: scale(first ? 1 : 0)
                                        }],
                                        [posTopBottom + 100, {
                                            transform: scale(1)
                                        }]
                                    ])
                                }
                            >
                                <Diamond className={styles.diamond} />
                            </div>
                        </Div>
                    )}
                    </Track>
                    <div className={styles.right}>
                        {children.right}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {responsive} = this.props;

        // eslint-disable-next-line no-shadow
        return this.trackDocument((scrollY, topTop, topBottom, bottomTop) => (
            <section className={styles.pageContainer}>
                <Title>Our History</Title>
                <GenericHero
                    headline="Our History"
                    title="How We've Grown"
                    backgroundImage={Hero}
                />
                <Track
                    className={styles.timeline}
                    formulas={[topTop, bottomTop]}
                >
                {(Div, posTopTop, posBottomBottom) => (
                    <Div>
                        <div
                            className={styles.line}
                            style={{
                                height: typeof window === 'undefined' ? 0 : Math.min(
                                    (scrollY - posTopTop) + window.innerHeight - 100,
                                    posBottomBottom - posTopTop + (responsive.small ? 50 : 105)
                                )
                            }}
                        />

                        {/* 1850 */}
                        {this.renderYear(scrollY, topBottom,
                            {
                                className: styles.isLeaves,
                                style: {backgroundImage: `url(${Leaves})`}
                            },
                            {
                                left: (
                                    <div className={`${styles.frame} ${styles.isFirst}`}>
                                        <div
                                            className={styles.image}
                                            style={{
                                                backgroundImage: `url(${Timeline1850})`
                                            }}
                                        />
                                    </div>
                                ),
                                right: (
                                    <div className={styles.content}>
                                        <h2>1850</h2>
                                        <p>
                                            California pioneers find an ideal Mediterranean
                                            climate in the soils of Sacramento, Monterey and Los
                                            Angeles, where they plant their first almonds, giving
                                            birth to an industry.
                                        </p>
                                    </div>
                                )
                            },
                            true
                        )}

                        {/* 1910 */}
                        {this.renderYear(scrollY, topBottom, null, {
                            left: (
                                <div className={styles.content}>
                                    <h2>1910</h2>
                                    <p>
                                        <em>The California Almond Growers Exchange</em> is
                                        founded, leading development of California's almond
                                        industry from a minor domestic specialty crop to the
                                        world leader in almond production and marketing.
                                    </p>
                                </div>
                            ),
                            right: (
                                <div className={styles.frame}>
                                    <div
                                        className={styles.image}
                                        style={{
                                            backgroundImage: `url(${Timeline1910})`
                                        }}
                                    />
                                </div>
                            )
                        })}

                        {/* 1914 */}
                        {this.renderYear(scrollY, topBottom, null, {
                            left: (
                                <div className={styles.frame}>
                                    <div
                                        className={styles.image}
                                        style={{
                                            backgroundImage: `url(${Timeline1914})`
                                        }}
                                    />
                                </div>
                            ),
                            right: (
                                <div className={styles.content}>
                                    <h2>1914</h2>
                                    <p>
                                        <em>The Exchange</em> opens a new receiving and packaging
                                        plant, which would later become the largest nut processing
                                        plant in the world, covering 33 city blocks on 90 acres.
                                    </p>
                                </div>
                            )
                        })}

                        {/* 1915 */}
                        {this.renderYear(scrollY, topBottom, null, {
                            left: (
                                <div className={styles.content}>
                                    <h2>1915</h2>
                                    <p>
                                        <em>The Exchange</em> adopts the blue diamond — the rarest
                                        in the world — as the symbol on its label, representing
                                        high quality and distinguishing it from Spanish and Italian
                                        imports.
                                    </p>
                                </div>
                            ),
                            right: (
                                <div className={styles.frame}>
                                    <div
                                        className={styles.image}
                                        style={{
                                            backgroundImage: `url(${Timeline1915})`
                                        }}
                                    />
                                </div>
                            )
                        })}

                        {/* 1931 */}
                        {this.renderYear(scrollY, topBottom,
                            {
                                className: styles.isBurlap,
                                style: {backgroundImage: `url(${Burlap})`}
                            },
                            {
                                left: (
                                    <div className={styles.frame}>
                                        <div
                                            className={styles.image}
                                            style={{
                                                backgroundImage: `url(${Timeline1931First})`
                                            }}
                                        />
                                    </div>
                                ),
                                right: (
                                    <div className={styles.content}>
                                        <h2>1931</h2>
                                        <p>
                                            20 million pounds of almonds are delivered by four
                                            thousand almond growers.
                                        </p>
                                    </div>
                                )
                            }
                        )}

                        {/* 1931 */}
                        {this.renderYear(scrollY, topBottom, null, {
                            left: (
                                <div className={styles.content}>
                                    <h2>1931</h2>
                                    <p>
                                        <em>The Exchange</em> innovates grading, shelling and other
                                        processes to increase market share. Mechanical test grading
                                        for quality is introduced.
                                    </p>
                                </div>
                            ),
                            right: (
                                <div className={styles.frame}>
                                    <div
                                        className={styles.image}
                                        style={{
                                            backgroundImage: `url(${Timeline1931Second})`
                                        }}
                                    />
                                </div>
                            )
                        })}

                        {/* 1949 */}
                        {this.renderYear(scrollY, topBottom, null, {
                            left: (
                                <div className={styles.frame}>
                                    <div
                                        className={styles.image}
                                        style={{
                                            backgroundImage: `url(${Timeline1949})`,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: '50% 100%'
                                        }}
                                    />
                                </div>
                            ),
                            right: (
                                <div className={styles.content}>
                                    <h2>1949</h2>
                                    <p>
                                        The 6-ounce can of Blue Diamond Smokehouse® almonds is
                                        first introduced.
                                    </p>
                                </div>
                            )
                        })}

                        {/* 1980 */}
                        {this.renderYear(scrollY, topBottom,
                            {
                                className: styles.isPaint,
                                style: {backgroundImage: `url(${Paint})`}
                            },
                            {
                                left: (
                                    <div className={styles.content}>
                                        <h2>1980</h2>
                                        <p>
                                            <em>The Exchange</em> officially becomes known as
                                            <em> Blue Diamond Growers.</em>
                                        </p>
                                    </div>
                                ),
                                right: (
                                    <div className={styles.frame}>
                                        <div
                                            className={styles.image}
                                            style={{
                                                backgroundImage: `url(${Timeline1980})`
                                            }}
                                        />
                                    </div>
                                )
                            }
                        )}

                        {/* 1986 */}
                        {this.renderYear(scrollY, topBottom, null, {
                            left: (
                                <div className={styles.frame}>
                                    <div
                                        className={styles.image}
                                        style={{
                                            backgroundImage: `url(${Timeline1986})`
                                        }}
                                    />
                                </div>
                            ),
                            right: (
                                <div className={styles.content}>
                                    <h2>1986</h2>
                                    <p>
                                        Blue Diamond launches <em>A Can A Week</em> ad campaign,
                                        in which real almond growers made the pitch "A can a week,
                                        that's all we ask."
                                    </p>
                                </div>
                            )
                        })}

                        {/* 2010 */}
                        {this.renderYear(scrollY, topBottom, null, {
                            left: (
                                <div className={styles.content}>
                                    <h2>2010</h2>
                                    <p>
                                        Over 1.5 billion pounds of crops delivered to keep up with
                                        record-breaking global demand.
                                    </p>
                                </div>
                            ),
                            right: (
                                <div className={styles.frame}>
                                    <div
                                        className={styles.image}
                                        style={{
                                            backgroundImage: `url(${Timeline2010})`
                                        }}
                                    />
                                </div>
                            )
                        })}

                        {/* 2013 */}
                        {this.renderYear(scrollY, topBottom, null, {
                            left: (
                                <div className={styles.frame}>
                                    <div
                                        className={styles.image}
                                        style={{
                                            backgroundImage: `url(${Timeline2013First})`
                                        }}
                                    />
                                </div>
                            ),
                            right: (
                                <div className={styles.content}>
                                    <h2>2013</h2>
                                    <p>
                                        Blue Diamond doubles capacity by opening a new plant in
                                        Turlock, California, designed to create more value-added
                                        global products using state of the art technology.
                                    </p>
                                </div>
                            )
                        })}

                        {/* 2013 */}
                        {this.renderYear(scrollY, topBottom,
                            {
                                className: styles.isLast
                            },
                            {
                                left: (
                                    <div className={styles.content}>
                                        <h2>2013</h2>
                                        <p>
                                            The Blue Diamond Almond Innovation Center opens,
                                            becoming the world's first and only research center
                                            dedicated to almond product innovation.
                                        </p>
                                    </div>
                                ),
                                right: (
                                    <div className={styles.frame}>
                                        <div
                                            className={styles.image}
                                            style={{
                                                backgroundImage: `url(${Timeline2013Second})`
                                            }}
                                        />
                                    </div>
                                )
                            }
                        )}
                    </Div>
                )}
                </Track>

                {/* Today */}
                {this.renderYear(scrollY, topBottom,
                    {
                        className: styles.today
                    },
                    {
                        left: (
                            <div className={styles.timelineRow}>
                                <h2>Today</h2>
                                <p className="t--type-prose">
                                    Working with a new generation of growers, Blue Diamond
                                    continues its legacy of bringing the benefits of almonds to
                                    the world.
                                </p>
                            </div>
                        ),
                        right: (
                            <Parallax
                                className={styles.todayImage}
                                bgImage={TimelineToday}
                                strength={200}
                            />
                        )
                    }
                )}

                <RelatedPages>
                    <RelatedPageLink
                        title="Almonds Are All We Do"
                        linkText="Our Craft"
                        linkUrl="/craft"
                        linkTheme="yellow"
                        backgroundImage={Almonds}
                    />
                    <RelatedPageLink
                        title="Quality is Our Legacy"
                        linkText="Our Story"
                        linkUrl="/manifesto"
                        linkTheme="blue"
                        backgroundImage={Blossom}
                    />
                </RelatedPages>
            </section>
        ));
    }
}
