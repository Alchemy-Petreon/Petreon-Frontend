import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { fetchPost } from './fetches/post-fetches.js'
import { MainContext } from './MainContext.js'
import LikeButton from './LikeBUtton.js'


export default class PostItem extends Component {
    static contextType = MainContext;

    state = {
        loading: false,

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
                <LikeButton
                    postId={this.props.post.id}
                />
            </div >
        )
    }
}
