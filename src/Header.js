import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <Link to="/"><h3 className="logo">PetPark</h3></Link>

                <Link to="/browse"><span className="browse">Browse Pets</span></Link>

                <Link to="/aboutus"><span className="about">About Us</span></Link>

                <input type="text" className="search" />

                <span className="login">Log In</span>
                
                <Link to="/signup"><span className="signup">Sign Up</span></Link>
            </div>
        )
    }
}
