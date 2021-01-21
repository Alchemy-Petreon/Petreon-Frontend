import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';
import { MainContext } from './MainContext.js'
import { seedData } from './fetches/dev-fetches'
import { logoutUser } from './fetches/user-fetches';


export default class Header extends Component {
    static contextType = MainContext;



    handleSeed = async () => {
        await seedData();
    }

    handleLogout = async () => {
        this.context.logOut();
        this.context.setProfile({ 'profile': 'empty' });
        await logoutUser();
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="header">
                <Link to="/">
                    <span className="logo">Petreon</span>
                </Link>

                <Link to="/browse">
                    <span className="browse">Browse Pets</span>
                </Link>

                <input type="text" placeholder="Search..." className="search" />

                <button className="button1">
                    <img 
                        src="/loupe.png" 
                        alt="Search" 
                        className="glass" />
                </button>

                {this.context.loggedIn ?
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to={'/userdash'}>
                            <img
                                className='header-picture'
                                src={this.context.profile.profilePicture}
                                alt={this.context.profile.userName}
                                style={{
                                    height: '60px',
                                    borderRadius: '50px'
                            }}
                            />
                        </Link>

                        <button
                            className='logout-button'
                            onClick={this.handleLogout}>
                            Logout
                        </button>
                    </div>
                    :
                    <a href="https://petreon-api.herokuapp.com/api/v1/auth/google" className="login">Log In / Sign Up</a>
                }
            </div>
        )
    }
}
