import React from 'react';
import {Meta as IsomorphicMeta} from 'react-isomorphic-render';

export default (props) => {
    const {children} = props;
    const tags = children || [];

    // Set default meta tags that need to be explicitly over-ridden.
    const defaults = [
        // <meta charset="utf-8"/>
        {charset: 'utf-8'},

        // <meta name="..." content="..."/>
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0, user-scalable=no'
        },

        {
            name: 'keywords',
            content:
                'Blue Diamond,Blue Diamond Almonds,Almond,Almond Nuts,Almond Snack,' +
                'Almond Milk,Snack Nuts,Almond Breeze,Nut Thins,Almond Flavors,Nuts Flavor,' +
                'Almond Quality,Nuts Quality,Almond Milk,Nut Milk,Almond Recipes,Nut Recipes,' +
                'Almond Cooking,Nut Cooking,Almond Baking,Nut Baking,Almond Dessert,' +
                'Nuts Dessert,Almond Growers,Nut Growers,Almond Farms,Almond Orchard,' +
                'Nuts,Almond Health,Nuts Health,Almond Nutrition,Nuts Nutrition,' +
                'Almond Ingredients,Almond Shop,Almond Store,Almond Buy,Almond Reviews,' +
                'Almond Ratings'
        },

        // <meta property="..." content="..."/>
        // OpenGraph Tags
        {property: 'og:title', content: 'Blue Diamond Growers'},
        {property: 'og:description', content: 'From our hearts to your hands'},
        {property: 'og:locale', content: 'en-US'},

        // Other Meta Property Tags
        {property: 'description', content: 'From our hearts to your hands'}
    ];

    // Overwrite defaults
    const meta = defaults.map((tag) => {
        const matchingTag = tags.filter(
            (childTag) => childTag.property === tag.property
        )[0];

        if(matchingTag)
            return matchingTag;

        return tag;
    });

    // Add any new tags
    tags.forEach((tag) => {
        const matchingTag = meta.filter(
            (existingTag) => existingTag.property === tag.property
        )[0];

        if(!matchingTag)
            meta.push(tag);
    });

    return (<IsomorphicMeta>{meta}</IsomorphicMeta>);
};
