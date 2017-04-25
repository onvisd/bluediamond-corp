import React from 'react';
import {Title} from 'react-isomorphic-render';

import GenericHero from '../components/GenericHero';
import RelatedPageLink from '../components/RelatedPageLink';

import Diamond from '../../assets/images/diamond.svg';

export default () => (
    <section className="content">
        <Title>History Page</Title>
        <GenericHero
            headline="Our History"
            title="Perfected Over Generations"
            backgroundImage="http://images.contentful.com/v50q1scweni9/3fypafNNVYK2SAgEyeoCQe/b646ac4edfbc6e14d58f9eef7a30c65b/cool.jpg"
        />
        <div className="history--timeline">
            <div className="l--container">
                <div className="l--row history--timeline-row">
                    <div className="l--col-auto l--col-12-at-s">
                        <img src="http://images.contentful.com/v50q1scweni9/2w6sjY5K36ym6O4ySWQ8cm/6a0596a785a10432ff3cab40cd52ca18/Space.jpg" className="is-left" />
                    </div>
                    <div className="l--col-1 l--hidden-at-s">
                        <div className="history--timebar-wrap">
                            <div className="history--timebar is-start">
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className="l--col-auto l--col-12-at-s is-right">
                        <div className="timeline--content">
                            <h2>1910</h2>
                            <p className="t--type-prose">
                                Founded in 1910 as the California Almond Grower's Exchange,
                                the organization claims to be the world's largest tree nut
                                processing and marketing company.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="l--container">
                <div className="l--row history--timeline-row">
                    <div className="l--col-auto l--col-12-at-s is-left">
                        <div className="timeline--content">
                            <h2>1923</h2>
                            <p className="t--type-prose">
                                Blue Diamond servers 3,5000 almond growers, and helps make the
                                almond crop (valued at ober $1 billion) Califonia's largest food
                                export.
                            </p>
                        </div>
                    </div>
                    <div className="l--col-1 l--hidden-at-s">
                        <div className="history--timebar-wrap">
                            <div className="history--timebar">
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className="l--col-auto l--col-12-at-s">
                        <img src="http://images.contentful.com/v50q1scweni9/2w6sjY5K36ym6O4ySWQ8cm/6a0596a785a10432ff3cab40cd52ca18/Space.jpg" className="is-right" />
                    </div>
                </div>
            </div>
            <div className="l--container">
                <div className="l--row history--timeline-row">
                    <div className="l--col-auto l--col-12-at-s">
                        <img src="http://images.contentful.com/v50q1scweni9/2w6sjY5K36ym6O4ySWQ8cm/6a0596a785a10432ff3cab40cd52ca18/Space.jpg" className="is-left" />
                    </div>
                    <div className="l--col-1 l--hidden-at-s">
                        <div className="history--timebar-wrap">
                            <div className="history--timebar">
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className="l--col-auto l--col-12-at-s is-right">
                        <div className="timeline--content">
                            <h2>1967</h2>
                            <p className="t--type-prose">
                                The company produces almond in various forms, including roasted
                                almonds (under the "Blue Dimond" brand) and almond milk (under
                                the "Almond Breeze" brand).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="l--container">
                <div className="l--row history--timeline-row">
                    <div className="l--col-auto l--col-12-at-s is-left">
                        <div className="timeline--content">
                            <h2>1992</h2>
                            <p className="t--type-prose">
                                The organization is headquarter in Sacramento, Califonia. From
                                2004 to 2008, it resisted attempts by the International Longshore
                                and Warehouse Union to organize workers.
                            </p>
                        </div>
                    </div>
                    <div className="l--col-1 l--hidden-at-s">
                        <div className="history--timebar-wrap">
                            <div className="history--timebar">
                                <Diamond />
                            </div>
                        </div>
                    </div>
                    <div className="l--col-auto l--col-12-at-s">
                        <img src="http://images.contentful.com/v50q1scweni9/2w6sjY5K36ym6O4ySWQ8cm/6a0596a785a10432ff3cab40cd52ca18/Space.jpg" className="is-right" />
                    </div>
                </div>
            </div>
        </div>
        <div className="history--today">
            <div className="l--container">
                <div className="l--row history--timeline-row">
                    <div className="l--col-5 l--col-12-at-s">
                        <div className="history--timebar-wrap">
                            <div className="history--timebar is-end">
                                <Diamond />
                            </div>
                        </div>
                        <h2>Today</h2>
                        <p className="t--type-prose">The organization is Headquarter in Sacramento, California.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="related--container">
            <RelatedPageLink
                headline="Co-op headline"
                title="Quality doesn't happen by chance"
                linkText="Read our Manifesto"
                linkUrl="/manifesto"
                linkTheme="blue"
            />
            <RelatedPageLink
                headline="Craft section headline"
                title="Our Almonds are our story"
                linkText="Learn about our craft"
                linkUrl="/craft"
                linkTheme="yellow"
            />
            <div className="related--seperator" />
        </div>
    </section>
);
