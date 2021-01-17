import React, { Component } from 'react'
import CreatePet from './CreatePet.js'
import { MainContext } from './MainContext.js'


export default class UserDash extends Component {
    static contextType = MainContext;

    render() {
        return (
            <div className="user-dashboard">
                <CreatePet />
            </div>
        )
    }
}
