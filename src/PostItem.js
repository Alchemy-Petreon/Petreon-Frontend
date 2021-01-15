import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class PostItem extends Component {
    render() {
        return (
            <div>
                <Link className='post-link' to={`/posts/${this.props.post.id}`}>
                    <div className='post-item'>
                        <div>
                            <img className='post-picture' alt={this.props.post.pictureUrl} src={this.props.post.postUrl} />
                            <p className='post-text'>{this.props.post.postText}</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}
