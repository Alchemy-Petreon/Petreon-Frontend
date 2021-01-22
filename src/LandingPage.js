import React, { Component } from 'react'
import './style/LandingPage.css';

export default class LandingPage extends Component {
    render() {
        return (
            <div className="lp">

                <div className="banner">
                    <img src="/minimalcolorizing.jpg" alt="kitties" className="landing-banner" />
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
                    <p className="lp1">Unleash your best friend on the world by sharing images or blogs! Build a community with fans by liking posts and leaving comments!</p>
                    <img src="/ben1.jpg" alt="ben" className="ben" />

                    <div className="divider1">
                        <div className="midnightgreendiv1"> </div>
                        <div className="bittersweetdiv1"> </div>
                        <div className="naplesyellowdiv1"> </div>
                    </div>

                    <h2 className="follow">Follow your favorites!</h2>
                    <p className="lp2">Only want to see cats, dogs, ferrets, or frogs? You have the freedom to curate your dashboard and only see the content from the animals you love the most!</p>
                    <img src="/Vinewood.png" alt="vinewood" className="vinewood" />

                    <div className="divider2">
                        <div className="midnightgreendiv2"> </div>
                        <div className="bittersweetdiv2"> </div>
                        <div className="naplesyellowdiv2"> </div>
                    </div>

                    <h2 className="monetize">Monetize your monster!</h2>
                    <p className="lp3">Does your pup need a new collar? Could your cat benefit from a new toy? Accept tips from people who want the best for your beast or buy a treat for your lovable new friend!</p>
                    <img src="/Wallace2.jpg" alt="wallace" className="wallace" />

                    <div className="divider3">
                        <div className="midnightgreendiv3"> </div>
                        <div className="bittersweetdiv3"> </div>
                        <div className="naplesyellowdiv3"> </div>
                    </div>

                </div>
            </div>
        )
    }
}
