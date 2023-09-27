import { Route, Routes } from 'react-router-dom';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/pages/Login';
import Recipes from './Pages/pages/Recipes';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import RecipeDetails from './components/RecipeDetails';
import RecipeInProgress from './Pages/pages/RecipeInProgress';
import FavoriteRecipes from './Pages/pages/FavoriteRecipes';

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
        <Header />
        <SearchBar />
      </div>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/meals" element={ <Recipes /> } />
        <Route path="/drinks" element={ <Recipes /> } />
        <Route path="/meals/:id" element={ <RecipeDetails /> } />
        <Route path="/drinks/:id" element={ <RecipeDetails /> } />
        <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
        <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
        <Route path="/profile" />
        <Route path="/done-recipes" />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      </Routes>
    </>
  );
}

export default App;
