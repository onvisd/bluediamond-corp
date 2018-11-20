import React, {Component} from 'react';
import Header from '../Header';
import Footer from '../Footer';

import './style.css';
import './bootstrap.min.css';
import './font-awesome.min.css';
import './responsive.css';


export default class Layout extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
