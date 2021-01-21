import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { addLike, deleteLike } from './fetches/post-fetches.js'
// import { fetchPost } from './fetches/post-fetches.js'
import { MainContext } from './MainContext.js'


export default class PostItem extends Component {
    static contextType = MainContext;

    // state = {
    //     loading: false,
    //     post: [],
    // }
    // componentDidMount = async () => {
    //     await this.setState({ loading: true });
    //     const post = await fetchPost(this.props.post.id);
    //     this.setState({
    //         loading: false,
    //         post: post
    //     })
    //     console.log(this.state.post)
    // }
    state = {
        postLiked: false,
        likeId: ''
    }

    componentDidMount = () => {
        console.log(')_)_)_)_)_)_)_)_)_)_)_)_)_)')
        console.log('this.context.profile')
        console.log(this.context.profile)
        console.log(')_)_)_)_)_)_)_)_)_)_)_)_)_)')

        if (this.context.profile.likes[0]) {
            const isLiked = this.context.profile.likes.find(like => this.props.post.id === like.postId)
            if (isLiked) {
                this.setState({
                    postLiked: true,
                    likeId: isLiked.id
                })
            }
        }
    }


    handleLike = async (postId) => {
        const user = await addLike(postId)

        this.context.setProfile({ profile: user })

        this.setState({
            postLiked: true
        })
    }

    handleUnlike = async () => {
        const user = await deleteLike(this.state.likeId)

        this.context.setProfile({ profile: user })

        this.setState({
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
                    <button onClick={() => this.handleUnlike()} > Unlike</button>
                    :
                    <button onClick={() => this.handleLike(this.props.post.id)}>Like</button>
                }
            </div >
        )
    }
}
