import React, { Component } from 'react'
import { fetchPet } from './fetches/pet-fetches.js'
import { deletePost, fetchSubscriptions } from './fetches/post-fetches.js'
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
        console.log('this is posts.js', this.props.userId)
        await this.setState({ loading: true });
        this.setState({
            loading: false,
            allPosts: this.props.posts
        })
        console.log(this.props.posts)
    };

    handleDelete = async (id, postId) => {
        // console.log(id, postId, this.context.profile.id, this.props.userId)
        if (this.context.profile.id === String(postId)) {
            await deletePost(id)

            const newPet = await fetchPet(this.state.allPosts[0].petId);
            this.setState({
                allPosts: newPet.posts
            })
            // const allPosts = await fetchPosts();
            // this.setState({
            //     allPosts: allPosts
            // })
        } else {
            alert('You can not delete someone elses post')
        }
    }

    handleSubscriptions = async () => {
        const subscriptions = await fetchSubscriptions();
        console.log('1010101010101010101010101010101010')
        console.log('subscriptions')
        console.log(subscriptions)
        console.log('1010101010101010101010101010101010')

    }

    render() {
        return (

            <div className='post-box'>
                <button onClick={() => this.handleSubscriptions()}>SUBS</button>
                {  this.state.loading
                    ? <img src={'/loading-spinner.gif'} alt={''} />
                    :
                    this.state.allPosts ?
                        this.state.allPosts.map(post =>
                            <div className='post-item-box' key={post.id}>
                                <PostItem
                                    post={post} />
                                <p><button className='delete-button' onClick={() => this.handleDelete(post.id, post.userId)}>delete</button></p>
                            </div>)
                        :
                        <></>

                }

            </div>
        )
    }
}
