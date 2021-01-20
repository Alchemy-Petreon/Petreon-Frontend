import React, { Component } from 'react'
import { updatePost, updatePostPicture, fetchPost } from "./fetches/post-fetches.js"
import { MainContext } from './MainContext.js'
import mime from 'mime-types';

export default class UpdatePost extends Component {
    static contextType = MainContext;

    state = {
        postText: '',
        mediaType: '',
        invalidMediaType: false,
        mediaFile: '',
        mediaURL: '',
        mediaTypeName: '',
        post: []
    }
    
    componentDidMount = async () => {
        await this.setState({ loading: true });
        const post = await fetchPost(this.props.match.params.id);
        this.setState({
            post: post
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        let newMedia = new FormData(e.target)

        const newPost = {

            petId: this.state.post.petId,
            userId: this.context.profile.id,
            mediaType: this.state.mediaType,
            postText: this.state.postText
        }

        let newPostResponse = await updatePost(this.props.match.params.id, newPost);

        await updatePostPicture(newMedia, newPostResponse.id)

        this.props.history.push(`/pets/${this.state.post.petId}`);

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

                    <h2 className='create-post-header'>Update Post</h2>

                    <form onSubmit={this.handleSubmit}>

                        <p className='post-media'>Post Media</p>

                        <input
                            name='mediaFile'
                            className='post-media-submit'
                            type='file'
                            accept='image/*'
                            onChange={(e) => this.handleFileChange(e)}
                            value={this.state.mediaFile} />

                        <br />

                        {this.state.mediaTypeName === 'image'
                            ? <img
                                className='post-preview-image'
                                alt='post preview'
                                src={this.state.mediaURL} />
                            : null}

                        <p className='post-text'>Caption</p>

                        <input 
                            name='postText' 
                            maxLength='144'
                            onChange={(e) => this.setState({ postText: e.target.value })}
                            value={this.state.postText} />

                        <br />

                        <button className='create-post-button' disabled={this.state.invalidMediaType}>Submit</button>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}
