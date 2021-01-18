import React, { Component } from 'react'
import { createUser } from './fetches/user-fetches.js';



export default class ProfilePictureUpload extends Component {
    render() {
        return (
            <div className="profilepicupload">
                <form onSubmit={this.handleSubmit}>
                <input 
                    type="file" 
                    name="profilePicture"
                    className="profilepic"
                    onChange={(e) => this.setState({ profilePicture: e.target.value })}
                    value={this.state.profilePicture}/>
                </form>
            </div>
        )
    }
}
