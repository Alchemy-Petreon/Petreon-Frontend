import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/Header.css';
import { MainContext } from './MainContext.js'
import { seedData } from './fetches/dev-fetches'
import { logoutUser } from './fetches/user-fetches';


export default class Header extends Component {
    static contextType = MainContext;

    componentDidMount = async () => {
        await this.context.setProfile(JSON.parse(localStorage.getItem('profile')))
    }

    handleSeed = async () => {
        await seedData();
    }

    handleLogout = async () => {
        await logoutUser();
        this.context.logOut();
        this.context.setProfile('');
    }

    render() {
        return (
            <div className="header">
                <Link to="/"><span className="logo">Petreon</span></Link>

                <Link to="/browse"><span className="browse">Browse Pets</span></Link>

                <input type="text" placeholder="Search..." className="search" />
                <button className="button1"><img src="/loupe.png" alt="Search" className="glass" /></button>
                {this.context.loggedIn ?
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={this.context.profile.profilePicture}
                            alt={this.context.profile.userName}
                            style={{
                                height: '60px',
                                borderRadius: '50px'
                            }}
                        />
                        <h3>{this.context.profile.userName}</h3>
                        <button
                            onClick={this.handleLogout}>
                            Logout
                        </button>
                    </div>
                    :
                    <a href="https://petreon-api.herokuapp.com/api/v1/auth/google" className="login">Log In / Sign Up</a>
                }


                {/* <Link to="/signup"><span className="signup">Sign Up</span></Link> */}


            </div>
        )
    }
}
