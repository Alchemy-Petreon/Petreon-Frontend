import React, { Component } from 'react'
import { createUser, checkUsername } from "./fetches/user-fetches.js"
import './style/SignUp.css'


export default class SignUp extends Component {
    state = {
        userName: '',
        firstName: '',
        email: '',
        profileDescription: '',
        validUsername: true
    }

    componentDidMount = () => {
        this.setState({
            email: this.props.loginInfo.email,
            firstName: this.props.loginInfo.firstName,
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ loading: true })
        const user = new FormData(e.target)
        const newUser = Object.fromEntries(user);
        await createUser(newUser);
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
                            onChange={(e) => this.handleUsername(e)}
                            value={this.state.userName}
                            required
                        />
                        {this.state.validUsername ?
                            <></>
                            :
                            <p>INVALID USERNAME</p>

                        }

                        <p>First Name:</p>
                        <input
                            className='nameinput'
                            name="firstName"
                            maxLength="35"
                            onChange={(e) => this.setState({ firstName: e.target.value })}
                            value={this.state.firstName}
                            required
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
                            required
                        />

                        <br />

                        <button
                            className='signup-button'
                            disabled={!this.state.validUsername}>
                            Submit
                            </button>

                        <br />
                    </form>
                </div>
            </div>
        )
    }
}
