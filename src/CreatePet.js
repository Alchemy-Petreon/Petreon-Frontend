import React, { Component } from 'react'
import { createPet } from "./fetches/pet-fetches.js"


export default class CreatePet extends Component {
    state = {
        petName: '',
        type: '',
        petProfilePicture: '',
        petProfileDescription: '',
        bannerPicture: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        console.log(this.state);

        this.setState({ loading: true })
        const pet = {
            userId: this.props.user.id,

            petName: this.state.petName,
            type: this.state.type,
            petProfilePicture: this.state.petProfilePicture,
            petProfileDescription: this.state.petProfileDescription,
            bannerPicture: this.state.bannerPicture
        }
        createPet(pet);

        this.props.history.push('/');

    }
    render() {
        return (
            <div className='create-pet-page'>
                <div className='box'>
                    <h2 className='create-pet'> Create Pet</h2>

                    <form onSubmit={this.handleSubmit}>
                        <p className='pet-name'>Pet Name:</p>
                        <input onChange={(e) => this.setState({ petName: e.target.value })}
                            value={this.state.petName}></input>
                        <p className='pet-type'>Pet Type:</p>
                        <input onChange={(e) => this.setState({ type: e.target.value })}
                            value={this.state.type} ></input>
                        <p className='pet-picture'>Pet Profile Picture URL:</p>
                        <input onChange={(e) => this.setState({ petProfilePicture: e.target.value })}
                            value={this.state.petProfilePicture} ></input>
                        <p className='pet-description'>Pet Description:</p>
                        <input onChange={(e) => this.setState({ petProfileDescription: e.target.value })}
                            value={this.state.petProfileDescription} ></input>
                        <p className='pet-banner'>Banner Picture URL:</p>
                        <input onChange={(e) => this.setState({ bannerPicture: e.target.value })}
                            value={this.state.bannerPicture} ></input>
                        <br />
                        <button className='create-pet-button'>Submit</button>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}
