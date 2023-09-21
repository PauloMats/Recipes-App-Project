import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../../components/RecipeCard';

type Recipe = {
  idMeal?: string;
  strMeal?: string;
  strMealThumb?: string;
  idDrink?: string;
  strDrink?: string;
  strDrinkThumb?: string;
};

function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const location = useLocation();

  useEffect(() => {
    const fetchRecipes = async () => {
      let endpoint: string;
      if (location.pathname === '/meals') {
        endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      } else {
        endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      }

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setRecipes(data.meals || data.drinks);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    };

    fetchRecipes();
  }, [location.pathname]);

  return (
    <div>
      {recipes.slice(0, 12).map((recipe, index) => (
        <RecipeCard
          key={ recipe.idMeal
           || recipe.idDrink }
          recipe={ recipe }
          index={ index }
        />
      ))}
    </div>
  );
}

export default Recipes;
