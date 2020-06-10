import React, { useEffect, useState } from 'react';

import { getPokemonImageUrl } from '../../services/api';

import './style.css';
import axios from 'axios';

const Card = (pokemon) => {
  const [pokemonData, setPokemonData] = useState({
    types: [],
    id: 0,
    weight: 0,
    height: 0,
    imageUrl: '',
  });
  const { name, url } = pokemon.pokemon;
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const capitalizedType = pokemonData.types.map(
    (type) => type[0].toUpperCase() + type.slice(1)
  );

  useEffect(() => {
    const getPokemonData = async () => {
      await axios.get(url).then((response) => {
        setPokemonData({
          types: response.data.types.map((typeInfo) => typeInfo.type.name),
          id: response.data.id,
          weight: response.data.weight,
          height: response.data.height,
          imageUrl: getPokemonImageUrl(response.data.id),
        });
      });
    };

    getPokemonData();
  }, [url]);

  return (
    <div className={`pokemon-card ${pokemonData.types[0]}`}>
      <div>
        <img
          src={pokemonData.imageUrl}
          alt={capitalizedName}
          className='card-image'
        />
      </div>
      <h2 className='card-title'>
        #{pokemonData.id} - {capitalizedName}
      </h2>
      <p className='card-subtitle'>{capitalizedType.join(' / ')}</p>
    </div>
  );
};

export default Card;
