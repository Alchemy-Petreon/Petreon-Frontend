import React, { Component } from 'react'
import './style/BrowsePets.css'
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

            <div >
                {  this.state.loading
                    ? <img src={'/loading-spinner.gif'} alt={''} />
                    :
                    this.state.allPets.map(pet =>
                        <Link to={`/pets/${pet.id}`} >  <div className='pet-box' key={pet.id}>
                            <PetItem
                                pet={pet} />
                        </div></Link>)
                }

            </div>
        )
    }
}
