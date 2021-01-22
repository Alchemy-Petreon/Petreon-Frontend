import React, { Component } from 'react'
import { fetchSubscriptions } from '../fetches/post-fetches.js'
import { Link } from 'react-router-dom'



export default class Browse extends Component {
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
        console.log('subscriptions:', subscriptions)
    };

    render() {
        return (

            <div className='subscription-list'>
                {  this.state.loading
                    ? <img src={'/loading-spinner.gif'} className='loading-spinner' alt={''} />
                    :
                    // this.state.subscriptions[0] ?
                    this.state.subscriptions.map(subscription =>
                        subscription.id !== null ?
                            <Link to={`/posts/${subscription.id}`}>
                                <div className='subscription-box' key={subscription.id}>
                                    <img
                                        className='subscription-image'
                                        src={subscription.mediaURL}
                                        alt={subscription.mediaURL}
                                    />
                                    <div className='sub-box-text'>
                                        <p className='sub-box-petname'>{subscription.petName}</p>
                                        <p>{subscription.postText}</p>
                                        <p>Comments:{subscription.commentCount}</p>
                                    </div>
                                </div>
                            </Link>
                            : null)
                    // : null
                }

            </div>
        )
    }
}
