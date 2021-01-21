import React, { Component } from 'react'
import { fetchSubscriptions } from '../fetches/post-fetches.js'
import { Link } from 'react-router-dom'



export default class Browse extends Component {
    state = {
        loading: false,
        subscriptions: [],
    }
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
                    ? <img src={'/loading-spinner.gif'} alt={''} />
                    :
                    this.state.subscriptions ?
                        this.state.subscriptions.map(subscription =>
                            <Link to={`/posts/${subscription.id}`}> <div className='subscription-box' key={subscription.id}>
                                <p>Posted By: {subscription.petName}</p>
                                <p>{subscription.postText}</p>
                                <img className='subscription-image' src={subscription.mediaURL} alt={subscription.mediaURL} />


                            </div></Link>)
                        : <div></div>
                }

            </div>
        )
    }
}
