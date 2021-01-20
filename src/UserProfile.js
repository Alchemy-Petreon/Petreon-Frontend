import React, { Component } from 'react';
// import { MainContext } from './MainContext.js';
import { fetchUser } from "./fetches/user-fetches.js"
import { fetchUserPets } from './fetches/pet-fetches.js';
import { Link } from 'react-router-dom';

var QRCode = require('qrcode.react');

// React.render(
//     <QRCode value="http://facebook.github.io/react/" />,

// );


export default class UserProfile extends Component {
    // static contextType = MainContext;
    state = {
        user: {},
        petArray: {}

    }
    componentDidMount = async () => {

        await this.setState({ loading: true });
        const user = await fetchUser(this.props.match.params.id);
        const petArray = await fetchUserPets(this.props.match.params.id)
        this.setState({
            loading: false,
            user: user,
            petArray: petArray
        })
        console.log(this.state.user, this.state.petArray)
    };

    render() {
        return (
            <section>
                <QRCode value={`venmo://users/`} />,

                <div>
                    <p>{this.state.user.firstName}</p>
                    <p>{this.state.user.userName}</p>
                    <img src={this.state.user.profilePicture} alt='profile' />
                    <p>{this.state.user.profileDescription}</p>
                </div>

                <div>
                    <p>Pets</p>
                    {this.state.petArray.length > 0 ?
                        this.state.petArray.map(pet =>
                            <div> <p>{pet.petName}</p>
                                <Link to={`/pets/${pet.id}`}><img src={pet.petProfilePicture} alt='pet' /></Link></div>)
                        : null}
                </div>
            </section>
        )
    }
}
