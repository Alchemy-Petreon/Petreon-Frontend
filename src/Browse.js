import React, { Component } from 'react'
import './style/Browse.css'
import { fetchPets, searchResults } from './fetches/pet-fetches.js'
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

    handleSearch = async (e) => {
        e.preventDefault();
        await this.setState({
            loading: true
        })

        console.log(this.state.searchField)
        const newPetArray = await searchResults(this.state.searchField)
        console.log(newPetArray)
        await this.setState({
            loading: false,
            allPets: newPetArray
        })
    }

    render() {
        return (
            <div>
                <div className='browsebittersweet'> </div>
                <div className='browsenaplesyellow'> </div>
                <div className='search-bar'>
                    <form onSubmit={this.handleSearch}>
                        <input type="text" placeholder="Search..." className="search"
                            name="search"
                            onChange={(e) => this.setState({ searchField: e.target.value })}
                        />

                        <button className="button1">
                            <img
                                src="/loupe.png"
                                alt="Search"
                                className="glass" />
                        </button>
                    </form>
                </div>
                <div className='pet-box'>
                    {this.state.loading
                        ? <img src={'/loading-spinner.gif'} className='loading-spinner' alt={''} />
                        :
                        this.state.allPets.map(pet =>
                            <Link to={`/pets/${pet.id}`} >
                                <div className='pet-box' key={pet.id}>
                                    <PetItem
                                        pet={pet} />
                                </div>
                            </Link>)
                    }

                </div>
            </div>
        )
    }
}
