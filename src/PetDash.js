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
<<<<<<< HEAD
                    petId={this.props.match.params.id}
                    history={this.props.history} />
=======
                    petId={this.props.match.params.id} />
>>>>>>> eb53a3a1b49cfe12d6bc6aa9a4c73d323c6de690
            </div>
        )
    }
}
