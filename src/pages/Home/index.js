import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import Red from '../../images/Red.png';

const Home = () => {
  return (
    <div className='home-container'>
      <div className='trainer-container'>
        <img src={Red} alt='Trainer' />
      </div>
      <div className='text-container'>
        <h1>Welcome to Pokedex!</h1>
        <p>Be ready to catch em' all!</p>
      </div>
      <div className='button-container'>
        <Link to='Pokedex'>
          <button className='button'>
            <span>
              <p>Let's go!</p>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
