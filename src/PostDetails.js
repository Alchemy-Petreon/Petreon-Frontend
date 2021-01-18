import React, { Component } from 'react'
import { fetchPost } from './fetches/post-fetches.js'
import CreateComment from './CreateComment.js'
import { MainContext } from './MainContext.js'

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
                                    <div key={comment.id}>
                                        {comment.text}
                                    </div>)
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
