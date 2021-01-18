import React, { Component } from 'react';
import '../style/CreatePets.css'
import { createPet } from '../fetches/pet-fetches.js';
import { MainContext } from '../MainContext.js';
import PetProfilePictureUpload from './PetProfilePictureUpload.js';
import BannerPictureUpload from './BannerPictureUpload.js';


export default class CreatePet extends Component {
    static contextType = MainContext;

    state = {
        petName: 'Enter Pet Name',
        type: '',
        petProfilePicture: 'https://placekitten.com/200/200',
        petProfileDescription: 'Enter Pet Description',
        bannerPicture: 'https://placekitten.com/1200/350'
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true })
        const pet = new FormData(e.target)
        pet.append("userId", this.context.profile.id)
        createPet(pet);

        this.props.history.push('/userdash');

    }
    render() {
        return (
            <div className='create-pet-page'>
                <div className='cppnaplesyellow'> </div>
                <div className='cppbox'>

                    <form onSubmit={this.handleSubmit}>
                    <div className="banner">
                    <img src={this.state.bannerPicture} alt="" className="petcreatebanner"/>
                </div>
                    <BannerPictureUpload />
                    <img src={this.state.petProfilePicture} alt='' className="petprofilepicture" />
                    <PetProfilePictureUpload />
                        {/* <p className='pet-picture'>Pet Profile Picture URL:</p>
                        <input name='petProfilePicture' type='file' onChange={(e) => this.setState({ petProfilePicture: e.target.value })}
                            value={this.state.petProfilePicture} ></input> */}

                        <input 
                            name='petName'
                            placeholder={this.state.petName}
                            onChange={(e) => this.setState({ petName: e.target.value })}
                            value={this.state.petName} />

                        <p className='pet-type'>Pet Type:</p>
                        <select 
                          name='type' 
                          onChange={(e) => this.setState({ type: e.target.value })}>
                              <option value='cat'>Cat</option>
                              <option value='dog'>Dog</option>
                              <option value='reptile'>Reptile</option>
                              <option value='amphibian'>Amphibian</option>
                              <option value='fish'>Fish</option>
                              <option value='rodent'>Rodent</option>
                              <option value='other'>Other</option>
                        </select>

                        <p className='pet-description'>Pet Description:</p>
                        <input name='petProfileDescription'
                        placeholder={this.state.petProfileDescription}
                        onChange={(e) => this.setState({ petProfileDescription: e.target.value })}
                        value={this.state.petProfileDescription} />

                        {/* <p className='pet-banner'>Banner Picture URL:</p>
                        <input name='bannerPicture' type='file' onChange={(e) => this.setState({ bannerPicture: e.target.value })}
                            value={this.state.bannerPicture} ></input> */}
                        <br />
                        <button className='create-pet-button'>Save Changes</button>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}
