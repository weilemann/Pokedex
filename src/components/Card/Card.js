import React, { useEffect, useState } from 'react';

import { getPokemonImageUrl, getPokemonUrl } from '../../services/api';

import './style.css';
import axios from 'axios';

const Card = (pokemon) => {
  const [pokemonData, setPokemonData] = useState({
    types: [],
    id: 0,
    weight: 0,
    height: 0,
  });
  const { name, url } = pokemon.pokemon;
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

  useEffect(() => {
    const getPokemonData = async () => {
      axios.get(url).then((response) => {
        console.log(response.data.height);

        setPokemonData({
          types: response.data.types,
          id: response.data.id,
          weight: response.data.weight,
          height: response.data.height,
        });
      });
    };

    getPokemonData();
  }, []);

  return (
    <div className='card'>
      <div className='image-container'>
        <img src={getPokemonImageUrl(pokemonData.id)} alt={capitalizedName} />
      </div>
      <div className='info-container'>
        <p>
          #{pokemonData.id} - {capitalizedName}
        </p>
        <p>Weight: {pokemonData.weight}kg </p>
        <p>Height: {pokemonData.height}m</p>
      </div>
    </div>
  );
};

export default Card;
