import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class VideoList extends Component {
    render() {
        return (
            <div className='main'>
                <Link className='pet-link' to={`/pets/${this.props.pet.id}`}>
                    <div className='pet-item'>
                        <div>
                            <p className='pet-name'>{this.props.pet.petName}</p>
                            <img className='pet-profile-picture' alt={this.props.pet.petName} src={this.props.pet.petProfilePicture} />
                            <p>{this.props.pet.petProfileDescription}</p>

                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}
