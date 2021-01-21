import React, { Component } from 'react';
import './style/CreatePets.css'
import { fetchPet, uploadPetBanner, uploadPetProfilePicture } from './fetches/pet-fetches.js';
import { MainContext } from './MainContext.js';
import mime from 'mime-types';
import { updatePet } from './fetches/pet-fetches';

export default class CreatePet extends Component {
    static contextType = MainContext;

    state = {
        pet: [],
        petName: '',
        bannerPicture: '',
        bannerPictureFile: '',
        type: '',
        petProfilePicture: '',
        petProfilePictureFile: '',
        petProfileDescription: '',
        loading: true,
        disableSubmit: false,
    }

    componentDidMount = async () => {

        await this.setState({ loading: true });
        const pet = await fetchPet(this.props.match.params.id);


        await this.setState({
            pet: pet,
            petName: pet.petName,
            bannerPicture: pet.bannerPicture,
            bannerPictureFile: pet.bannerPictureFile,
            type: pet.type,
            petProfilePicture: pet.petProfilePicture,
            petProfilePictureFile: pet.petProfilePictureFile,
            petProfileDescription: pet.petProfileDescription,
        })
        console.log('petinfo', pet)
    };

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
            petProfilePicture: this.state.petProfilePicture,
            petProfilePictureFile: this.state.petProfilePictureFile,
            petProfileDescription: this.state.petProfileDescription,
            bannerPicture: this.state.bannerPicture,

        }

        await updatePet(this.props.match.params.id, newPet);

        console.log(petFiles.get('petProfilePicture'))

        // if (petFiles.get('petProfilePicture')) {
        //     const profilePicture = new FormData()

        //     profilePicture.append('petProfilePicture', petFiles.get('petProfilePicture'))

        //     await uploadPetProfilePicture(petInfo.id, profilePicture);

        // }

        this.props.history.push('/userdash')
        // if (petFiles.get('bannerPicture')) {
        //     const bannerPicture = new FormData()

        //     bannerPicture.append('bannerPicture', petFiles.get('bannerPicture'))

        //     await uploadPetBanner(petInfo.id, bannerPicture);
    }
    // this.props.history.push('/userdash');



    handleBannerChange = (e) => {
        const mediaType = mime.lookup(e.target.value)

        if (mediaType.split('/')[0] === 'image') {
            this.setState({
                bannerPictureFile: e.target.value,
                bannerPicture: URL.createObjectURL(e.target.files[0])

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
                petProfilePicture: URL.createObjectURL(e.target.files[0])
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

                        <div>
                            <img
                                src={this.state.bannerPicture}
                                alt='banner'
                                className="petcreatebanner" />
                        </div>

                        <div>
                            <input
                                type="file"
                                accept='image/*'
                                name="bannerPicture"
                                className="bannerpicturesubmit"
                                onChange={(e) => this.handleBannerChange(e)}
                                value={this.state.bannerPictureFile}
                            />
                        </div>

                        <div>
                            <div className='upload-image-frame'>
                                <img
                                    src={this.state.petProfilePicture}
                                    key={Date.now()}
                                    alt=''
                                    className="petprofilepicupload"
                                />
                            </div>

                            <input
                                type="file"
                                name="petProfilePicture"
                                accept='image/*'
                                className="petprofilepicsubmit"
                                onChange={(e) => this.handlePictureChange(e)}
                                value={this.state.petProfilePictureFile}
                            />
                        </div>

                        <div className='petnamediv'>
                            <h5 className='petnameheader'>Pet Name</h5>
                            <input
                                name='petName'
                                maxLength='144'
                                className='petnameupload'
                                placeholder={this.state.petName}
                                onChange={(e) => this.setState({ petName: e.target.value })}
                                value={this.state.petName} />
                        </div>

                        <div className="typechoicediv">
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

                        <div className='petdescdiv'>
                            <h5 className='petdescheader'>Pet Profile Description:</h5>
                            <textarea
                                rows="1"
                                name='petProfileDescription'
                                maxLength='750'
                                className='petdesc'
                                placeholder={this.state.petProfileDescription}
                                onChange={(e) => this.setState({ petProfileDescription: e.target.value })}
                                value={this.state.petProfileDescription} />
                        </div>

                        <br />

                        <button className='create-pet-button' disabled={this.state.disableSubmit}>Save Changes</button>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}
