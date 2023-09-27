import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import heartFull from '../images/blackHeartIcon.svg';
import share from '../images/shareIcon.svg';
import { FavoriteRecipe } from '../utils/favoriteRecipes';

type FavoriteCardProps = {
  recipe: FavoriteRecipe,
  index: number,
  updateFavorites: () => void,
};

function FavoriteCard({ recipe, index, updateFavorites }: FavoriteCardProps) {
  const [isFavorite, setIsFavorite] = useState(true);
  const location = useLocation();
  const {
    id,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
  } = recipe;

  function handleShare() {
    navigator.clipboard.writeText(`http://localhost:3000${location.pathname}`);
  }

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const removeFavorite = favoriteRecipes
      .filter((recipeF: any) => recipeF.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(removeFavorite));
    setIsFavorite(!isFavorite);
    updateFavorites();
  };

  return (
    <div>
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <span data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality || ''} - ${category || alcoholicOrNot || ''}`}
      </span>
      <span data-testid={ `${index}-horizontal-name` }>{name}</span>
      <button onClick={ handleShare }>
        <img
          src={ share }
          alt="Share"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      <button onClick={ handleFavorite }>
        <img
          src={ heartFull }
          alt="Favorite"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
    </div>
  );
}

export default FavoriteCard;
