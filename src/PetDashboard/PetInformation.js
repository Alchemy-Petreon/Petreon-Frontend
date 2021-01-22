import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { fetchPet, deletePet } from '../fetches/pet-fetches';
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
    handleDelete = async () => {
        await deletePet(this.state.pet.id)
        this.props.history.push('/userdash')
    }


    render() {
        return (
            <div> {
                this.state.loading
                    ? <img src={'/loading-spinner.gif'} className='loading-spinner' alt={''} />
                    :
                    <div className='petdashinfo'>

                        <h2 className='petdashname'>{this.state.pet.petName}</h2>

                        <Link to={`/pets/${this.state.pet.id}`}>
                            <img
                                src={this.state.pet.petProfilePicture}
                                className="petdashpic"
                                alt={this.state.pet.petName} />
                        </Link>

                        <h6 className='petdashdescription'>{this.state.pet.petProfileDescription}</h6>

                        <h6 className='petdashfollowers'>Followers: {this.state.pet.subCount}</h6>

                        <div className='pet-dash-buttons'>
                            <Link to={`/pets/${this.props.petId}`}>
                                <button className='details-link'>Go to Pet Profile</button>
                            </Link>

                            <Link to={`/update-pet/${this.props.petId}`}>
                                <button className='update-pet-button'>Update Pet</button>
                            </Link>

                            <button className='delete-pet-button'
                                onClick={this.handleDelete}>Delete Pet</button>
                        </div>
                    </div>
            }</div>
        )
    }
}
