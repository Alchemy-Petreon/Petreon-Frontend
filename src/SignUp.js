import React, { Component } from 'react'
import { createUser } from "./fetches/user-fetches.js"
import { MainContext } from './MainContext.js'
import './style/SignUp.css'


export default class SignUp extends Component {
    static contextType = MainContext;

    state = {
        userName: '',
        firstName: '',
        email: '',
        profileDescription: '',
        validUsername: true
    }

    componentDidMount = () => {
        const profile = this.context.profile;

        this.setState({
            email: profile.email,
            firstName: profile.firstName,
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true })
        const user = new FormData(e.target)
        const newUser = Object.fromEntries(user);
        const newProfile = await createUser(newUser);

        this.context.setProfile({ profile: newProfile })
        this.context.logIn();

        this.props.history.push('/userdash')
    }

    handleUsername = async (e) => {
        e.preventDefault();

        await this.setState({ userName: e.target.value });
        if (this.state.userName) {
            const currentUsername = await checkUsername(this.state.userName)
            await this.setState({ validUsername: !currentUsername })
        }
    }


    render() {
        return (
            <div className='sup'>
                <div className='naplesyellowborder'> </div>

                <h3 className='suhead'>Sign Up</h3>

                <div className="box">

                    <form onSubmit={this.handleSubmit}>

                        <p>Username:</p>
                        <input
                            className='userinput'
                            name="userName"
                            maxLength="35"
                            onChange={(e) => this.setState({ userName: e.target.value })}
                            value={this.state.userName}
                        />

                        <p>First Name:</p>
                        <input
                            className='nameinput'
                            name="firstName"
                            maxLength="35"
                            onChange={(e) => this.setState({ firstName: e.target.value })}
                            value={this.state.firstName}
                        />

                        {/* <p>Profile Picture:</p>
                        <input 
                        type="file" 
                        name="profilePicture"
                        className="profilepic"
                        onChange={(e) => this.setState({ profilePicture: e.target.value })}
                            value={this.state.profilePicture}/>
                         */}

                        <p>Tagline:</p>
                        <input
                            className='descinput'
                            name="profileDescription"
                            maxLength="144"
                            onChange={(e) => this.setState({ profileDescription: e.target.value })}
                            value={this.state.profileDescription}
                        />

                        <br />

                        <button className='signup-button'>Submit</button>

                        <br />
                    </form>
                </div>
            </div>
        )
    }
}
