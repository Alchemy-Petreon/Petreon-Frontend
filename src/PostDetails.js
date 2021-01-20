import React, { Component } from 'react'
import { fetchPost } from './fetches/post-fetches.js'
import { deleteComment } from './fetches/comment-fetches.js'
import CreateComment from './CreateComment.js'
import { MainContext } from './MainContext.js'
import './style/Comment.css'
import { Link } from 'react-router-dom';

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
    handleDelete = async (id, commentId) => {
        console.log(id, commentId, this.context.profile.id, this.props.userId)
        if (this.context.profile.id === String(commentId)) {
            await deleteComment(id)
            const post = await fetchPost(this.props.match.params.id);
            this.setState({
                post: post
            })
        } else {
            alert('You can not delete someone elses comment')
        }
    }
    render() {
        return (
            <div>
                {this.state.loading
                    ? <img src={'/loading-spinner.gif'} alt={''} />
                    :
                    <div>
                        <div className='post-item'>

                            <img className='post-picture' alt={this.state.post.mediaUrl} src={this.state.post.mediaUrl} />
                            <p className='post-text'>{this.state.post.postText}</p>

                            {this.context.profile.id === this.state.post.userId ?
                                <Link to={`/update-post/${this.state.post.id}`}> <button>Edit Post</button></Link>
                                : <div></div>}
                            <p>Comments </p>
                            {
                                this.state.post.comments.map(comment =>
                                    <div className='comment-box'>
                                        <div key={comment.id}>
                                            Comment By:<p><Link to={`/user/${comment.userId}`}>
                                                <p className='comment-by-box'>  <div className='user-card'><img className='comment-profile-pic' src={this.context.profile.profilePicture} alt='profile pic' />{this.context.profile.userName}</div></p></Link>
                                            </p>
                                            <p>{comment.text}</p>
                                            <div>Made On: {comment.timestamp}</div>

                                        </div>
                                        {this.context.profile.id === String(comment.userId) ?
                                            <button onClick={() => this.handleDelete(comment.id, comment.userId)}>delete</button>
                                            : <div></div>}
                                    </div>
                                )
                            }

                            <CreateComment
                                postId={this.props.match.params.id}
                                userId={this.context.profile.id}
                                changeLoading={this.changeLoading} />
                        </div>
                    </div>
                }
            </div>
        )
    }
}
