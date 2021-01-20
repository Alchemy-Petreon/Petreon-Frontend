import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { fetchPost } from './fetches/post-fetches.js'


export default class PostItem extends Component {
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
            </div >
        )
    }
}
