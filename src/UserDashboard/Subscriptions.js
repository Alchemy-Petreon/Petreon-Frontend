import React, { Component } from 'react'
import { fetchSubscriptions } from '../fetches/post-fetches.js'



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

            <div className='pet-box'>
                {  this.state.loading
                    ? <img src={'/loading-spinner.gif'} alt={''} />
                    :
                    this.state.subscriptions.map(subscription =>
                        <div key={subscription.id}>
                            {subscription.postText}
                            <img src={subscription.mediaUrl} alt={subscription.mediaUrl} />]

                        </div>)
                }

            </div>
        )
    }
}
