import { useLocation } from 'react-router-dom';
import { useCallback, useState } from 'react';
import RecipeCard from '../../components/RecipeCard';
import CategoryFilter from '../../components/CategoryFilter';
import useFetchRecipes from '../../Hooks/useFetchRecipes';

function Recipes() {
  const location = useLocation();
  const type = location.pathname === '/meals' ? 'meals' : 'drinks';
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const { recipes } = useFetchRecipes(type, selectedCategory);

  const handleCategoryClick = useCallback((category: string) => {
    setSelectedCategory(category);
  }, [setSelectedCategory]);

  return (
    <div>
      <CategoryFilter
        type={ type }
        onCategorySelect={ handleCategoryClick }
      />
      {recipes.slice(0, 12).map((recipe, index) => (
        <RecipeCard
          key={ recipe.idMeal || recipe.idDrink }
          recipe={ recipe }
          index={ index }
        />
      ))}
    </div>
  );
}

export default Recipes;
