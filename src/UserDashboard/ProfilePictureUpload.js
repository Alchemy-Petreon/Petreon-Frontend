import React, { Component } from 'react'
import { uploadProfilePicture } from '../fetches/user-fetches.js';
import { MainContext } from '../MainContext.js';

export default class ProfilePictureUpload extends Component {
    static contextType = MainContext;

    constructor(props) {
        super(props);
        this.state = {
            profilePicture: ''
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const picture = new FormData(e.target)

        const existingUser = await uploadProfilePicture(picture);

        this.context.setProfile({ profile: existingUser })
    }

    render() {
        return (
            <div>
            <div className="profilepicupload">
                <form onSubmit={this.handleSubmit}>
                <input 
                    type="file" 
                    name="profilePicture"
                    accept="image/*"
                    className="profilepicsubmit"
                    onChange={(e) => this.setState({ profilePicture: e.target.value })}
                    value={this.state.profilePicture}/>
                <button className='profilesubbutton'>Submit</button>
                </form>
            </div>
            </div>
        )
    }
}
