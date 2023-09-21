import React, { useEffect, useState } from 'react';

type Props = {
  onCategorySelect: (category: string | null) => void;
  type: 'meals' | 'drinks';
};

function CategoryFilter({ onCategorySelect, type }: Props) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      let endpoint: string;
      if (type === 'meals') {
        endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      } else {
        endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      }

      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        const categoriesList = data.meals
          ? data.meals.map((meal: any) => meal.strCategory)
          : data.drinks.map((drink: any) => drink.strCategory);
        setCategories(categoriesList.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, [type]);

  return (
    <div>
      <button
        data-testid="All-category-filter"
        onClick={ () => onCategorySelect(null) }
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={ category }
          data-testid={ `${category}-category-filter` }
          onClick={ () => onCategorySelect(category) }
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
