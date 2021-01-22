import React, { Component } from 'react';
import { fetchUser } from "./fetches/user-fetches.js"
import { fetchUserPets } from './fetches/pet-fetches.js';
import { Link } from 'react-router-dom';

var QRCode = require('qrcode.react');

export default class UserProfile extends Component {
    state = {
        user: {},
        petArray: {}
    }
    
    componentDidMount = async () => {

        await this.setState({ loading: true });
        const user = await fetchUser(this.props.match.params.id);
        const petArray = await fetchUserPets(this.props.match.params.id)
        this.setState({
            loading: false,
            user: user,
            petArray: petArray
        })
        console.log(this.state.user, this.state.petArray)
    };

    render() {
        return (
            <section>
                <div className='user-profile'>
                    <div className='user-profile-info'>
                        <p className='user-profile-userName'>{this.state.user.userName}</p>
                        <img src={this.state.user.profilePicture} className='user-profile-profilePicture' alt='profile' />
                        <p className='user-profile-profileDescription'>{this.state.user.profileDescription}</p>
                        <QRCode value={`venmo://paycharge?txn=pay&recipients=${this.state.user.venmo}&amount=1&note=For-${this.state.user.firstName}s-pets`} />
                    </div>

                    <div className='user-profile-pets'>
                        <p className='user-profile-pets-header'>Pets</p>
                        {this.state.petArray.length > 0 ?
                            this.state.petArray.map(pet =>
                                <div> 
                                    <Link to={`/pets/${pet.id}`}>
                                    <p className='user-profile-petName'>{pet.petName}</p>
                                    <img src={pet.petProfilePicture} className='user-profile-pet-picture' alt='pet' />
                                    </Link>
                                </div>)
                            : null}
                    </div>
                </div>
            </section>
        )
    }
}
