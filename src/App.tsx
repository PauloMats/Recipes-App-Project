import { Route, Routes } from 'react-router-dom';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/pages/Login';
import Recipes from './Pages/pages/Meals';

function App() {
  return (
    <>
      <div className="meals">
        <span className="logo">Trybe</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
        <Footer />
      </div>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Recipes /> } />
        <Route path="/drinks" />
        <Route path="/profile" />
        <Route path="/done-recipes" />
        <Route path="/favorite-recipes" />
      </Routes>
    </>
  );
}

export default App;
