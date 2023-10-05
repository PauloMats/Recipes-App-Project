import { useEffect, useState } from 'react';
import FavoriteCard from '../../components/FavoriteCard';
import '../../css/FavoriteRecipes.css';

function FavoriteRecipes() {
  const [favorite, setFavorite] = useState([]);
  const [filter, setFilter] = useState('All');
  const [isFavorite, setIsFavorite] = useState<boolean[]>([]);
  const [isShare, setIsShare] = useState<boolean[]>([]);

  const updateFavorites = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    setFavorite(favoriteRecipes);
  };

  useEffect(() => {
    updateFavorites();
  }, []);

  const filtered = favorite.filter(
    (recipe: any) => (filter === 'All' ? true : recipe.type === filter.toLowerCase()),
  );

  const handleShare = (index: number, linkPath: string) => {
    navigator.clipboard.writeText(`http://localhost:3000${linkPath}`);
    const newIsShare = [...isShare];
    newIsShare[index] = true;
    setIsShare(newIsShare);
  };

  const handleFavorite = (index: number, id: string) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const removeFavorite = favoriteRecipes.filter((recipeF: any) => recipeF.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));

    const newIsFavorite = [...isFavorite];
    newIsFavorite[index] = !newIsFavorite[index];
    setIsFavorite(newIsFavorite);

    updateFavorites();
  };

  return (
    <div className="page-container">
      <div className="filter-container">
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
      </div>
      <div className="favorites-container">
        {filtered.map((recipe: any, index) => (
          <FavoriteCard
            key={ index }
            recipe={ recipe }
            index={ index }
            handleShare={ () => handleShare(index, `/${recipe.type}s/${recipe.id}`) }
            handleFavorite={ () => handleFavorite(index, recipe.id) }
            isShare={ isShare[index] }
          />
        ))}
      </div>
    </div>
  );
}
export default FavoriteRecipes;
