import React from 'react';

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
                backgroundImage: `url(${Leaves})`
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
                                    backgroundImage: `url(${Timeline1915})`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 1931 */}
            <div className={`${styles.container} ${styles.isBurlap}`} style={{
                backgroundImage: `url(${Burlap})`
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
                                    backgroundImage: `url(${Timeline1949})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: '50% 100%'
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
                                The 6-ounce can of Blue Diamond Smokehouse® almonds is first
                                introduced.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 1980 */}
            <div className={`${styles.container} ${styles.isPaint}`} style={{
                backgroundImage: `url(${Paint})`
            }}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.content}>
                            <h2>1980</h2>
                            <p>
                                <em>The Exchange</em> officially becomes known as <em>Blue Diamond Growers.</em>
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

            {/* 1986 */}
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <div className={styles.frame}>
                            <div
                                className={styles.image}
                                style={{
                                    backgroundImage: `url(${Timeline1986})`
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
                            <h2>1986</h2>
                            <p>
                                Blue Diamond launches <em>A Can A Week</em> ad campaign,
                                in which real almond growers made the pitch "A can a week,
                                that's all we ask."
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
                                    backgroundImage: `url(${Timeline2010})`
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
                                    backgroundImage: `url(${Timeline2013First})`
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
                                    backgroundImage: `url(${Timeline2013Second})`
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Today */}
        <div
            className={styles.today}
        >
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
                            Working with a new generation of growers, Blue Diamond continues
                            its legacy of bringing the benefits of almonds to the world.
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.todayImage} style={{
                backgroundImage: `url(${TimelineToday})`
            }} />
        </div>

        <RelatedPages>
            <RelatedPageLink
                title="Almonds are all we do"
                linkText="Our Craft"
                linkUrl="/craft"
                linkTheme="yellow"
                backgroundImage={Almonds}
            />
            <RelatedPageLink
                title="Quality is our legacy"
                linkText="Our Story"
                linkUrl="/manifesto"
                linkTheme="blue"
                backgroundImage={Blossom}
            />
        </RelatedPages>
    </section>
);
