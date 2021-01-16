import React, { Component } from 'react'
import CreatePet from './CreatePet.js'

export default class UserDash extends Component {
    render() {
        return (
            <div className="user-dashboard">
                <CreatePet />
            </div>
        )
    }
}
