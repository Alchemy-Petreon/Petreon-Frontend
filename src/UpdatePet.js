import React, { Component } from 'react';
import './style/CreatePet.css'
import { fetchPet } from './fetches/pet-fetches.js';
import { MainContext } from './MainContext.js';
import mime from 'mime-types';
import { updatePet } from './fetches/pet-fetches';

export default class UpdatePet extends Component {
    static contextType = MainContext;

    state = {
        pet: [],
        petName: '',
        type: '',
        petProfilePicture: '',
        petProfilePictureFile: '',
        petProfileDescription: '',
        loading: false,
        disableSubmit: false,
    }

    componentDidMount = async () => {

        this.setState({ loading: true });
        const pet = await fetchPet(this.props.match.params.id);


        this.setState({
            pet: pet,
            petName: pet.petName,
            type: pet.type,
            petProfilePicture: pet.petProfilePicture,
            petProfilePictureFile: pet.petProfilePictureFile,
            petProfileDescription: pet.petProfileDescription,
            loading: false,
        })
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({
            disableSubmit: true,
            loading: true,
        })

        const petFiles = new FormData(e.target)

        const newPet = {
            userId: this.context.profile.id,
            petName: this.state.petName,
            type: this.state.type,
            petProfilePicture: this.state.petProfilePicture,
            petProfilePictureFile: this.state.petProfilePictureFile,
            petProfileDescription: this.state.petProfileDescription

        }

        await updatePet(this.props.match.params.id, newPet);
        // if (petFiles.get('petProfilePicture')) {
        //     const profilePicture = new FormData()

        //     profilePicture.append('petProfilePicture', petFiles.get('petProfilePicture'))

        //     await uploadPetProfilePicture(petInfo.id, profilePicture);

        // }

        this.props.history.push('/userdash')

    };

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
                { this.state.loading
                    ? <img src={'/loading-spinner.gif'} alt={''} />
                    :
                    <div className='cppbox'>

                        <form onSubmit={this.handleSubmit}>

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
                    </div>}
            </div>
        )
    }
}
