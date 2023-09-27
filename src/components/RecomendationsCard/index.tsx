import { Link } from 'react-router-dom';
import { RecipeType } from '../../utils/types';

type RecipeCardProps = {
  recipe: RecipeType;
  index: number;
};

function RecommendationCard({ recipe, index }: RecipeCardProps) {
  const recipeName = recipe.strMeal || recipe.strDrink;
  const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;

  const linkPath = recipe.strMeal
    ? `/meals/${recipe.idMeal}`
    : `/drinks/${recipe.idDrink}`;

  return (
    <Link to={ linkPath } style={ { textDecoration: 'none', color: 'inherit' } }>
      <div data-testid={ `${index}-recommendation-card` }>
        <img
          src={ recipeThumb }
          alt={ recipeName }
          width="200px"
        />
        <span data-testid={ `${index}-recommendation-title` }>
          {recipeName}
        </span>
      </div>
    </Link>
  );
}

export default RecommendationCard;
