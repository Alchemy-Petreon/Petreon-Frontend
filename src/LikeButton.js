import React, { Component } from 'react'
import { addLike, deleteLike } from './fetches/post-fetches.js'
import { MainContext } from './MainContext.js'


export default class LikeButton extends Component {
    static contextType = MainContext;

    state = {
        postLiked: false,
        likeId: ''
    }

    componentDidMount = async () => {
        if (this.context.profile.likes.length) {
            const isLiked = this.context.profile.likes.find(like => this.props.postId === like.postId)

            if (isLiked) {
                await this.setState({
                    postLiked: true,
                    likeId: isLiked.id
                })
            }
        }
    }

    componentWillUnmount = () => {
        console.log('UNMOUNTING!')
    }

    handleLike = async (postId) => {
        console.log('===========================')
        console.log('this.state')
        console.log(this.state)
        console.log('===========================')

        const user = await addLike(postId)

        await this.context.setProfile({ profile: user })

        const isLiked = this.context.profile.likes.find(like => this.props.postId === like.postId)

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
                    <button className='liked-button' onClick={() => this.handleUnlike()}><img src='/liked.png' className='liked' alt='' /></button>
                    :
                    <button className='unliked-button' onClick={() => this.handleLike(this.props.postId)}><img src='/not-liked.png' className='unliked' alt='' /></button>
                }
            </div>
        )
    }
}
