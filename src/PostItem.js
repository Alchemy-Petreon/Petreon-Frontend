import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addLike, deleteLike } from './fetches/post-fetches.js'
import { MainContext } from './MainContext.js'


export default class PostItem extends Component {
    static contextType = MainContext;

    state = {
        loading: false,

        postLiked: false,
        likeId: ''
    }
    componentDidMount = async () => {

        console.log(this.state.post)
        if (this.context.profile.likes.length) {
            const isLiked = this.context.profile.likes.find(like => this.props.post.id === like.postId)

            if (isLiked) {
                await this.setState({
                    postLiked: true,
                    likeId: isLiked.id
                })
            }
        }
    }


    handleLike = async (postId) => {
        const user = await addLike(postId)

        await this.context.setProfile({ profile: user })

        const isLiked = this.context.profile.likes.find(like => this.props.post.id === like.postId)

        if (isLiked) {
            await this.setState({
                postLiked: true,
                likeId: isLiked.id
            })
        }

    }

    handleUnlike = async () => {

        const user = await deleteLike(this.state.likeId)

        await this.context.setProfile({ profile: user })

        await this.setState({
            postLiked: false
        })
    }
    render() {
        return (
            <div>
                <Link className='post-link' to={`/posts/${this.props.post.id}`}>
                    <div className='post-item'>
                        {/* {this.state.post.comments.length === null ?
                                < p > Comments : {this.state.post.comments.length}</p>
                                : <p>Comments: 0 </p>}
                            <p className='post-text'>{this.props.post.postText}</p> */}
                        <img className='post-picture' alt={this.props.post.mediaUrl} src={this.props.post.mediaUrl} />

                        <p className='post-text'>{this.props.post.postText}</p>

                    </div>
                </Link>


                {this.state.postLiked ?
                    <button className='liked-button' onClick={() => this.handleUnlike()}><img src='/liked.png' className='liked' alt='' /></button>
                    :
                    <button className='unliked-button' onClick={() => this.handleLike(this.props.post.id)}><img src='/not-liked.png' className='unliked' alt='' /></button>
                }
            </div >
        )
    }
}
