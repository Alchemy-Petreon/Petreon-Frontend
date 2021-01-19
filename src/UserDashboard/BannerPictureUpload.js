import React, { Component } from 'react'

export default class BannerPictureUpload extends Component {
    state = {
        bannerPic: ''
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.props.onBannerUpload(this.state.bannerPic)
    }

    render() {
        return (
            <div>
                <div className='bannerpicchange'>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="file"
                            name="bannerPicture"
                            onChange={(e) => this.setState({bannerPic: e.target.value})}
                            value={this.props.bannerPic}/>
                        <button className='bannerpicsubbutton'>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
