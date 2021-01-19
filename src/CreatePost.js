import React, { Component } from 'react'
import { createPost, updatePostPicture } from "./fetches/post-fetches.js"
import { MainContext } from './MainContext.js'
import mime from 'mime-types';
import ReactPlayer from 'react-player'

export default class CreatePet extends Component {
    static contextType = MainContext;

    state = {
        postText: '',
        mediaType: '',
        invalidMediaType: false,
        mediaFile: '',
        mediaURL: '',
        mediaTypeName: '',
        videoType: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        let newMedia = new FormData(e.target)

        const newPost = {
            petId: this.props.petId,
            userId: this.props.userId,
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

        console.log(this.state.mediaURL)
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
                            type='file'
                            accept="video/*, image/*"
                            onChange={(e) => this.handleFileChange(e)}
                            value={this.state.mediaFile} />

                        <br />

                        <p className='post-text'>Caption</p>

                        <input 
                            name='postText' 
                            onChange={(e) => this.setState({ postText: e.target.value })}
                            value={this.state.postText} />
                        
                        <br />

                        <button className='create-post-button' disabled={this.state.invalidMediaType}>Submit</button>
                        <br />
                    </form>

                    <div className='cpdividermidnight'> </div>
                    <div className='cpdividerbittersweet'> </div>
                    <div className='cpdividernaplesyellow'> </div>

                    <h2 className='post-preview-header'>Post Preview</h2>
                    
                    {this.state.mediaTypeName === 'image'
                    ? <img
                        className='post-preview-image'
                        alt='post preview'
                        src={this.state.mediaURL} />
                     : null}

                    {this.state.mediaTypeName === 'video'
                    ? 
                    <div>
                    <video src={this.state.mediaURL} width='100%' height='100%' controls type='video/quicktime'/>
                    </div>
                        : null}
                </div>
            </div>
        )
    }
}
