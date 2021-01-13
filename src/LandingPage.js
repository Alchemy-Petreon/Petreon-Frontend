import React, { Component } from 'react'

export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <div className="banner">
                    <img src="/five-little-grey-kittens.jpg" alt="kitties" className="landing-banner"/>
                    <h1 className="monetize">Monetize Your Monster</h1>
                </div>
                <div className="intro">
                    <p>Petreon is an application where pet owners can showcase their pets by posting images, videos, and/or blogs while soliciting donations from followers. Users can choose pets to follow and curate their dash as well as like and comment on posts they they enjoy.</p>
                </div>
            </div>
        )
    }
}
