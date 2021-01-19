import React, { Component } from 'react';
import { fetchUserPets } from '../fetches/pet-fetches.js';
import { MainContext } from '../MainContext.js';
import { Link } from 'react-router-dom';
import '../style/Pets.css'

export default class Pets extends Component {
    static contextType = MainContext;
    state = {
        petArray: []
    }

    componentDidMount = async() => {
        const petArray = await fetchUserPets(this.context.profile.id)

        await this.setState({
            petArray: petArray
        });
        console.log(this.state.petArray)
    };

    render() {
        return (
            <div className='petsdisplay'>
                <h5 className='petsheader'>Pets</h5>

                {this.state.petArray.length > 0 ? 
                this.state.petArray.map(pet =>
                    <div className='petownerthumbnail'>

                    <p className='petthumbnailname'>{pet.petName}</p>

                    <img className='petthumbnail' src={pet.petProfilePicture} alt='' />
                    </div>)

                : null } 
                    <Link to="/createpet"><p className="add-pet-button">Add Pet</p></Link>
            </div>
        )
    }
}
