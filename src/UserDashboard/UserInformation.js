import React, { Component } from 'react';
import ProfilePictureUpload from './ProfilePictureUpload.js';
import { MainContext } from '../MainContext.js'

export default class UserInformation extends Component {
    static contextType = MainContext;

    constructor() {
        super()
        this.state = {
            profilePicture: '',
            isHidden: true
        }
    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        })
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
                height='150'
                accept=".png, .jpg, .jpeg, .gif" />

                <button onClick={this.toggleHidden.bind(this)} className="uploadpicturemenu">Change Profile Picture</button>
                {!this.state.isHidden && <ProfilePictureUpload />}

                <h5 className="prde">{this.context.profile.profileDescription}</h5>
            </div>
        )
    }
}
