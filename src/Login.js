import React, { Component } from 'react'

export default class Login extends Component {
    componentDidMount() {
        console.log('/----------------------')
        console.log(this.props.match.params)
        console.log('/----------------------')
        console.log('/----------------------')
        console.log(this.props.match.params.email)
        console.log('/----------------------')
    }

    render() {
        return (
            <div>
                HELLO!
            </div>
        )
    }
}
