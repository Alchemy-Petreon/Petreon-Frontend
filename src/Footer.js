import React, { Component } from 'react';
import './style/Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <span className="foot-logo">Petreon</span>
                {/* <Link to="/aboutus">
                    <span className="about-us">About Us</span>
                </Link> */}
            </div>
        )
    }
}
