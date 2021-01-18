import React, { Component } from 'react';
// import { uploadPetProfilePicture } from '../fetches/pet-fetches.js';

export default class PetProfilePictureUpload extends Component {
    state = {
        petProfilePic: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        // const petpicture = new FormData(e.target)

        // const pet = await uploadPetProfilePicture(petpicture);

        this.props.onPetProfilePictureUpload(this.state.petProfilePic)

        console.log(this.state.petProfilePic)
    }

    render() {
        return (
            <div>
                <div className='petprofilepicchange'>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="file"
                            name="petProfilePicture"
                            className="petprofilepicsubmit"
                            onChange={(e) => this.setState({petProfilePic: e.target.value })}
                            value={this.props.petProfilePic}/>
                        <button className='petprofilesubbutton'>Submit</button>
                </form>
                </div>
            </div>
        )
    }
}
