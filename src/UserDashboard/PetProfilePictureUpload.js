import React, { Component } from 'react';
import { uploadPetProfilePicture } from '../fetches/pet-fetches.js';
import { MainContext } from '../MainContext';

export default class PetProfilePictureUpload extends Component {
    static contextType = MainContext;

    constructor(props) {
        super(props);
        this.state = {
            petProfilePicture: 'https://placekitten.com/250/250',
            open: false
        }
        this.toggleUpload = this.toggleUpload.bind(this)
    }

    toggleUpload(e) {
        this.setState({ open: !this.state.open })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const petpicture = new FormData(e.target)

        const existingPet = await uploadPetProfilePicture(petpicture);
    }
    render() {
        return (
            <div>
                <img src={this.state.petProfilePicture} alt='' className="petprofilepicupload" />
            </div>
        )
    }
}
