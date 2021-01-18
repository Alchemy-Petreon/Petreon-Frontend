import React, { Component } from 'react';
import '../style/CreatePets.css'
import { createPet, uploadPetProfilePicture } from '../fetches/pet-fetches.js';
import { MainContext } from '../MainContext.js';
import PetProfilePictureUpload from './PetProfilePictureUpload.js';
import BannerPictureUpload from './BannerPictureUpload.js';


export default class CreatePet extends Component {
    static contextType = MainContext;
    pictureData = new FormData();
    bannerData = new FormData();

    state = {
        petName: '',
        bannerPicture: 'https://placekitten.com/1300/350',
        type: '',
        petProfilePicture: 'https://placekitten.com/250/250',
        petProfileDescription: '',
        isHidden: true
    }

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    handlePetProfilePicture = async (petProfilePic) => {
        await this.setState({petProfilePicture: petProfilePic})

        console.log(this.state.petProfilePicture)

        this.pictureData.append('petProfilePicture'
        , petProfilePic)
        this.toggleHidden()
    }

    handleBannerPicture = async (bannerPic) => {
        await this.setState(
            {bannerPicture: bannerPic})

            this.bannerData.append('bannerPicture', bannerPic)
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true })
        const pet = new FormData(e.target)
        pet.append("userId", this.context.profile.id)
        const newPet = Object.fromEntries(pet);
        
        createPet(newPet);

        await uploadPetProfilePicture(this.pictureData);

        this.props.history.push('/userdash');

    }
    render() {
        return (
            <div className='create-pet-page'>
                <div className='cppnaplesyellow'> </div>
                <div className='cppbox'>

                <div className="banner">
                    <img src={this.state.bannerPicture} alt="" className="petcreatebanner"/>
                </div>

                    <div className="bannerpicupload">
                    <BannerPictureUpload 
                    onBannerUpload={this.handleBannerPicture}
                    bannerPicture={this.state.bannerPicture}/>
                    </div>

                    <div className="petpicupload">

                    <img src={this.state.petProfilePicture}
                    key={Date.now()}
                    alt='' 
                    className="petprofilepicupload" 
                    />

                    <div onClick={this.toggleHidden.bind(this)} className="uploadpetpicturemenu">Change Pet Picture</div>

                    {!this.state.isHidden && <PetProfilePictureUpload onPetProfilePictureUpload={this.handlePetProfilePicture}
                    petProfilePicture={this.state.petProfilePicture} 
                    />}
                    </div>
                <form onSubmit={this.handleSubmit}>
             
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
                    rows="1" name='petProfileDescription'
                    className='petdesc'
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
