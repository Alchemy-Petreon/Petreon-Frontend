import React, { Component } from 'react'
import { fetchUserByEmail } from "./fetches/user-fetches.js"

export default class Login extends Component {
    componentDidMount = async () => {

        if (this.props.match.params.exisiting === 'true') {
            const exisitingUser = await fetchUserByEmail()
            this.props.handleAppState({ userInfo: exisitingUser })
            this.props.history.push('/userdash')
        } else {
            this.props.handleAppState({ loginInfo: this.props.match.params })
            this.props.history.push('/signup')
        }
    }

    render() {
        return (
            <div style={{ height: "80vh" }}>
            </div>
        )
    }
}
