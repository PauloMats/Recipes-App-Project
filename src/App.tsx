import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="/meals" />
        <Route path="/drinks" />
        <Route path="/profile" />
        <Route path="/done-recipes" />
        <Route path="/favorite-recipes" />
      </Routes>
      <div className="meals">
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
