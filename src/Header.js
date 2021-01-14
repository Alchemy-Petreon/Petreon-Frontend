import React, { Component } from 'react';
import './style/Header.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <h3 className="logo">PetPark</h3>
                <span className="browse">Browse Pets</span>
                <span className="about">About Us</span>
                <input type="text" className="search" />
                <span className="login">Log In</span>
                <span className="signup">Sign Up</span>
            </div>
        )
    }
}
