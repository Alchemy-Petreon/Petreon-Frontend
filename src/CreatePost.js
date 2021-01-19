import React, { Component } from 'react'
import { createPost, updatePostPicture } from "./fetches/post-fetches.js"
import { MainContext } from './MainContext.js'
import mime from 'mime-types';



export default class CreatePet extends Component {
    static contextType = MainContext;

    state = {
        postText: '',
        mediaType: '',
        invalidMediaType: false,
        mediaFile: '',
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        let newMedia = new FormData(e.target)

        const newPost = {
            petId: 1,
            userId: this.props.userId,
            mediaType: this.state.mediaType,
            postText: this.state.postText
        }

        let newPostResponse = await createPost(newPost);

        await updatePostPicture(newMedia, newPostResponse.id)

        this.props.history.push('/');

    }

    handleFileChange = (e) => {
        const mediaType = mime.lookup(e.target.value)
        // this.props.history.push(`/pets/${this.props.petId}`);
        // this.props.history.push('/');
        this.props.history.push(`/pets/${this.props.petId}`);

        if (mediaType.split('/')[0] === 'image' || mediaType.split('/')[0] === 'video') {
            this.setState({
                mediaFile: e.target.value,
                mediaType
            })
        } else {
            window.alert('INVALID MEDIA TYPE');
            this.setState({ mediaFile: '' })
        }
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
