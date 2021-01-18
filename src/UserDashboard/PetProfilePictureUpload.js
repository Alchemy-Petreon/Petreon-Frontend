import React, { Component } from 'react';

export default class PetProfilePictureUpload extends Component {
    state = {
        petProfilePicture: 'https://placekitten.com/250/250'
    }

    render() {
        return (
            <div>
                <img src={this.state.petProfilePicture} alt='' className="petprofilepicupload" />
            </div>
        )
    }
}
