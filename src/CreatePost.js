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
        mediaURL: ''
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

    handleFileChange = (e) => {
        const mediaType = mime.lookup(e.target.value)

        if (mediaType.split('/')[0] === 'image' || mediaType.split('/')[0] === 'video') {
            this.setState({
                mediaFile: e.target.value,
                mediaURL: URL.createObjectURL(e.target.files[0]),
                mediaType
            })
            console.log(this.state.mediaType)
        } else {
            window.alert('INVALID MEDIA TYPE');
            this.setState({ mediaFile: '' })
        }

        // this.props.history.push(`/pets/${this.props.petId}`);

    }


    render() {
        return (
            <div className='create-post-page'>

                <div className='create-post-box'>

                    <h2 className='create-post-header'> Add New Post</h2>

                    <form onSubmit={this.handleSubmit}>

                    <p className='post-picture'>Post Media</p>

                        <input
                            name='mediaFile'
                            type='file'
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
                    <img src={this.state.mediaURL} alt='preview' />
                </div>
            </div>
        )
    }
}
