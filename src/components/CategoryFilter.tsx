import { useEffect, useState } from 'react';
import '../css/CategoryFilter.css';
import allIcon from '../images/allIcon.svg';
import beefIcon from '../images/beefIcon.svg';
import goatIcon from '../images/goatIcon.svg';
import Chicken from '../images/chicken.svg';
import breakfast from '../images/breakfast.svg';
import dessert from '../images/dessert.svg';
import allDrinks from '../images/allDrinkIcon.svg';
import shake from '../images/shake.svg';
import other from '../images/other.svg';
import cocoa from '../images/cocoa.svg';
import ordinaryDrink from '../images/ordinaryDrink.svg';
import cocktail from '../images/cocktail.svg';

type Props = {
  onCategorySelect: (category: string | null) => void;
  type: 'meals' | 'drinks';
};

function CategoryFilter({ onCategorySelect, type }: Props) {
  const [categories, setCategories] = useState<string[]>([]);
  const [toggle, setToggle] = useState<string | null>(null);
  const icons = [beefIcon, breakfast, Chicken, dessert, goatIcon];
  const drinkIcons = [shake, other, cocoa, ordinaryDrink, cocktail];
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

  const handleCategoryToggle = (category: string) => {
    if (category === toggle) {
      onCategorySelect(null);
      setToggle(null);
    } else {
      onCategorySelect(category);
      setToggle(category);
    }
  };

  return (
    <div className="categoryFilter">
      <div>
        <div className="all">
          <button
            data-testid="All-category-filter"
            onClick={ () => { onCategorySelect(null); setToggle(null); } }
          >
            {type === 'meals' && <img src={ allIcon } alt={ allIcon } />}
            {type !== 'meals' && <img src={ allDrinks } alt={ allDrinks } />}
          </button>
        </div>
        <p>All</p>
      </div>
      {categories.map((category, index) => (
        <div key={ index }>
          <div className={ category } id={ `item-${index.toString()}` }>
            <button
              key={ category }
              data-testid={ `${category}-category-filter` }
              onClick={ () => handleCategoryToggle(category) }
              className={ category === toggle ? 'active' : '' }
            >
              {type === 'meals' && <img src={ icons[index] } alt={ category[index] } />}
              {type !== 'meals' && <img
                src={ drinkIcons[index] }
                alt={ category[index] }
              />}
            </button>
          </div>
          <p>{category}</p>
        </div>
      ))}
    </div>
  );
}

export default CategoryFilter;
