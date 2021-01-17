import React, { Component } from 'react';
import ProfilePictureUpload from './ProfilePictureUpload.js';

export default class UserInformation extends Component {
    state = {
        profilePicture: ''
    }

    componentDidMount = async () => {
        await this.setState({
            userName: this.props.user.userName,
            firstName: this.props.user.firstName,
            profileDescription: this.props.user.profileDescription
        })
        console.log(this.state.userName)
    }

    render() {
        return (
            <div className='uinfo'>
                <h4 className="greeting">Hello, {this.state.firstName}!</h4>
                <ProfilePictureUpload 
                user={this.props.user} />
                <h4 classname="un">{this.state.userName}</h4>
                <h5 className="prde">{this.state.profileDescription}</h5>
            </div>
        )
    }
}
