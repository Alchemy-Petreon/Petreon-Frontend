import React, { Component } from 'react'
import { fetchPet } from './fetches/pet-fetches.js'
import { deletePost } from './fetches/post-fetches.js'
import PostItem from './PostItem.js'
import { MainContext } from './MainContext.js'
import './style/PetDetails.css';



export default class Posts extends Component {
    static contextType = MainContext;

    state = {
        loading: true,
        allPosts: [],
    }
    componentDidMount = async () => {
        // await this.setState({ loading: true });
        await this.setState({
            loading: false,
            allPosts: this.props.posts
        })
    };

    handleDelete = async (id, postId) => {
        if (this.context.profile.id === String(postId)) {
            await deletePost(id)

            const newPet = await fetchPet(this.state.allPosts[0].petId);
            this.setState({
                allPosts: newPet.posts
            })
        } else {
            alert(`You can not delete someone else's post`)
        }
    }

    render() {
        return (

            <div className='post-box'>
                {  this.state.loading
                    ? <img src={'/loading-spinner.gif'} className='loading-spinner' alt={''} />
                    :


                    this.state.allPosts.map(post =>
                        this.state.allPosts[0].id !== null ?
                            <div className='post-item-box' key={post.id}>
                                <PostItem
                                    post={post} />

                                {this.context.profile.id === String(post.userId) ?
                                    <p><button className='delete-button' onClick={() => this.handleDelete(post.id, post.userId)}>delete</button></p>
                                    : null}

                                <div className='post-colors'>
                                    <div className='post-div-midnightgreen'> </div>
                                    <div className='post-div-bittersweet'> </div>
                                    <div className='post-div-naplesyellow'> </div>
                                </div>
                            </div> :
                            null)
                }

            </div>
        )
    }
}
