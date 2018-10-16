import React, { Component } from 'react';
import Slide from '../Slide';
import LeftArrow from '../Arrows/LeftArrow';
import RightArrow from '../Arrows/RightArrow';

export default class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="slider">
                <Slide />
                <LeftArrow />
                <RightArrow />
            </div>
        );
    }
}
