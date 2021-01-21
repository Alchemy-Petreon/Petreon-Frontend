import React, { Component } from 'react'
import { createPost, updatePostPicture } from "../fetches/post-fetches.js"
import { MainContext } from '../MainContext.js'
import mime from 'mime-types';

export default class CreatePet extends Component {
    static contextType = MainContext;

    state = {
        postText: '',
        mediaType: '',
        mediaFile: '',
        mediaURL: '',
        mediaTypeName: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        let newMedia = new FormData(e.target)

        const newPost = {
            petId: this.props.petId,
            userId: this.context.profile.id,
            mediaType: this.state.mediaType,
            postText: this.state.postText
        }

        let newPostResponse = await createPost(newPost);

        await updatePostPicture(newMedia, newPostResponse.id)

        this.props.history.push(`/pets/${this.props.petId}`);

    }

    handleFileChange = async (e) => {

        const mediaType = mime.lookup(e.target.value)
        const mediaTypeName = mediaType.split('/')[0]

        await this.setState({
            mediaFile: e.target.value,
            mediaType,
            mediaURL: URL.createObjectURL(e.target.files[0]),
            mediaTypeName: mediaTypeName,
        })
    }


    render() {
        return (
            <div className='create-post-page'>

                <div className='create-post-box'>

                    <h2 className='create-post-header'> Add New Post</h2>

                    <form onSubmit={this.handleSubmit}>

                        <p className='post-media'>Post Media</p>

                        <input
                            name='mediaFile'
                            className='post-media-submit'
                            type='file'
                            accept="image/*"
                            onChange={(e) => this.handleFileChange(e)}
                            value={this.state.mediaFile} />

                        <br />

                        {this.state.mediaTypeName === 'image'
                            ? <img
                                className='post-preview-image'
                                alt='post preview'
                                src={this.state.mediaURL} />
                            : null}

                        <p className='caption-header'>Caption</p>

                        <input
                            name='postText'
                            maxLength='500'
                            className='post-text-input'
                            onChange={(e) => this.setState({ postText: e.target.value })}
                            value={this.state.postText} />

                        <br />

                        <button className='create-post-button'>Submit</button>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}
