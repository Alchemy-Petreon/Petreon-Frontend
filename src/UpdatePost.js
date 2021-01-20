import React, { Component } from 'react'
import { updatePost, updatePostPicture, fetchPost } from "./fetches/post-fetches.js"
import { MainContext } from './MainContext.js'
import mime from 'mime-types';

export default class UpdatePost extends Component {
    static contextType = MainContext;

    state = {
        postText: '',
        mediaType: '',
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
            mediaUrl: URL.createObjectURL(e.target.files[0]),
            mediaTypeName: mediaTypeName,
        })

    }


    render() {
        return (
            <div className='post-detail-page'>
                <div className='post-detail-naplesyellow'> </div>

                <div className='post-detail'>

                    <form onSubmit={this.handleSubmit}>

                    {this.state.mediaTypeName === 'image'
                    ? <img
                        className='post-update-picture'
                        alt='post preview'
                        src={this.state.mediaUrl} />
                    :
                    <img
                        className='post-update-picture'
                        alt='post preview'
                        src={this.state.post.mediaUrl} />
                    }

                        <textarea 
                            name='postText' 
                            maxLength='144'
                            className='post-update-text'
                            rows='1'
                            placeholder={this.state.post.postText}
                            onChange={(e) => this.setState({ postText: e.target.value })}
                            value={this.state.postText} />
                        <br />

                        <input
                            name='mediaFile'
                            className='post-update-media'
                            type='file'
                            accept='image/*'
                            onChange={(e) => this.handleFileChange(e)}
                            value={this.state.mediaFile} />

                        <button className='edit-post-button'>Save Changes</button>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}
