import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import Card from '../../components/Card/Card';
import PokemonModal from '../../components/PokemonModal/PokemonModal';

import './style.css';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const getPokemons = async () => {
      await api.get('pokemon?limit=25').then((response) => {
        setPokemons(response.data['results']);
      });
    };

    getPokemons();
  }, []);

  const handlePokemonClick = (pokemon) => (e) => {
    e.preventDefault();
    setSelectedPokemon(pokemon);
  };

  return (
    <div className='pokedex-container'>
      <PokemonModal
        show={Boolean(selectedPokemon)}
        handleClose={() => setSelectedPokemon(null)}
        pokemon={selectedPokemon}
      />
      <header>
        <div className='back-container'>
          <Link to='/'>
            <h2>
              <i className='arrow circle left icon' />
              Voltar para home
            </h2>
          </Link>
        </div>
        <div className='title-container'>
          <h1>Choose your pokemon</h1>
        </div>
      </header>
      <div className='cards-container'>
        {pokemons.map((pokemon) => (
          <a
            key={pokemon.name}
            href='#N/A'
            onClick={handlePokemonClick(pokemon)}
          >
            <Card key={pokemon.name} pokemon={pokemon} />
          </a>
        ))}
      </div>

      <footer>
        <br />
        <br />
        <p>Paginação</p>
      </footer>
    </div>
  );
};

export default Pokedex;
