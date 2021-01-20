import React, { Component } from 'react'
import { fetchPost } from './fetches/post-fetches.js'
import { deleteComment } from './fetches/comment-fetches.js'
import CreateComment from './CreateComment.js'
import { MainContext } from './MainContext.js'
import './style/PostDetails.css'
import { Link } from 'react-router-dom';

export default class PostDetails extends Component {
    static contextType = MainContext;

    state = {
        loading: true,
        post: [],
    }
    componentDidMount = async () => {
        console.log(this.state.post.mediaUrl)
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
                    <div className='post-detail-page'>
                        <div className='post-detail-naplesyellow'> </div>
                        <div className='post-detail'>

                            <img className='post-detail-picture' alt={this.state.post.mediaUrl} src={this.state.post.mediaUrl} />

                            <p className='post-detail-text'>{this.state.post.postText}</p>

                        </div>

                        <Link to={`/pets/${this.state.post.petId}`}><button className='back-button'>Back to Pet Profile</button></Link>

                        {this.context.profile.id === this.state.post.userId ?
                            <Link to={`/update-post/${this.state.post.id}`}> <button className='edit-button'>Edit Post</button></Link>
                            : <div></div>}
                        <div className='comments-box'>

                            <CreateComment
                                postId={this.props.match.params.id}
                                userId={this.context.profile.id}
                                changeLoading={this.changeLoading} />
                            {
                                this.state.post.comments[0].userId !== null ?
                                    this.state.post.comments.map(comment =>
                                        <div className='comment-box'>


                                            <div key={comment.id}>

                                                <div className='comment-text'>
                                                    <Link to={`/user/${comment.userId}`}>
                                                        <div className='comment-user-card'>
                                                            <img className='comment-profile-pic' src={comment.userProfileURL} alt='profile pic' />
                                                            <p className='comment-username'>
                                                                {comment.userName}</p>
                                                        </div>
                                                    </Link>
                                                    <p className='comment'>{comment.text}</p>
                                                    <div className='comment-date'>{comment.timestamp}</div>

                                                    {this.context.profile.id === String(comment.userId) ?
                                                        <button className='comment-delete' onClick={() => this.handleDelete(comment.commentId, comment.userId)}>delete</button>
                                                        : <div></div>}
                                                </div>
                                            </div>
                                        </div>
                                    ) : <div></div>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}
