import { useState, useEffect } from 'react';
import { RecipeType } from '../Types';

type FetchType = 'meals' | 'drinks';

function useFetchRecipes(type: FetchType, category?: string) {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      let endpoint: string;
      if (type === 'meals') {
        endpoint = category
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
          : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      } else {
        endpoint = category
          ? `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
          : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      }

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setRecipes(data.meals || data.drinks);
      } catch (err: any) {
        setError(err);
      }
    };

    fetchRecipes();
  }, [type, category]);

  return { recipes, error };
}

export default useFetchRecipes;
