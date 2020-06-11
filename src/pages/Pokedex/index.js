import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getPokemonImageUrl } from '../../services/api';

import Card from '../../components/Card/Card';
import PokemonModal from '../../components/PokemonModal/PokemonModal';
import './style.css';

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedPokemonDetails, setSelectedPokemonDetails] = useState({});

  const qty = 25;

  const loadPokemonData = async (pokemon) => {
    await axios.get(pokemon.url).then((response) => {
      const {
        name,
        types,
        id,
        weight,
        height,
        sprites,
        stats,
        abilities,
      } = response.data;
      setSelectedPokemonDetails({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        types: types.map(
          (typeInfo) =>
            typeInfo.type.name[0].toUpperCase() + typeInfo.type.name.slice(1)
        ),
        abilities: abilities.map(
          (abilitiesInfo) =>
            abilitiesInfo.ability.name[0].toUpperCase() +
            abilitiesInfo.ability.name.slice(1)
        ),
        id: id,
        weight: weight / 10,
        height: height / 10,
        imageUrl: getPokemonImageUrl(id),
        spriteImageUrl: sprites.front_default,
        shinySpriteImageUrl: sprites.front_shiny,
        baseStats: [
          stats[0].base_stat,
          stats[1].base_stat,
          stats[2].base_stat,
          stats[3].base_stat,
          stats[4].base_stat,
          stats[5].base_stat,
        ],
      });
    });
  };

  useEffect(() => {
    const getPokemons = async () => {
      await api.get(`pokemon?limit=${qty}&offset=0`).then((response) => {
        setPokemons(response.data['results']);
      });
    };

    getPokemons();
  }, []);

  const handlePokemonClick = (pokemon) => (e) => {
    e.preventDefault();
    setSelectedPokemon(pokemon);
    loadPokemonData(pokemon);
  };

  return (
    <div className='pokedex-container'>
      <PokemonModal
        show={Boolean(selectedPokemon)}
        handleClose={() => setSelectedPokemon(null)}
        pokemon={selectedPokemonDetails}
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
            href='#NA'
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
