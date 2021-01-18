import React, { Component } from 'react'

export default class BannerPictureUpload extends Component {
    state = {
        bannerPicture: 'https://placekitten.com/1300/350'
    }
    
    render() {
        return (
            <div>
                <div className="banner">
                    <img src={this.state.bannerPicture} alt="" className="petcreatebanner"/>
                </div>
            </div>
        )
    }
}
