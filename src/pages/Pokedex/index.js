import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import Card from '../../components/Card/Card';

import './style.css';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      await api.get('pokemon?limit=500').then((response) => {
        setPokemons(response.data['results']);
      });
    };

    getPokemons();
  }, []);

  return (
    <div className='pokedex-container'>
      <header>
        <div className='back-container'>
          <Link to='/'>
            <p>
              <i className='arrow circle left icon' />
              Voltar para home
            </p>
          </Link>
        </div>
        <div className='title-container'>
          <h1>Choose your pokemon</h1>
        </div>
      </header>

      <div className='cards-container'>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
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
