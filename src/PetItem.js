import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class VideoList extends Component {
    render() {
        return (
            <div>
                <Link className='pet-link' to={`/pets/${this.props.pet.id}`}>
                    <div className='pet-item'>
                        <div>
                            <img className='pet-browse-picture' alt={this.props.pet.petName} src={this.props.pet.petProfilePicture} />

                            <p className='pet-name'>{this.props.pet.petName}</p>
                            
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}
