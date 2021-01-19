import React, { Component } from 'react';
import '../style/CreatePets.css'
import { createPet, uploadPetBanner, uploadPetProfilePicture } from '../fetches/pet-fetches.js';
import { MainContext } from '../MainContext.js';
// import PetProfilePictureUpload from './PetProfilePictureUpload.js';
// import BannerPictureUpload from './BannerPictureUpload.js';


export default class CreatePet extends Component {
    static contextType = MainContext;

    state = {
        petName: '',
        bannerPicture: 'https://placekitten.com/1300/350',
        type: '',
        petProfilePicture: 'https://placekitten.com/250/250',
        petProfileDescription: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true })

        const pet = new FormData(e.target)

        const newPet = {
            userId: this.context.profile.id,
            petName: this.state.petName,
            type: this.state.type,
            petProfileDescription: this.state.petProfileDescription
        }

        console.log(newPet);
        console.log(pet);

        // pet.append("userId", this.context.profile.id)

        // const newPet = Object.fromEntries(pet);
        
        let petInfo = await createPet(newPet);
        
        await uploadPetProfilePicture(petInfo.id, pet);
        await uploadPetBanner(petInfo.id, pet);
        
        this.props.history.push('/userdash');

    }
    render() {
        return (
            <div className='create-pet-page'>

                <div className='cppnaplesyellow'> </div>

                <div className='cppbox'>

                <form onSubmit={this.handleSubmit}>

                <div className="banner">
                    <img 
                        src={this.state.bannerPicture} 
                        alt="" 
                        className="petcreatebanner"/>
                </div>

                <div className="bannerpicupload">
                    <div className='bannerpicchange'>
                        <input
                            type="file"
                            name="bannerPicture"
                            onChange={(e) => this.setState({bannerPicture: e.target.value})}
                            value={this.state.bannerPicture}/>
                        {/* <button className='bannerpicsubbutton'>Submit</button> */}
                    </div>
                </div>

                <div className="petpicupload">
                    <img 
                        src={this.state.petProfilePicture}
                        key={Date.now()}
                        alt='' 
                        className="petprofilepicupload" 
                    />
                    
                    <div className='petprofilepicchange'>
                        <input
                            type="file"
                            name="petProfilePicture"
                            className="petprofilepicsubmit"
                            onChange={(e) => this.setState({petProfilePicture: e.target.value })}
                            value={this.state.petProfilePicture}/>
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

                    <button className='create-pet-button'>Save Changes</button>
                    <br />
                    </form>
                </div>
            </div>
        )
    }
}
