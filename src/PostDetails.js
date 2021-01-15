import React, { Component } from 'react'
import { fetchPost } from './fetches/post-fetches.js'

export default class PostDetails extends Component {
    state = {
        loading: false,
        post: [],
    }
    componentDidMount = async () => {
        await this.setState({ loading: true });
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
                        </div>
                    </div>
                }
            </div>
        )
    }
}
