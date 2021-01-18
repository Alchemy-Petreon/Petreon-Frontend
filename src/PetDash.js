import React, { Component } from 'react'
import CreatePost from './CreatePost.js'
import { MainContext } from './MainContext.js'
import UserInformation from './UserInformation.js'


export default class PetDash extends Component {
    static contextType = MainContext;


    render() {
        return (
            <div className="user-dashboard">
                <UserInformation
                    user={this.context.user} />
                <h6>Pets:</h6>
                <CreatePost
                    petId={this.props.match.params.id} />
            </div>
        )
    }
}
