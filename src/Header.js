import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';
import { MainContext } from './MainContext.js'
import { seedData } from './fetches/dev-fetches'
import { logoutUser } from './fetches/user-fetches';
require('dotenv').config()

const URL = process.env.REACT_APP_SERVER_URL

export default class Header extends Component {
    static contextType = MainContext;

    componentDidMount = () => {
        console.log(URL)
    }


    handleSeed = async () => {
        await seedData();
    }

    handleLogout = async () => {
        this.context.logOut();
        this.context.setProfile({ 'profile': 'empty' });
        await logoutUser();
    }

    render() {
        return (
            <div className="header">
                <Link to="/">
                    <span className="logo">Petreon</span>
                </Link>




                {this.context.loggedIn ?
                    <div>
                        <Link to="/browse">
                            <span className="browse">Browse Pets</span>
                        </Link>

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
                    </div>
                    :
                    <a href={`${URL}api/v1/auth/google`} className="login">Log In / Sign Up</a>
                }
            </div>
        )
    }
}
