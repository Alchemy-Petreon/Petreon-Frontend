import React, { Component } from 'react';
import './style/Header.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <h3 className="logo">PetPark</h3>
                <input type="text" className="search" />
                <span className="logsign">Login/Signup</span>
            </div>
        )
    }
}
