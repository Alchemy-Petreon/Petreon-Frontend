import React, { Component } from 'react'
import { uploadProfilePicture } from './fetches/user-fetches.js';

export default class ProfilePictureUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profilePicture: '',
            open: false
        }
        this.toggleUpload = this.toggleUpload.bind(this)
    }
    // state = {
    //     profilePicture: ''
    // }  
    
    toggleUpload(e) {
        this.setState({ open: !this.state.open })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const picture = new FormData(e.target)
        await uploadProfilePicture(picture);
    }

    render() {
        return (
            <div>

            <div onClick={(e) => this.toggleUpload(e)} ><span className='uploadpicturemenu'>Change Profile Picture</span></div>
            {this.state.open ? (

            <div className="profilepicupload">
                <form onSubmit={this.handleSubmit}>
                <input 
                    type="file" 
                    name="profilePicture"
                    className="profilepicsubmit"
                    onChange={(e) => this.setState({ profilePicture: e.target.value })}
                    value={this.state.profilePicture}/>
                <button className='profilesubbutton'>Submit</button>
                </form>
            </div>

            ): null}
            </div>
        )
    }
}
