import React, { Component } from 'react';
import { uploadPetProfilePicture } from '../fetches/pet-fetches.js';
import { MainContext } from '../MainContext';

export default class PetProfilePictureUpload extends Component {
    static contextType = MainContext;

    handleSubmit = async (e) => {
        e.preventDefault();

        const petpicture = new FormData(e.target)

        await uploadPetProfilePicture(petpicture);
    }

    render() {
        return (
            <div>
                <div className='petprofilepicupload'>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="file"
                            name="petProfilePicture"
                            className="petprofilepicsubmit"
                            onChange={(e) => this.setState({petProfilePicture: e.target.value })}
                            value={this.state.petProfilePicture}/>
                        <button className='petprofilesubbutton'>Submit</button>
                </form>
                </div>
            </div>
        )
    }
}
