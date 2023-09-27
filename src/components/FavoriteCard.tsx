import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [isShare, setIsShare] = useState<boolean>(false);

  const {
    id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
  } = recipe;

  const linkPath = `/${type}s/${id}`;

  function handleShare() {
    navigator.clipboard.writeText(`http://localhost:3000${linkPath}`);
    setIsShare(true);
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
      <Link to={ linkPath }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <span data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality || ''} - ${category} - ${alcoholicOrNot || ''}`}
      </span>
      <Link to={ linkPath }>
        <span data-testid={ `${index}-horizontal-name` }>{name}</span>
      </Link>
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
      {isShare && <span>Link copied!</span>}
    </div>
  );
}

export default FavoriteCard;
