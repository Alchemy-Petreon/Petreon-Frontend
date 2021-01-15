import React, { Component } from 'react'
import { createUser } from "./fetches/user-fetches.js"


export default class SignUp extends Component {
    state = {
        userName: '',
        firstName: '',
        email: '',
        profilePicture: '',
        profileDescription: '',
        likes: ''

    }

    componentDidMount = () => {

        this.setState({
            email: this.props.loginInfo.email,
            firstName: this.props.loginInfo.firstName,
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        console.log(this.state);

        this.setState({ loading: true })
        const user = {
            userName: this.state.userName,
            firstName: this.state.firstName,
            email: this.state.email,
            profilePicture: this.state.profilePicture,
            profileDescription: this.state.profileDescription,
            likes: "0"
        }
        await createUser(user);



    }
    render() {
        return (
            <div className='sign-up-page'>
                <div className='box'>
                    <h2 className='user-signup'> Sign Up</h2>
                    <form onSubmit={this.handleSubmit}>
                        <p className='user-name'>User Name:</p>
                        <input onChange={(e) => this.setState({ userName: e.target.value })}
                            value={this.state.userName}></input>
                        <p className='first-Name'>First Name:</p>
                        <input onChange={(e) => this.setState({ firstName: e.target.value })}
                            value={this.state.firstName} ></input>
                        <p className='email'>Email:</p>
                        <p>{this.state.email}</p>
                        {/* <input onChange={(e) => this.setState({ email: e.target.value })}
                            value={this.state.email} ></input> */}
                        <p className='profile-picture'>Profile Picture URL:</p>
                        <input onChange={(e) => this.setState({ profilePicture: e.target.value })}
                            value={this.state.profilePicture} ></input>
                        <p className='profile-description'>Profile Description:</p>
                        <input onChange={(e) => this.setState({ profileDescription: e.target.value })}
                            value={this.state.profileDescription} ></input>
                        <br />
                        <button className='signup-button'>Submit</button>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}
