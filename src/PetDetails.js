import React, { Component } from 'react'
import { fetchPet } from './fetches/pet-fetches.js'
import { fetchUser } from './fetches/user-fetches.js'
import './style/PetDetails.css';
import Posts from './Posts.js'
import { MainContext } from './MainContext.js'

import { subscribe } from './fetches/user-fetches.js';

import { Link } from 'react-router-dom';



export default class PetDetails extends Component {
    static contextType = MainContext;
    state = {
        loading: false,
        pet: [],
        user: []
    }
    componentDidMount = async () => {

        await this.setState({ loading: true });
        const pet = await fetchPet(this.props.match.params.id);
        const user = await fetchUser(pet.userId);

        this.setState({
            loading: false,
            pet: pet,
            user: user
        })
        console.log(this.state.pet)
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
                        <Link to={`/user/${this.state.user.id}`}> <p>Owned by: {this.state.user.userName}<img src={this.state.user.profilePicture} alt='profile' /></p></Link>
                        <p>{this.state.pet.petProfileDescription}</p>
                        <p><button
                            onClick={() => subscribe(this.state.pet.id)}>
                            Subscribe
                            </button>
                        </p>
                        <Posts
                            posts={this.state.pet.posts} />
                    </div>
                }
            </div>
        )
    }
}
