import React, { Component } from 'react'
import { fetchPet } from './fetches/pet-fetches.js'
import { fetchUser } from './fetches/user-fetches.js'
import './style/PetDetails.css';
import Posts from './Posts.js'
import { MainContext } from './MainContext.js'
import { subscribe, unsubscribe, subscribedToPet } from './fetches/user-fetches.js';
import { Link } from 'react-router-dom'

export default class PetDetails extends Component {
    static contextType = MainContext;
    state = {
        loading: false,
        pet: [],
        isSubscribed: '',
        user: []
    }
    componentDidMount = async () => {

        await this.setState({ loading: true });
        const pet = await fetchPet(this.props.match.params.id);
        const isSubscribed = await subscribedToPet(pet.id)
        const user = await fetchUser(pet.userId)


        this.setState({
            loading: false,
            pet: pet,
            isSubscribed,
            user
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
                    <div className='pet-detail-page'>

                        <div className='pdnaplesyellow'> </div>

                        <img
                            className='pet-profile-banner'
                            alt={this.state.pet.petName}
                            src={this.state.pet.bannerPicture} />

                        <div className='pet-profile-info'>
                            <p className='pet-profile-name'>{this.state.pet.petName}</p>

                            <img className='pet-profile-picture' 
                            alt={this.state.pet.petName} 
                            src={this.state.pet.petProfilePicture} />

                            <p className='pet-profile-desc'>{this.state.pet.petProfileDescription}</p>

                            <p className='pet-owner'>Caregiver:</p>
                            <Link to={`/user/${this.state.user.id}`}> 
                            <p className='user-card'> {this.state.user.userName}</p><img className='owner-profile-picture' src={this.state.user.profilePicture} alt='profile' /></Link>

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
                        </div>
                        <div className='pet-posts'>
                        <Posts
                            posts={this.state.pet.posts} />
                        </div>
                    </div>
                }
            </div>
        )
    }
}
