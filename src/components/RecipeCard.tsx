import { Link } from 'react-router-dom';
import { RecipeType } from '../utils/types';
import '../css/RecipeCard.css';

type RecipeCardProps = {
  recipe: RecipeType;
  index: number;
};

function RecipeCard({ recipe, index }: RecipeCardProps) {
  const recipeName = recipe.strMeal || recipe.strDrink;
  const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;

  const linkPath = recipe.strMeal
    ? `/meals/${recipe.idMeal}`
    : `/drinks/${recipe.idDrink}`;

  return (
    <Link to={ linkPath } style={ { textDecoration: 'none', color: 'inherit' } }>
      <div className="recipe-card-container" data-testid={ `${index}-recipe-card` }>
        <img
          src={ recipeThumb }
          alt={ recipeName }
          data-testid={ `${index}-card-img` }
        />
        <span className="recipe-name-s" data-testid={ `${index}-card-name` }>
          {recipeName}
        </span>
      </div>
    </Link>
  );
}

export default RecipeCard;
