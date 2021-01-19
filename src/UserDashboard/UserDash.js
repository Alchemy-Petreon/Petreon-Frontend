import React, { Component } from 'react';
import '../style/UserDash.css'
import { MainContext } from '../MainContext.js';
import UserInformation from './UserInformation.js';
import Pets from './Pets.js';



export default class UserDash extends Component {
    static contextType = MainContext;

    render() {
        return (
            <div>
                <div className="udbittersweet"> </div>    
                <div className="udnaplesyellow"> </div>
                <div className="user-dashboard">
                    <UserInformation 
                    user={this.context.profile}/>
                    <Pets
                    user={this.context.profile}/>
                </div>
            </div>
        )
    }
}
