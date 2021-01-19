import React, { Component } from 'react'
import { fetchPosts } from './fetches/post-fetches.js'
import { deletePost } from './fetches/post-fetches.js'
import PostItem from './PostItem.js'
import { MainContext } from './MainContext.js'



export default class Posts extends Component {
    static contextType = MainContext;

    state = {
        loading: true,
        allPosts: [],
    }
    componentDidMount = async () => {
        console.log('this is posts.js', this.props.userId)
        await this.setState({ loading: true });
        const allPosts = await fetchPosts();
        this.setState({
            loading: false,
            allPosts: allPosts
        })
    };

    handleDelete = async (id, postId) => {
        // console.log(id, postId, this.context.profile.id, this.props.userId)
        // if (this.context.profile.id === String(postId)) {
        await deletePost(id)
        const allPosts = await fetchPosts();
        this.setState({
            allPosts: allPosts
        })
        // } else {
        //     alert('You can not delete someone elses post')
        // }
    }

    render() {
        return (

            <div className='post-box'>
                {  this.state.loading
                    ? <img src={'/loading-spinner.gif'} alt={''} />
                    :
                    this.state.allPosts.map(post =>
                        <div key={post.id}>
                            <PostItem
                                post={post}
                                userId={this.props.userId} />
                            <button onClick={() => this.handleDelete(post.id, post.userId)}>delete</button>
                        </div>)
                }

            </div>
        )
    }
}
