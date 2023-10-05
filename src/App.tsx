import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/pages/Login';
import Recipes from './Pages/pages/Recipes';
import Profile from './Pages/Profile';
import { DoneSearchLayout } from './Helper/Layouts/DoneSearchLayout';
import { DrinksLayout } from './Helper/Layouts/DrinksLayout';
import { FavoriteSearchLayout } from './Helper/Layouts/FavoriteSearchLayout';
import { FullHeaderLayout } from './Helper/Layouts/FullHeaderLayout';
import { MealsLayout } from './Helper/Layouts/MealsLayout';
import { ProfileSearchLayout } from './Helper/Layouts/ProfileSeachLayout';
import RecipeDetails from './components/RecipeDetails';
import RecipeInProgress from './Pages/pages/RecipeInProgress';
import FavoriteRecipes from './Pages/pages/FavoriteRecipes';
import DoneRecipes from './components/DoneRecipes';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <FullHeaderLayout /> }>
        {' '}
        <Route index element={ <Login /> } />
      </Route>
      <Route path="/meals" element={ <MealsLayout /> }>
        <Route index element={ <Recipes /> } />
      </Route>
      <Route path="/drinks" element={ <DrinksLayout /> }>
        <Route index element={ <Recipes /> } />
      </Route>
      <Route path="/meals/:id" element={ <RecipeDetails /> } />
      <Route path="/drinks/:id" element={ <RecipeDetails /> } />
      <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/profile" element={ <ProfileSearchLayout /> }>
        <Route index element={ <Profile /> } />
      </Route>
      <Route path="/done-recipes" element={ <DoneSearchLayout /> }>
        <Route index element={ <DoneRecipes /> } />
      </Route>
      <Route path="/favorite-recipes" element={ <FavoriteSearchLayout /> }>
        <Route index element={ <FavoriteRecipes /> } />
      </Route>
    </Routes>
  );
}

export default App;
