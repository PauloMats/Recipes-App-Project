import { Link } from 'react-router-dom';
import heartFull from '../images/blackHeartIcon.svg';
import share from '../images/shareIcon.svg';
import { FavoriteRecipe } from '../utils/favoriteRecipes';
import '../css/FavoriteCard.css';

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
    <div className="favorite-card-container">
      <Link to={ linkPath }>
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-horizontal-image` }
          style={ { width: '150px' } }
        />
      </Link>
      <div className="fav-info-container">
        <div className="fav-name-container">
          <Link to={ linkPath }>
            <span
              className="fav-name"
              data-testid={ `${index}-horizontal-name` }
            >
              {name}
            </span>
          </Link>
          <span
            className="fav-info"
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${nationality || ''} - ${category} - ${alcoholicOrNot || ''}`}
          </span>
        </div>
        <div className="fav-button-container">
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
      </div>
      {isShare && <span>Link copied!</span>}
    </div>
  );
}

export default FavoriteCard;
