import React, { Component } from 'react'
import { fetchPet } from './fetches/pet-fetches.js'
import { fetchUser } from './fetches/user-fetches.js'
import './style/PetDetails.css';
import Posts from './Posts.js'
import { MainContext } from './MainContext.js'
import { subscribe, unsubscribe, subscribedToPet } from './fetches/user-fetches.js';
import { Link } from 'react-router-dom'
var QRCode = require('qrcode.react');

export default class PetDetails extends Component {
    static contextType = MainContext;
    state = {
        loading: true,
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
    };

    handleUnsubscribe = async (petId) => {
        await this.setState({ loading: true })
        const isSubscribed = await unsubscribe(petId);
        await this.setState({
            isSubscribed,
            loading: false
        })
    };


    render() {
        return (
            <div>
                {this.state.loading
                    ? <img src={'/loading-spinner.gif'} className='loading-spinner' alt={''} />
                    :
                    <div className='pet-detail-page'>

                        <div className='pdnaplesyellow'> </div>


                        <div className='pet-profile-info'>
                            <p className='pet-profile-name'>{this.state.pet.petName}</p>

                            <img className='pet-profile-picture'
                                alt={this.state.pet.petName}
                                src={this.state.pet.petProfilePicture} />

                            <p className='pet-profile-desc'>{this.state.pet.petProfileDescription}</p>

                            <p className='pet-owner'>Caregiver</p>
                            <Link to={`/user/${this.state.user.id}`}>
                                <p className='user-card'> {this.state.user.userName}</p><img className='owner-profile-picture' src={this.state.user.profilePicture} alt='profile' /></Link>


                            <div>
                                <p className='qrcode-text'>Buy {this.state.pet.petName} a treat!</p>
                                <QRCode value={`venmo://paycharge?txn=pay&recipients=${this.state.pet.venmo}&amount=1&note=For-${this.state.pet.petName}'s-treats`} />
                            </div>
                            <br />

                            {this.state.isSubscribed ?
                                <button
                                    className='unsubscribe-button'
                                    onClick={() => this.handleUnsubscribe(this.state.pet.id)}>
                                    Unsubscribe </button>
                                :
                                <button
                                    className='subscribe-button'
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
