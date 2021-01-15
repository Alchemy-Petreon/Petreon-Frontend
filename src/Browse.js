import React, { Component } from 'react'
import { fetchPets } from './fetches/pet-fetches.js'
import PetItem from './PetItem.js'

export default class Browse extends Component {
    state = {
        loading: false,
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
            <div className='pet-box'>
                {
                    this.state.allPets.map(pet =>
                        <div key={pet.id}>
                            <PetItem
                                pet={pet} />
                        </div>)
                }

            </div>
        )
    }
}
