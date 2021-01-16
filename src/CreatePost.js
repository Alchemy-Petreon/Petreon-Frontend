import React, { Component } from 'react'
import { createPost } from "./fetches/post-fetches.js"




export default class CreatePet extends Component {
    state = {
        pictureUrl: '',
        videoUrl: '',
        postText: '',
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        console.log(this.state);

        this.setState({ loading: true })
        const post = new FormData(e.target)
        // const post = {
        //     petId: this.props.petId,
        //     userId: this.props.userId,
        //     pictureUrl: this.state.pictureUrl,
        //     videoUrlUrl: this.state.videoUrl,

        // }
        post.append("petId", this.props.petId)
        post.append("userId", this.props.userId)
        createPost(post);

        this.props.history.push('/');

    }
    render() {
        return (
            <div className='create-post-page'>
                <div className='box'>
                    <h2 className='create-post'> Sign Up</h2>
                    <form onSubmit={this.handleSubmit}>
                        <p className='post-text'>Post Text:</p>
                        <input name='postText' onChange={(e) => this.setState({ postText: e.target.value })}
                            value={this.state.postText}></input>
                        <p className='post-pictuer'>Picture URL:</p>
                        <input name='pictureUrl' type='file' onChange={(e) => this.setState({ pictureUrl: e.target.value })}
                            value={this.state.pictureUrl} ></input>
                        <p className='pet-video'>Video URL:</p>
                        <input name='videoUrl' type='file' onChange={(e) => this.setState({ videoUrl: e.target.value })}
                            value={this.state.videoUrl} ></input>
                        <br />
                        <button className='create-post-button'>Submit</button>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}
