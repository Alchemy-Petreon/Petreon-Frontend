import React, { Component } from 'react'
import { uploadProfilePicture } from './fetches/user-fetches.js';

export default class ProfilePictureUpload extends Component {
    state = {
        profilePicture: ''
    }    

    handleSubmit = async (e) => {
        e.preventDefault();

        const picture = new FormData(e.target)
        await uploadProfilePicture(picture);
    }

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
                <button>Submit</button>
                </form>
            </div>
        )
    }
}
