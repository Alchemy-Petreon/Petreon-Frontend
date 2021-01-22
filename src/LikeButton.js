import React, { Component } from 'react'
import { addLike, deleteLike } from './fetches/post-fetches.js'


export default class LikeButton extends Component {
    state = {
        postLiked: false,
        likeId: ''
    }

    componentDidMount = async () => {
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

    handleLike = async (postId) => {
        const user = await addLike(postId)

        await this.context.setProfile({ profile: user })

        const isLiked = this.context.profile.likes.find(like => this.props.post.id === like.postId)

        if (isLiked) {
            await this.setState({
                postLiked: true,
                likeId: isLiked.id
            })
        }

    }

    handleUnlike = async () => {

        const user = await deleteLike(this.state.likeId)

        await this.context.setProfile({ profile: user })

        await this.setState({
            postLiked: false
        })
    }

    render() {
        return (
            <div>
                {this.state.postLiked ?
                    <button onClick={() => this.handleUnlike()} > Unlike</button>
                    :
                    <button onClick={() => this.handleLike(this.props.postId)}>Like</button>
                }

            </div>
        )
    }
}
