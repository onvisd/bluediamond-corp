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

        {
            name: 'description',
            content: 'From our hearts to your hands'
        },

        // <meta property="..." content="..."/>
        // OpenGraph Tags
        {property: 'og:title', content: 'Blue Diamond Growers'},
        {property: 'og:description', content: 'From our hearts to your hands'},
        {property: 'og:locale', content: 'en-US'}
    ];

    // Overwrite defaults
    const meta = defaults.map((tag) => {
        const matchingTag = tags.filter(
            (childTag) => (
                (childTag.property && childTag.property === tag.property) ||
                (childTag.name && childTag.name === tag.name)
            )
        );

        if(matchingTag.length)
            return matchingTag[0];

        return tag;
    });

    // Add any new tags
    tags.forEach((tag) => {
        const matchingTag = meta.filter(
            (existingTag) => (
                (existingTag.property && existingTag.property === tag.property) ||
                (existingTag.name && existingTag.name === tag.name)
            )
        )[0];

        if(!matchingTag)
            meta.push(tag);
    });

    const keys = [];
    return (<IsomorphicMeta>{meta.filter((tag) => {
        const key = `${tag.property ? 'p' : ''}${tag.property || tag.name}`;
        if(keys.indexOf(key) > -1)
            return false;

        keys.push(key);
        return true;
    })}</IsomorphicMeta>);
};
