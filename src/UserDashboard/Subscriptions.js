import React, { Component } from 'react'
import { fetchSubscriptions } from '../fetches/post-fetches.js'
import { Link } from 'react-router-dom'
import LikeButton from '../LikeButton.js'



export default class Subscriptions extends Component {
    state = {
        loading: false,
        subscriptions: [],
    };

    componentDidMount = async () => {
        await this.setState({ loading: true });
        const subscriptions = await fetchSubscriptions();
        this.setState({
            loading: false,
            subscriptions: subscriptions
        })
    };

    render() {
        return (

            <div className='subscription-list'>
                {  this.state.loading
                    ? <img src={'/loading-spinner.gif'} className='loading-spinner' alt={''} />
                    :
                    this.state.subscriptions.map(subscription =>
                        subscription.id !== null ?
                                <div className='subscription-box' key={subscription.id}>
                                    <Link to={`/posts/${subscription.id}`}>
                                    <img
                                        className='subscription-image'
                                        src={subscription.mediaURL}
                                        alt={subscription.mediaURL}
                                    />
                                    <div className='sub-box-text'>
                                        <p className='sub-box-petname'>{subscription.petName}</p>
                                        <p>{subscription.postText}</p>
                                    </div>
                                    </Link>
                                    <LikeButton postId={subscription.id}/>
                                </div>
                    : null)
                }
            </div>
        )
    }
}
