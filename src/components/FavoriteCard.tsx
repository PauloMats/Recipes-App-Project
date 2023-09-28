import { Link } from 'react-router-dom';
import heartFull from '../images/blackHeartIcon.svg';
import share from '../images/shareIcon.svg';
import { FavoriteRecipe } from '../utils/favoriteRecipes';

type FavoriteCardProps = {
  recipe: FavoriteRecipe,
  index: number,
  handleFavorite: () => void,
  handleShare: () => void,
  isShare: boolean;
};

function FavoriteCard(
  { recipe, index, handleFavorite, handleShare, isShare }: FavoriteCardProps,
) {
  const { id, type, nationality, category, alcoholicOrNot, name, image } = recipe;
  const linkPath = `/${type}s/${id}`;

  return (
    <div>
      <Link to={ linkPath }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          style={ { width: '150px' } }
        />
      </Link>
      <Link to={ linkPath }>
        <span data-testid={ `${index}-horizontal-name` }>{name}</span>
      </Link>
      <span data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality || ''} - ${category} - ${alcoholicOrNot || ''}`}
      </span>
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
