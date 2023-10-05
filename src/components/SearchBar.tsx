import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Searchbar.css';

function SearchBar() {
  type Recipe = {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
  };
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('ingredient');
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const drinkPage = window.location.pathname.includes('/drinks');
  // const [redirectPath, setRedirectPath] = useState<string | null>(null);

  const handleSearchTypeChange = (event:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSearchType(event.target.value);
  };

  const handleSearchInputChange = (event:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSearchValue(event.target.value);
  };

  const BASE_URL_COCKTAILS = 'https://www.thecocktaildb.com/api/json/v1/1';
  const BASE_URL_MEALS = 'https://www.themealdb.com/api/json/v1/1';

  const handleSearch = () => {
    if (searchType === 'first-letter' && searchValue.length !== 1) {
      window.alert('Your search must have only 1 (one) character');
      return;
    }

    let apiUrl = '';
    const baseApiUrl = drinkPage ? BASE_URL_COCKTAILS : BASE_URL_MEALS;

    const searchTypeMap = {
      ingredient: 'filter.php?i=',
      name: 'search.php?s=',
      'first-letter': 'search.php?f=',
    };

    if (searchType in searchTypeMap) {
      apiUrl = `${baseApiUrl}/${searchTypeMap[searchType]}${searchValue}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.meals || data.drinks) {
          const limitedResults = (data.meals || data.drinks).slice(0, 12);
          setSearchResults(limitedResults);
        }
        if (data.meals && data.meals.length === 1) {
          const mealId = data.meals[0].idMeal;
          navigate(`/meals/${mealId}`);
        } else if (data.drinks && data.drinks.length === 1) {
          const drinkId = data.drinks[0].idDrink;
          navigate(`/drinks/${drinkId}`);
        } else if (!data.meals && !data.drinks) {
          window.alert("Sorry, we haven't found any recipes for these filters.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div data-testid="searchBar">
      <input
        type="text"
        placeholder="Search..."
        value={ searchValue }
        onChange={ handleSearchInputChange }
        data-testid="search-input"
        className="bar"
      />
      <div>
        <label>
          <input
            type="radio"
            value="ingredient"
            checked={ searchType === 'ingredient' }
            onChange={ handleSearchTypeChange }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label>
          <input
            type="radio"
            value="name"
            checked={ searchType === 'name' }
            onChange={ handleSearchTypeChange }
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            value="first-letter"
            checked={ searchType === 'first-letter' }
            onChange={ handleSearchTypeChange }
            data-testid="first-letter-search-radio"
          />
          First letter
        </label>
      </div>
      <button
        onClick={ handleSearch }
        data-testid="exec-search-btn"
      >
        Search
      </button>

      {searchResults.map((recipe, index) => (
        <div
          key={ recipe.idMeal || recipe.idDrink }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal || recipe.strDrink}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchBar;
