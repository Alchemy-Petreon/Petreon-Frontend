import React, { Component } from 'react'
import { createComment } from "./fetches/comment-fetches.js"


export default class CreatePet extends Component {
    state = {
        commentText: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        console.log(this.state);

        this.setState({ loading: true })
        const comment = {
            userId: this.props.userId,
            postId: this.props.postId,
            commentText: this.state.commentText

        }
        createComment(comment);

    }
    render() {
        return (
            <div className='create-pet-page'>
                <div className='box'>
                    <h2 className='create-comment'> Sign Up</h2>
                    <form onSubmit={this.handleSubmit}>
                        <p className='comment'>Comment Text:</p>
                        <input onChange={(e) => this.setState({ commentText: e.target.value })}
                            value={this.state.commentText}></input>
                        <br />
                        <button className='create-comment-button'>Submit</button>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}