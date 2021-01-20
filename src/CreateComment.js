import React, { Component } from 'react'
import { createComment } from "./fetches/comment-fetches.js"



export default class CreateComment extends Component {

    state = {
        commentText: ''
    }

    handleCreate = async (e) => {
        e.preventDefault();

        console.log(this.state);

        this.setState({ loading: true })
        const comment = {

            userId: this.props.userId,
            postId: this.props.postId,
            text: this.state.commentText

        }
        await createComment(comment);
        this.props.changeLoading(true)

    }
    render() {
        return (
            <div className='comment-box'>
                <div className='add-comment'>

                    <form onSubmit={this.handleCreate}>
                        <input 
                            className='comment-input'
                            placeholder='Add Comment...'
                            onChange={(e) => this.setState({ commentText: e.target.value })}
                            value={this.state.commentText}></input>
                        <button className='create-comment-button'>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
