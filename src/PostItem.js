import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        isNull: false,
        post: []
    }

    componentDidMount = async () => {
        const post = await fetchPost(this.props.post.id)

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
        }
    }

    render() {
        return (
            <div>
                <Link className='post-link' to={`/posts/${this.props.post.id}`}>
                    <div className='post-item'>
                        <img className='post-picture' alt={this.props.post.mediaUrl} src={this.props.post.mediaUrl} />
                        <p className='post-text'>{this.props.post.postText}</p>
                    </div>
                </Link>

                <div>
                <LikeButton
                    postId={this.props.post.id}
                    post={this.state.post}
                    />
                    {this.state.isNull !== null ?
                        <span className='post-comments'> Comments : {this.state.comments.length}</span>
                        : <span className='post-comments'>Comments: 0</span>}
                </div>
            </div >
        )
    }
}
