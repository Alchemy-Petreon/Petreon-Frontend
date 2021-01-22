import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NIL } from 'uuid';
import { addLike, deleteLike } from './fetches/post-fetches.js'
import { fetchPost } from './fetches/post-fetches.js'

import { MainContext } from './MainContext.js'
import LikeButton from './LikeButton.js'


export default class PostItem extends Component {
    static contextType = MainContext;

    state = {
        loading: false,

        comments: [],
        postLiked: false,
        likeId: '',
        isNull: false
    }
    componentDidMount = async () => {
        const post = await fetchPost(this.props.post.id)
        // console.log(post.comments.length)
        this.setState({
            comments: post.comments,
            post: post,
            isNull: post.comments[0].postId

        })
        if (this.context.profile.likes.length) {
            const isLiked = this.context.profile.likes.find(like => this.props.post.id === like.postId)

            if (isLiked) {
                await this.setState({
                    postLiked: true,
                    likeId: isLiked.id
                })
            }
        } console.log('comments', this.state.isNull)

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
        console.log(this.props.post.id)
        return (
            <div>
                <Link className='post-link' to={`/posts/${this.props.post.id}`}>
                    <div className='post-item'>

                        <p className='post-text'>{this.props.post.postText}</p>
                        <img className='post-picture' alt={this.props.post.mediaUrl} src={this.props.post.mediaUrl} />

                        <p className='post-text'>{this.props.post.postText}</p>
                        {this.state.isNull !== null ?
                            < p > Comments : {this.state.comments.length}</p>
                            : <p>Comments: 0</p>}


                    </div>
                </Link>
                <LikeButton
                    postId={this.props.post.id}
                />
            </div >
        )
    }
}
