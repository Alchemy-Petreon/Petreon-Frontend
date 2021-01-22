import React, { Component } from 'react'
import './style/Browse.css'
import { fetchPets } from './fetches/pet-fetches.js'
import PetItem from './PetItem.js'
import { Link } from 'react-router-dom';


export default class Browse extends Component {
    state = {
        loading: true,
        allPets: [],
    }
    componentDidMount = async () => {
        await this.setState({ loading: true });
        const allPets = await fetchPets();
        this.setState({
            loading: false,
            allPets: allPets
        })
    };

    render() {
        return (
            <div>
                <div className='browsebittersweet'> </div>
                <div className='browsenaplesyellow'> </div>
                <div className='pet-box'>
                    {this.state.loading
                        ? <img src={'/loading-spinner.gif'} className='loading-spinner' alt={''} />
                        :
                        this.state.allPets.map(pet =>
                            <Link to={`/pets/${pet.id}`} >  <div className='pet-box' key={pet.id}>
                                <PetItem
                                    pet={pet} />
                            </div></Link>)
                    }

                </div>
            </div>
        )
    }
}
