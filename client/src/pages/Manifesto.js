import React from 'react';
import {Title} from 'react-isomorphic-render';

import GenericHero from '../components/GenericHero';
import ImageCluster from '../components/ImageCluster';
import FullBleedImage from '../components/FullBleedImage';
import RelatedPageLink from '../components/RelatedPageLink';

export default () => (
    <section className="content">
        <Title>Manifesto</Title>
        <GenericHero
            headline="Lorem"
            title="Blue Diamond Manifesto"
            backgroundImage="http://images.contentful.com/v50q1scweni9/3fypafNNVYK2SAgEyeoCQe/b646ac4edfbc6e14d58f9eef7a30c65b/cool.jpg"
        />
        <div className="manifesto--content">
            <div className="l--container">
                <div className="l--row">
                    <div className="l--col-12 t--align-center">
                        <h2>
                            Quality doesn't happen by chance.<br />
                            Quality is not a given.
                        </h2>
                    </div>
                </div>
            </div>
            <ImageCluster
                images={[
                    {
                        url: 'http://images.contentful.com/v50q1scweni9/2w6sjY5K36ym6O4ySWQ8cm/6a0596a785a10432ff3cab40cd52ca18/Space.jpg',
                        alt: 'Some image title'
                    },
                    {
                        url: 'http://images.contentful.com/v50q1scweni9/2w6sjY5K36ym6O4ySWQ8cm/6a0596a785a10432ff3cab40cd52ca18/Space.jpg',
                        alt: 'Space is rad'
                    }
                ]}
            />
            <div className="l--container">
                <div className="l--row">
                    <div className="l--col-7 t--align-center">
                        <p className="t--type-prose">
                            It's the fruit of hard labor, through the care woven into every step
                            of the process. It's a beautiful reward for countless stuble
                            decisions.
                        </p>
                        <p className="t--type-prose">
                            It's the hands that make it. The ingredients that create it.<br/>
                            The generations that inform it.
                        </p>
                    </div>
                </div>
            </div>
            <ImageCluster
                images={[
                    {
                        url: 'http://images.contentful.com/v50q1scweni9/2w6sjY5K36ym6O4ySWQ8cm/6a0596a785a10432ff3cab40cd52ca18/Space.jpg',
                        alt: 'Some image title'
                    },
                    {
                        url: 'http://images.contentful.com/v50q1scweni9/2w6sjY5K36ym6O4ySWQ8cm/6a0596a785a10432ff3cab40cd52ca18/Space.jpg',
                        alt: 'Space is rad'
                    },
                    {
                        url: 'http://images.contentful.com/v50q1scweni9/2w6sjY5K36ym6O4ySWQ8cm/6a0596a785a10432ff3cab40cd52ca18/Space.jpg',
                        alt: 'Space is cool'
                    }
                ]}
            />
            <div className="l--container">
                <div className="l--row">
                    <div className="l--col-7 t--align-center">
                        <p className="t--type-prose">
                            Our cans and cartons are more than just a product on the shelf.
                            They're a measure of care and consistency, year after year.
                        </p>
                        <p className="t--type-prose">
                            We are made up of generations of growers, and a co-op that understands
                            that being the best comes from within.
                        </p>
                        <p className="t--type-prose">
                            It's not something you can buy or decide to become. It's intertwined
                            from the beginning.
                        </p>
                        <p className="t--type-prose">
                            Why do we care about the best?
                        </p>
                        <p className="t--type-prose">
                            It's in our nature.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <FullBleedImage
            image="http://images.contentful.com/v50q1scweni9/2w6sjY5K36ym6O4ySWQ8cm/6a0596a785a10432ff3cab40cd52ca18/Space.jpg"
        />
        <div className="related--container">
            <RelatedPageLink
                headline="We take pride in our work"
                title="Perfected Over Generations"
                linkText="Learn about our history"
                linkUrl="/history"
                linkTheme="green"
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
