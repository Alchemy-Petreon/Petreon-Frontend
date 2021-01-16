import React, { Component } from 'react'
import { fetchPosts } from './fetches/post-fetches.js'
import PostItem from './PostItem.js'


export default class Posts extends Component {
    state = {
        loading: true,
        allPosts: [],
    }
    componentDidMount = async () => {
        await this.setState({ loading: true });
        const allPosts = await fetchPosts();
        this.setState({
            loading: false,
            allPosts: allPosts
        })
    };

    render() {
        return (

            <div className='post-box'>
                {  this.state.loading
                    ? <img src={'/loading-spinner.gif'} alt={''} />
                    :
                    this.state.allPosts.map(post =>
                        <div key={post.id}>
                            <PostItem
                                post={post} />
                        </div>)
                }

            </div>
        )
    }
}
