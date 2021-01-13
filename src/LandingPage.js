import React, { Component } from 'react'

export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <div className="banner">
                    <img src="/five-little-grey-kittens.jpg" alt="kitties" className="landing-banner"/>
                    <h1 className="flaunt">Flaunt Your Furbaby</h1>
                </div>
                <div className="colors">
                    <div className="midnightgreen"> </div>
                    <div className="bittersweet"> </div>
                    <div className="naplesyellow"> </div>
                </div>
                <div className="intro">
                    <h2>Showcase your pet!</h2> 
                    <p>by posting images, videos, and/or blogs while soliciting donations from followers. Users can choose pets to follow and curate their dash as well as like and comment on posts they they enjoy.</p>
                </div>
            </div>
        )
    }
}
