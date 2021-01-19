import React, { Component } from 'react';
import CreatePost from '../CreatePost.js';
import PetInformation from './PetInformation.js';
import { MainContext } from '../MainContext.js';
import '../style/PetDash.css';


export default class PetDash extends Component {
    static contextType = MainContext;


    render() {
        return (
            <div className="user-dashboard">
                <div className="bittersweetud"> </div>
                <div className="naplesyellowud"> </div>
                <PetInformation 
                    petId={this.props.match.params.id}
                    />
                <CreatePost
                    petId={this.props.match.params.id}
                    history={this.props.history} />
            </div>
        )
    }
}
