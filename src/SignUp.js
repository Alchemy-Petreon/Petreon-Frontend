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
        likes: '',
        file: null
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
        await createUser(user);
    }

    render() {
        return (
            <div className='sup'>
                <div className='naplesyellowborder'> </div>

                    <h3 className='suhead'> Sign Up</h3>

                    <div className="box">

                    <form onSubmit={this.handleSubmit}>
                        
                        <p>Username:</p>
                        <input 
                            className= 'userinput' name="userName" 
                            onChange={(e) => this.setState({ userName: e.target.value })}
                                value={this.state.userName} />
                        
                        <p>First Name:</p>
                        <input className='nameinput' name="firstName" onChange={(e) => this.setState({ firstName: e.target.value })}
                            value={this.state.firstName} />
                        
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
                        onChange={(e) => this.setState({ profileDescription: e.target.value })}
                            value={this.state.profileDescription} />
                        
                        <br />
                        
                        <button className='signup-button'>Submit</button>
                        
                        <br />
                    </form>
                    </div>
            </div>
        )
    }
}
