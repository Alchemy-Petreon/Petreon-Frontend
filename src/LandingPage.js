import React, { Component } from 'react'
import './style/LandingPage.css';

export default class LandingPage extends Component {
    render() {
        return (
            <div className="lp">
                <div className="banner">
                    <img src="/minimalcolorizing.jpg" alt="kitties" className="landing-banner"/>
                </div>
                <div className="colors">
                    <div className="midnightgreen">
                    <h1 className="flaunt">Flaunt Your Furbaby</h1>
                    </div>
                    <div className="bittersweet"> </div>
                    <div className="naplesyellow"> </div>
                </div>
                <div className="intro">
                    <h2 className="showcase">Promote your pet!</h2>
                    <p className="lp1">Share your best friend with the world by posting images, videos, or blogs! Like and comment on posts to build a community with fans!</p>
                    <img src="/ben1.jpg" alt="ben" className="ben" />

                    <div className="divider1">
                        <div className="midnightgreendiv1"> </div>
                        <div className="bittersweetdiv1"> </div>
                        <div className="naplesyellowdiv1"> </div>
                    </div>

                    <h2 className="follow">Follow your favorites!</h2>
                    <p className="lp2">Curate your dashboard to only include content from the pets you want to see the most!</p>
                    <img src="/Vinewood.png" alt="vinewood" className="vinewood" />

                    <div className="divider2">
                        <div className="midnightgreendiv2"> </div>
                        <div className="bittersweetdiv2"> </div>
                        <div className="naplesyellowdiv2"> </div>
                    </div>

                    <h2 className="monetize">Monetize your monster!</h2>
                    <p className="lp3">Accept tips from people who want the best for your beast!</p>
                    <img src="/Wallace2.jpg" alt="wallace" className="wallace" />
                </div>
                <div className="footer">
                    <div className="midnightgreenfoot"> </div>
                    <div className="bittersweetfoot"> </div>
                    <div className="naplesyellowfoot"> </div>
                </div>
            </div>
        )
    }
}
