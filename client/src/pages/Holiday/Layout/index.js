import React, {Component} from 'react';
import Header from '../Header';
import Footer from '../Footer';

import './bootstrap.min.css';
import './responsive.css';
import './style.css';

export default class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}
