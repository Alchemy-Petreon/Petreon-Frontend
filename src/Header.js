import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <Link to="/"><span className="logo">Petreon</span></Link>

                <Link to="/browse"><span className="browse">Browse Pets</span></Link>

                <input type="text" placeholder="Search..." className="search" />
                <button className="button1"><img src="./loupe.png" alt="Search" className="glass" /></button>

                <span className="login">Log In</span>

                <Link to="/signup"><span className="signup">Sign Up</span></Link>

            </div>
        )
    }
}
