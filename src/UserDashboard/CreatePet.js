import React, { Component } from 'react';
import '../style/CreatePets.css'
import { createPet, uploadPetBanner, uploadPetProfilePicture } from '../fetches/pet-fetches.js';
import { MainContext } from '../MainContext.js';
import mime from 'mime-types';

// import PetProfilePictureUpload from './PetProfilePictureUpload.js';
// import BannerPictureUpload from './BannerPictureUpload.js';


export default class CreatePet extends Component {
    static contextType = MainContext;

    state = {
        petName: '',
        bannerPictureURL: 'https://placekitten.com/1300/350',
        bannerPictureFile: '',
        type: '',
        petProfilePictureURL: 'https://placekitten.com/250/250',
        petProfilePictureFile: '',
        petProfileDescription: '',
        loading: true,
        disableSubmit: false,
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({
            disableSubmit: true
        })

        const petFiles = new FormData(e.target)

        const newPet = {
            userId: this.context.profile.id,
            petName: this.state.petName,
            type: this.state.type,
            petProfileDescription: this.state.petProfileDescription
        }

        let petInfo = await createPet(newPet);

        console.log(petFiles.get('petProfilePicture'))

        if (petFiles.get('petProfilePicture')) {
            const profilePicture = new FormData()

            profilePicture.append('petProfilePicture', petFiles.get('petProfilePicture'))

            await uploadPetProfilePicture(petInfo.id, profilePicture);
        }


        if (petFiles.get('bannerPicture')) {
            const bannerPicture = new FormData()

            bannerPicture.append('bannerPicture', petFiles.get('bannerPicture'))

            await uploadPetBanner(petInfo.id, bannerPicture);
        }
        this.props.history.push('/userdash');

    }

    handleBannerChange = (e) => {
        const mediaType = mime.lookup(e.target.value)

        if (mediaType.split('/')[0] === 'image') {
            this.setState({
                bannerPictureFile: e.target.value,
                bannerPictureURL: URL.createObjectURL(e.target.files[0])

            })
        } else {
            window.alert('INVALID MEDIA TYPE');
            this.setState({ bannerPictureFile: '' })
        }
    }

    handlePictureChange = async (e) => {
        const mediaType = mime.lookup(e.target.value)

        if (mediaType.split('/')[0] === 'image') {
            await this.setState({
                petProfilePictureFile: e.target.value,
                petProfilePictureURL: URL.createObjectURL(e.target.files[0])
            })

        } else {
            window.alert('INVALID MEDIA TYPE');
            this.setState({ petPictureFile: '' })
        }

    }

    render() {
        return (
            <div className='create-pet-page'>

                <div className='cppnaplesyellow'> </div>

                <div className='cppbox'>

                    <form onSubmit={this.handleSubmit}>

                        <div className="banner">
                            <img
                                src={this.state.bannerPictureURL}
                                alt=""
                                className="petcreatebanner" />
                        </div>

                        <div className="bannerpicupload">
                            <div className='bannerpicchange'>
                                <input
                                    type="file"
                                    name="bannerPicture"
                                    onChange={(e) => this.handleBannerChange(e)}
                                    value={this.state.bannerPictureFile}
                                />
                                {/* <button className='bannerpicsubbutton'>Submit</button> */}
                            </div>
                        </div>

                        <div className="petpicupload">
                            <img
                                src={this.state.petProfilePictureURL}
                                key={Date.now()}
                                alt=''
                                className="petprofilepicupload"
                            />

                            <div className='petprofilepicchange'>
                                <input
                                    type="file"
                                    name="petProfilePicture"
                                    className="petprofilepicsubmit"
                                    onChange={(e) => this.handlePictureChange(e)}
                                    value={this.state.petProfilePictureFile}
                                />
                                {/* <button className='petprofilesubbutton'>Submit</button> */}
                            </div>
                        </div>

                        <div className='petnamediv'>
                            <h5 className='petnameheader'>Pet Name</h5>
                            <input
                                name='petName'
                                className='petnameupload'
                                placeholder={this.state.petName}
                                onChange={(e) => this.setState({ petName: e.target.value })}
                                value={this.state.petName} />
                        </div>

                        <div className="typechoice">
                            <h5 className='typeheader'>Pet Type</h5>
                            <select
                                name='type'
                                className='typedropdown'
                                onChange={(e) => this.setState({ type: e.target.value })}>
                                <option value='cat'>Cat</option>
                                <option value='dog'>Dog</option>
                                <option value='reptile'>Reptile</option>
                                <option value='amphibian'>Amphibian</option>
                                <option value='fish'>Fish</option>
                                <option value='rodent'>Rodent</option>
                                <option value='other'>Other</option>
                            </select>
                        </div>

                        <br />

                        <h5 className='petdescheader'>Pet Profile Description:</h5>
                        <textarea
                            rows="1"
                            name='petProfileDescription'
                            className='petdesc'
                            placeholder={this.state.petProfileDescription}
                            onChange={(e) => this.setState({ petProfileDescription: e.target.value })}
                            value={this.state.petProfileDescription} />

                        <br />

                        <button className='create-pet-button' disabled={this.state.disableSubmit}>Save Changes</button>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}
