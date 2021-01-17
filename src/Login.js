import React, { Component } from 'react'
import { fetchUserByEmail } from "./fetches/user-fetches.js"
import { MainContext } from './MainContext.js'

export default class Login extends Component {
    static contextType = MainContext;

    componentDidMount = async () => {
        if (this.props.match.params.exisiting === 'true') {
            const exisitingUser = await fetchUserByEmail()
            this.context.setProfile({ profile: exisitingUser })
            this.context.logIn();
            this.props.history.push('/userdash')
        } else {
            this.props.setProfile({ profile: this.props.match.params })
            this.props.history.push('/signup')
        }
    }
    render() {
        return (
            <div style={{ height: "100vh" }}>
            </div>
        )
    }
}
