import { useEffect, useState } from 'react';
import FavoriteCard from '../../components/FavoriteCard';

function FavoriteRecipes() {
  const [favorite, setFavorite] = useState([]);
  const [filter, setFilter] = useState('All');

  const updateFavorites = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavorite(favoriteRecipes);
    console.log('favoriteRecipes', favoriteRecipes);
  };

  useEffect(() => {
    updateFavorites();
  }, []);

  const filtered = favorite.filter(
    (recipe: any) => (filter === 'All' ? true : recipe.type === filter.toLowerCase()),
  );

  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('All') }
      >
        All

      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => setFilter('Meal') }
      >
        Meals

      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('Drink') }
      >
        Drinks

      </button>
      {filtered.map((recipe: any, index) => (
        <FavoriteCard
          key={ index }
          recipe={ recipe }
          index={ index }
          updateFavorites={ updateFavorites }
        />
      ))}
    </div>
  );
}
export default FavoriteRecipes;
