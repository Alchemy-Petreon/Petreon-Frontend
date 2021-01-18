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
        this.togglePetUpload = this.togglePetUpload.bind(this)
    }

    togglePetUpload(e) {
        this.setState({ open: !this.state.open })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const petpicture = new FormData(e.target)

        await uploadPetProfilePicture(petpicture);

        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div>
                <img src={this.state.petProfilePicture} alt='' className="petprofilepicupload" />
                <div onClick={(e) => this.togglePetUpload(e)}><span className='uploadpetpicture'>Change Picture</span></div>
            {this.state.open ? (
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
            ): null}
            </div>
        )
    }
}
