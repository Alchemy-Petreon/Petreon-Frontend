import React, { Component } from 'react'
import { fetchPost } from './fetches/post-fetches.js'
import { deleteComment } from './fetches/comment-fetches.js'
import CreateComment from './CreateComment.js'
import { MainContext } from './MainContext.js'
import './style/Comment.css'

export default class PostDetails extends Component {
    static contextType = MainContext;

    state = {
        loading: true,
        post: [],
    }
    componentDidMount = async () => {
        await this.setState({ loading: true });
        const post = await fetchPost(this.props.match.params.id);
        this.setState({
            loading: false,
            post: post
        })

    }
    changeLoading = async (loading) => {
        await this.setState({
            loading: loading
        })
        const post = await fetchPost(this.props.match.params.id);
        this.setState({
            loading: false,
            post: post
        })

    };
    handleDelete = async (id) => {
        await deleteComment(id)
        const post = await fetchPost(this.props.match.params.id);
        this.setState({
            post: post
        })
    }
    render() {
        return (
            <div>
                {this.state.loading
                    ? <img src={'/loading-spinner.gif'} alt={''} />
                    :
                    <div>
                        <div className='post-item'>

                            <img className='post-picture' alt={this.state.post.pictureUrl} src={this.state.post.pictureUrl} />
                            <p className='post-text'>{this.state.post.postText}</p>
                            <p>Comments </p>
                            {
                                this.state.post.comments.map(comment =>
                                    <div className='comment-box'>
                                        <div key={comment.id}>
                                            <p><img className='comment-profile-pic' src={this.context.profile.profilePicture} alt='profile pic' />{this.context.profile.userName}</p>

                                            <p>{comment.text}</p>
                                            <div>{comment.timestamp}</div>

                                        </div>

                                        <button onClick={() => this.handleDelete(comment.id)}>delete</button>
                                    </div>
                                )
                            }

                            <CreateComment
                                postId={this.props.match.params.id} userId={this.context.profile.id}
                                changeLoading={this.changeLoading} />
                        </div>
                    </div>
                }
            </div>
        )
    }
}
