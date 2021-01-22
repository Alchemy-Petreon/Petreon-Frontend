import React, { Component } from 'react';
import './style/AboutUs.css';

export default class AboutUs extends Component {
    render() {
        return (
            <div>
                <div className='about-us-bittersweet'> </div>
                <div className='about-us-naplesyellow'> </div>
                <div className='about-us-page'>
                <div className='sjaan'>
                    <p className='name'>Sjaan Hydrick</p>
                    <img src='/Sjaan.jpg' alt='Sjaan' className='pic' />
                    <p className='bio'>Sjaan Hydrick is a full stack software developer who shares her home with Vinewood, a small cat. She's happiest when Vinewood decides to snooze in her lap (even if it's always as the most inopportune times).</p>
                    <a href="https://www.linkedin.com/in/sjaan-hydrick/" class="icon-text"> i </a>
                    <a href="https://github.com/SjaanHydrick" class="icon-text">&lt;</a>
                </div>
                <div className='paul'>
                    <p className='name'>Paul Stevens</p>
                    <img src='/Paul.jpg' alt='Paul' className='pic' />
                    <p className='bio'>Paul Stevens is a full stack software developer, and the proud pet parent of three small dogs.  They are always trying to help with his work, mostly because they heard cookies were involved.</p>
                    <a href="https://www.linkedin.com/in/paul-stevens-dev/" class="icon-text"> i </a>
                    <a href="https://github.com/Protopaco" class="icon-text"> &lt; </a>
                </div>
                <div className='evan'>
                    <p className='name'>Evan Finkelstein</p>
                    <img src='/Evan.png' alt='Evan' className='pic' />
                    <p className='bio'> Evan Finkelstein is a full stack software developer with a cat named Francis. Francis is a demonic trash goblin but Evan would die for him without a second thought.</p>
                    <a href="https://www.linkedin.com/in/evan-finkelstein91/" class="icon-text"> i </a>
                    <a href="https://github.com/Evan-Finkelstein" class="icon-text"> &lt; </a>
                </div>
                </div>
            </div>
        )
    }
}
