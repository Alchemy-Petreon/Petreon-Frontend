import React, { Component } from 'react'
import { fetchPet } from './fetches/pet-fetches.js'
import './style/PetDetails.css';
import Posts from './Posts.js'
import { MainContext } from './MainContext.js'
import { subscribe, unsubscribe, subscribedToPet } from './fetches/user-fetches.js';
import request from 'superagent';


export default class PetDetails extends Component {
    static contextType = MainContext;
    state = {
        loading: false,
        pet: [],
        isSubscribed: ''
    }
    componentDidMount = async () => {

        await this.setState({ loading: true });
        const pet = await fetchPet(this.props.match.params.id);
        const isSubscribed = await subscribedToPet(pet.id)

        this.setState({
            loading: false,
            pet: pet,
            isSubscribed
        })

    };

    handleSubscribe = async (petId) => {
        await this.setState({ loading: true })

        const isSubscribed = await subscribe(petId);
        await this.setState({
            isSubscribed,
            loading: false
        })
        console.log(this.state)

    }

    handleUnsubscribe = async (petId) => {
        await this.setState({ loading: true })
        const isSubscribed = await unsubscribe(petId);
        await this.setState({
            isSubscribed,
            loading: false
        })
        console.log(this.state)
    }


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
                        <p>
                            {this.state.isSubscribed ?
                                <button
                                    onClick={() => this.handleUnsubscribe(this.state.pet.id)}>
                                    UnSubscribe </button>
                                :
                                <button
                                    onClick={() => this.handleSubscribe(this.state.pet.id)}>
                                    Subscribe
                                </button>
                            }
                        </p>
                        <Posts
                            posts={this.state.pet.posts} />
                    </div>
                }
            </div>
        )
    }
}
