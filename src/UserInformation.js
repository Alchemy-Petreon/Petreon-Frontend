import React, { Component } from 'react';
import ProfilePictureUpload from './ProfilePictureUpload.js';
import { MainContext } from './MainContext.js'
import './style/UserInfo.css'

export default class UserInformation extends Component {
    static contextType = MainContext;

    state = {
        profilePicture: ''
    }

    render() {
        return (
            <div className='uinfo'>
                <h4 className="greeting">Hello, {this.context.profile.firstName}!</h4>

                <h4 className="un">{this.context.profile.userName}</h4>

                <img className="profpic" 
                src={this.context.profile.profilePicture} 
                alt='' 
                width='150' 
                height='150' />
                
                <ProfilePictureUpload />

                <h5 className="prde">{this.context.profile.profileDescription}</h5>
            </div>
        )
    }
}
