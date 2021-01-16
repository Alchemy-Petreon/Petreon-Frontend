import React, { Component } from 'react'
import { createUser } from "./fetches/user-fetches.js"
import './style/SignUp.css'


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
        const user = new FormData(e.target)
        // const user = {
        //     userName: this.state.userName,
        //     firstName: this.state.firstName,
        //     email: this.state.email,
        //     profilePicture: this.state.profilePicture,
        //     profileDescription: this.state.profileDescription,
        //     likes: "0"
        // }
        await createUser(user);



    }
    render() {
        return (
            <div className='sup'>
                <div className='naplesyellowborder'> </div>

                    <h3 className='suhead'> Sign Up</h3>

                    <div className="box">

                    <form onSubmit={this.handleSubmit}>
                        
                        <p className='username'>Username:</p>
                        <input name="userName" onChange={(e) => this.setState({ userName: e.target.value })}
                            value={this.state.userName}></input>
                        
                        <p className='firstname'>First Name:</p>
                        <input name="firstName" onChange={(e) => this.setState({ firstName: e.target.value })}
                            value={this.state.firstName} ></input>
                        
                        {/* <p className='email'>E-mail:</p>
                        <p>{this.state.email}</p> */}
                        
                        <p className='profile-pic'>Profile Picture:</p>
                        <input type="file" name="profilePicture" onChange={(e) => this.setState({ profilePicture: e.target.value })}
                            value={this.state.profilePicture} ></input>
                        
                        <p className='profile-desc'>Tagline:</p>
                        <input name="profileDescription" onChange={(e) => this.setState({ profileDescription: e.target.value })}
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
