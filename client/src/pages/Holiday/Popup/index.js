import React, { Component } from 'react';

export default class Popup extends Component {
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="popup-backdrop">
                <div className="popup set_video">
                    <button className="popup-close dm-pop-close" onClick={this.props.onClose}>
                        x
                    </button>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
