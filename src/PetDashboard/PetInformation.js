import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { fetchPet } from '../fetches/pet-fetches';
import { MainContext } from '../MainContext'

export default class PetInformation extends Component {
    static contextType = MainContext;
    state = {
        loading: false,
        pet: []
    }

    componentDidMount = async () => {
        await this.setState({ loading: true });
        const pet = await fetchPet(this.props.petId);
        this.setState({
            loading: false,
            pet: pet
        })
        console.log(this.state.pet)
    }

    render() {
        return (
            <div className='petdashinfo'>
                <h2 className='petdashname'>{this.state.pet.petName}</h2>
                <Link to={`/pets/${this.state.pet.id}`}><img
                    src={this.state.pet.petProfilePicture}
                    className="petdashpic"
                    alt={this.state.pet.petName} /></Link>
                <h6 className='petdashdescription'>{this.state.pet.petProfileDescription}</h6>
                <h6 className='petdashfollowers'>Followers: </h6>

                <Link to={`/pets/${this.props.petId}`}><span className='details-link'>Go to Pet Profile</span></Link>
                <Link to={`/update-pet/${this.props.petId}`}><button>Update Pet</button></Link>
            </div>
        )
    }
}
