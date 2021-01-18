import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';
import { MainContext } from './MainContext.js'


export default class Header extends Component {
    static contextType = MainContext;

    componentDidMount = async () => {
        await this.context.setProfile(JSON.parse(localStorage.getItem('profile')))
    }

    render() {
        return (
            <div className="header">
                <Link to="/"><span className="logo">Petreon</span></Link>

                <Link to="/browse"><span className="browse">Browse Pets</span></Link>

                <input type="text" placeholder="Search..." className="search" />
                <button className="button1"><img src="/loupe.png" alt="Search" className="glass" /></button>

                <a href="https://petreon-api.herokuapp.com/api/v1/auth/google" className="login">Log In</a>

                {/* <Link to="/signup"><span className="signup">Sign Up</span></Link> */}

            </div>
        )
    }
}
