import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import Pokedex from './pages/Pokedex';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path='/' exact component={Home} />
          <Route path='/pokedex' exact component={Pokedex} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
