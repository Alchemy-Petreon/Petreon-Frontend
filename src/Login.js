import React, { Component } from 'react'
import { fetchUserByEmail } from "./fetches/user-fetches.js"

export default class Login extends Component {
    componentDidMount = async () => {
        console.log('/----------------------')
        console.log(this.props.match.params.exisiting)
        console.log('/----------------------')
        //     console.log('/----------------------')
        //     console.log(this.props.match.params.email)
        //     console.log('/----------------------')
        if (this.props.match.params.exisiting === true) {
            const exisitingUser = await fetchUserByEmail(this.props.match.email)
            console.log('/----------------------')
            console.log(exisitingUser)
            console.log('/----------------------')
        } else {
            this.props.handleAppState({ loginInfo: this.props.match.params })
            this.props.history.push('/signup')
        }
    }

    render() {
        return (
            <div>
                HELLO!
            </div>
        )
    }
}
