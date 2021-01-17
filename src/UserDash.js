import React, { Component } from 'react';
import CreatePet from './CreatePet.js';
import UserInformation from './UserInformation.js';

export default class UserDash extends Component {


    render() {
        return (
            <div className="user-dashboard">
                <UserInformation 
                user={this.props.user}/>
                <CreatePet />
            </div>
        )
    }
}
