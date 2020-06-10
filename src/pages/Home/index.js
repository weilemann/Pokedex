import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import Red from '../../images/Red.png';
import Lyra from '../../images/Lyra.png';

const Home = () => {
  return (
    <div className='home-container'>
      <div className='male-trainer-container'>
        <img src={Red} alt='Male Trainer' />
      </div>
      <div className='female-trainer-container'>
        <img src={Lyra} alt='Female Trainer' />
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
