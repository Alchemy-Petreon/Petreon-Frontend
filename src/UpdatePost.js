import React, { Component } from 'react'
import { updatePost, updatePostPicture, fetchPost } from "./fetches/post-fetches.js"
import { MainContext } from './MainContext.js'
import mime from 'mime-types';

export default class CreatePet extends Component {
    static contextType = MainContext;

    state = {
        postText: '',
        mediaType: '',
        invalidMediaType: false,
        mediaFile: '',
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

    handleFileChange = (e) => {
        const mediaType = mime.lookup(e.target.value)

        if (mediaType.split('/')[0] === 'image' || mediaType.split('/')[0] === 'video') {
            this.setState({
                mediaFile: e.target.value,
                mediaType
            })
        } else {
            window.alert('INVALID MEDIA TYPE');
            this.setState({ mediaFile: '' })
        }

        // this.props.history.push(`/pets/${this.props.petId}`);

    }


    render() {
        return (
            <div className='create-post-page'>
                <div className='box'>
                    <h2 className='create-post'> Make A Post for Your Pet!</h2>
                    <form onSubmit={this.handleSubmit}>
                        <p className='post-text'>Post Text:</p>
                        <input name='postText' onChange={(e) => this.setState({ postText: e.target.value })}
                            value={this.state.postText}></input>
                        <p className='post-picture'>Post Media</p>
                        <input
                            name='mediaFile'
                            type='file'
                            onChange={(e) => this.handleFileChange(e)}
                            value={this.state.mediaFile} ></input>
                        <br />
                        <button className='create-post-button' disabled={this.state.invalidMediaType}>Submit</button>
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}
