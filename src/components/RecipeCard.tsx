import React from 'react';

type RecipeCardProps = {
  recipe: {
    idMeal?: string;
    strMeal?: string;
    strMealThumb?: string;
    idDrink?: string;
    strDrink?: string;
    strDrinkThumb?: string;
  };
  index: number;
};

function RecipeCard({ recipe, index }: RecipeCardProps) {
  const recipeName = recipe.strMeal || recipe.strDrink;
  const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipeThumb }
        alt={ recipeName }
        data-testid={ `${index}-card-img` }
      />
      <span data-testid={ `${index}-card-name` }>
        {recipeName}
      </span>
    </div>
  );
}

export default RecipeCard;
