import React from 'react';
import {Title} from 'react-isomorphic-render';

import GenericHero from '../../components/GenericHero';
import RelatedPages from '../../components/RelatedPages';
import RelatedPageLink from '../../components/RelatedPageLink';

import styles from './styles.module.css';

import Diamond from '../../../assets/images/icons/diamond.svg';
import Leaves from '../../../assets/images/backgrounds/almond-leaf-right.png';
import Almonds from '../../../assets/images/backgrounds/almonds-left.png';
import Texture from '../../../assets/images/backgrounds/texture.png';
import Blossom from '../../../assets/images/backgrounds/almond-blossom.png';
import Burlap from '../../../assets/images/backgrounds/burlap.png';
import Paint from '../../../assets/images/backgrounds/blue-paint.png';
import Hero from '../../../assets/images/history/hero.png';
import Timeline1850 from '../../../assets/images/history/timeline-1850.png';
import Timeline1910 from '../../../assets/images/history/timeline-1910.png';
import Timeline1914 from '../../../assets/images/history/timeline-1914.png';
import Timeline1931First from '../../../assets/images/history/timeline-1931-first.png';
import Timeline1931Second from '../../../assets/images/history/timeline-1931-second.png';
import Timeline1980 from '../../../assets/images/history/timeline-1980.png';
import TimelineEmpty from '../../../assets/images/history/timeline-empty.png';

export default () => (
    <section className={styles.pageContainer}>
        <Title>History Page</Title>
        <GenericHero
            headline="Our History"
            title="How we've grown"
            backgroundImage={Hero}
        />
        <div className={styles.timeline}>

            {/* 1850 */}
            <div className={`${styles.container} ${styles.isLeaves}`} style={{
                backgroundImage: `url(${Leaves}), url(${Texture})`
            }}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={`${styles.frame} ${styles.isFirst}`}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${Timeline1850})`
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.timebarWrap}>
                            <div className={`${styles.timebar} ${styles.isStart}`}>
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.content}>
                            <h2>1850</h2>
                            <p>
                                California pioneers find an ideal Mediterranean climate in the
                                soils of Sacramento, Monterey and Los Angeles, where they plant
                                their first almonds, giving birth to an industry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 1910 */}
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.content}>
                            <h2>1910</h2>
                            <p>
                                <em>The California Almond Growers Exchange</em> is founded, leading development of California's almond industry from a minor domestic specialty crop to the world leader in almond production and marketing.
                            </p>
                        </div>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.timebarWrap}>
                            <div className={styles.timebar}>
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.frame}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${Timeline1910})`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 1914 */}
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.frame}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${Timeline1914})`
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.timebarWrap}>
                            <div className={styles.timebar}>
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>

                        <div className={styles.content}>
                            <h2>1914</h2>
                            <p>
                                <em>The Exchange</em> opens a new receiving and packaging plant, which would later become the largest nut processing plant in the world, covering 33 city blocks on 90 acres.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 1915 */}
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.content}>
                            <h2>1915</h2>
                            <p>
                                <em>The Exchange</em> adopts the blue diamond — the rarest in the world — as the symbol on its label, representing high quality and distinguishing it from Spanish and Italian imports.
                            </p>
                        </div>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.timebarWrap}>
                            <div className={styles.timebar}>
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.frame}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${TimelineEmpty})`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 1931 */}
            <div className={`${styles.container} ${styles.isBurlap}`} style={{
                backgroundImage: `url(${Burlap}), url(${Texture})`
            }}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.frame}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${Timeline1931First})`
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.timebarWrap}>
                            <div className={styles.timebar}>
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.content}>
                            <h2>1931</h2>
                            <p>
                                20 million pounds of almonds are delivered by four thousand
                                almond growers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 1931 */}
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.content}>
                            <h2>1931</h2>
                            <p>
                                <em>The Exchange</em> innovates grading, shelling and other processes to increase market share. Mechanical test grading for quality is introduced.
                            </p>
                        </div>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.timebarWrap}>
                            <div className={styles.timebar}>
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.frame}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${Timeline1931Second})`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 1949 */}
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.frame}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${TimelineEmpty})`
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.timebarWrap}>
                            <div className={styles.timebar}>
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.content}>
                            <h2>1949</h2>
                            <p>
                                The 6-ounce can of Blue Diamond Smokehouse almonds is first
                                introduced.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 1980 */}
            <div className={`${styles.container} ${styles.isPaint}`} style={{
                backgroundImage: `url(${Paint}), url(${Texture})`
            }}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.content}>
                            <h2>1980</h2>
                            <p>
                                <em>The Exchange</em> officially becomes known as Blue Diamond Growers.
                            </p>
                        </div>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.timebarWrap}>
                            <div className={styles.timebar}>
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.frame}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${Timeline1980})`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 1995 */}
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.frame}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${TimelineEmpty})`
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.timebarWrap}>
                            <div className={styles.timebar}>
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.content}>
                            <h2>1995</h2>
                            <p>
                                Blue Diamond Growers launches a 10-year, $30 million plant
                                improvement program resulting in the creation of an enclosed,
                                gated campus with security.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2010 */}
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.content}>
                            <h2>2010</h2>
                            <p>
                                Over 1.5 billion pounds of crops delivered to keep up with
                                record-breaking global demand.
                            </p>
                        </div>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.timebarWrap}>
                            <div className={styles.timebar}>
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.frame}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${TimelineEmpty})`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2013 */}
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.frame}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${TimelineEmpty})`
                                }}
                            />
                        </div>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.timebarWrap}>
                            <div className={styles.timebar}>
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.content}>
                            <h2>2013</h2>
                            <p>
                                Blue Diamond doubles capacity by opening a new plant in Turlock,
                                California, designed to create more value-added global products
                                using state of the art technology.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2013 */}
            <div className={`${styles.container} ${styles.isLast}`}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.content}>
                            <h2>2013</h2>
                            <p>
                                The Blue Diamond Almond Innovation Center opens, becoming the
                                world's first and only research center dedicated to almond
                                product innovation.
                            </p>
                        </div>
                    </div>
                    <div className={styles.center}>
                        <div className={styles.timebarWrap}>
                            <div className={styles.timebar}>
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.frame}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${TimelineEmpty})`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Today */}
        <div className={styles.today}>
            <div className="l--container">
                <div className={styles.timelineRow}>
                    <div className="l--col-5 l--col-12-at-s">
                        <div className={`${styles.timebarWrap} ${styles.isEnd}`}>
                            <div className={`${styles.timebar} ${styles.isEnd}`}>
                                <Diamond />
                            </div>
                        </div>
                        <h2>Today</h2>
                        <p className="t--type-prose">
                            A final line about the generations of farmers that make Blue Diamond
                            great.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <RelatedPages>
            <RelatedPageLink
                title="Almonds are all we do"
                linkText="Our Craft"
                linkUrl="/our-craft"
                linkTheme="yellow"
                backgroundImage={Almonds}
            />
            <RelatedPageLink
                title="Quality is our legacy"
                linkText="Read our Manifesto"
                linkUrl="/manifesto"
                linkTheme="blue"
                backgroundImage={Blossom}
            />
        </RelatedPages>
    </section>
);
