import React, { Component } from 'react'
import CreatePet from './CreatePet.js'
import { MainContext } from './MainContext.js'
import UserInformation from './UserInformation.js'


export default class UserDash extends Component {
    static contextType = MainContext;

    render() {
        return (
            <div className="user-dashboard">
                <UserInformation 
                user={this.props.user}/>
                <h6>Pets:</h6>
                <CreatePet />
            </div>
        )
    }
}
