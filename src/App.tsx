import React from 'react';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <><BrowserRouter>
      <Routes>
        <Route path="/meals/:id-da-receita"></Route>
        <Route path="/drinks/:id-da-receita>"></Route>
      </Routes>
      <div>
        <div className="meals">
          <span className="logo">TRYBE</span>
          <object
            className="rocksGlass"
            type="image/svg+xml"
            data={rockGlass}
          >
            Glass
          </object>
          <Header />
          <SearchBar />
        </div>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
