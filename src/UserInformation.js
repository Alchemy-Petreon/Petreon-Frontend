import React, { Component } from 'react';
import ProfilePictureUpload from './ProfilePictureUpload.js';
import { MainContext } from './MainContext.js'

export default class UserInformation extends Component {
    static contextType = MainContext;

    state = {
        profilePicture: ''
    }

    render() {
        return (
            <div className='uinfo'>
                <h4 className="greeting">Hello, {this.context.profile.firstName}!</h4>
                <ProfilePictureUpload />
                <h4 classname="un">{this.context.profile.userName}</h4>
                <h5 className="prde">{this.context.profile.profileDescription}</h5>
            </div>
        )
    }
}
