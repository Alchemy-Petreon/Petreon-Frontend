import React, { Component } from 'react';
import { fetchUserPets } from '../fetches/pet-fetches.js';
import { MainContext } from '../MainContext.js';
import '../style/Pets.css'

export default class Pets extends Component {
    static contextType = MainContext;
    state = {
        petArray: []
    }

    componentDidMount = async() => {
        const petArray = await fetchUserPets(this.context.profile.id)

        this.setState({
            pets: petArray
        });
    };

    render() {
        return (
            <div className='petsdisplay'>
                <h5 className='petsheader'>Pets</h5>

                {this.state.petArray.length > 0 ? 
                this.state.petArray.map(pet =>
                    <div className='petthumbnail'>
                    <p className='petthumbnailname'>{pet.petName}</p>
                    <img className='petthumbnail' src={pet.petProfilePicture} alt='' />
                    </div>)
                : null } 
            </div>
        )
    }
}
