import React, { Component } from 'react';

export default class Popup extends Component {
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="popup-backdrop">
                <div className="popup">
                    <button className="popup-close" onClick={this.props.onClose}>
                        ✖
                    </button>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
