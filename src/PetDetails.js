import React, { Component } from 'react'
import { fetchPet } from './fetches/pet-fetches.js'
import './style/PetDetails.css';
import Posts from './Posts.js'
import { MainContext } from './MainContext.js'


export default class PetDetails extends Component {
    static contextType = MainContext;
    state = {
        loading: false,
        pet: [],
    }
    componentDidMount = async () => {
        await this.setState({ loading: true });
        const pet = await fetchPet(this.props.match.params.id);
        this.setState({
            loading: false,
            pet: pet
        })
    };

    render() {
        return (
            <div>
                {this.state.loading
                    ? <img src={'/loading-spinner.gif'} alt={''} />
                    :
                    <div>
                        <div>
                            <img className='pet-profile-picture' alt={this.state.pet.petName} src={this.state.pet.petProfilePicture} />
                        </div>
                        <p>{this.state.pet.petName}</p>
                        <p>{this.state.pet.petProfileDescription}</p>

                        <Posts />
                    </div>
                }
            </div>
        )
    }
}
