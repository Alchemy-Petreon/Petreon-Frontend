import React, { Component } from 'react';

export default class PetProfilePictureUpload extends Component {
    state = {
        petProfilePic: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.props.onPetProfilePictureUpload(this.state.petProfilePic)
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
                            accept=".png, .jpg, .jpeg, .gif"
                            onChange={(e) => this.setState({petProfilePic: e.target.value })}
                            value={this.props.petProfilePic}/>
                        <button className='petprofilesubbutton'>Submit</button>
                </form>
                </div>
            </div>
        )
    }
}
