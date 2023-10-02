import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RecipeType } from '../../utils/types';
import fetchAPi from '../../utils/fetchApi';
import heart from '../../images/whiteHeartIcon.svg';
import heartFull from '../../images/blackHeartIcon.svg';
import { recipeIngredients } from '../../utils/recipeDetailsUtils';

function RecipeInProgress() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [recipe, setRecipe] = useState<RecipeType[]>([]);
  const [isShare, setIsShare] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<string[]>([]);

  const isMeal = location.pathname.includes('/meals/');
  const IngredientsLocal = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
  const idKey = id || '';
  const navigate = useNavigate();

  useEffect(() => {
    const endpoint = isMeal ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    async function getMeal() {
      const recipeDescription = await fetchAPi(endpoint);
      setRecipe(recipeDescription);
      const inProgressRecipes = localStorage.getItem('inProgressRecipes');
      if (!inProgressRecipes) {
        const defaultProgress = {
          [isMeal ? 'meals' : 'drinks']: {
            [idKey]: recipeDescription
              .map((description:any) => recipeIngredients(description)),
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(defaultProgress));
      }
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      if (favoriteRecipes.map((item: any) => item.id).includes(id)) {
        setIsFavorite(true);
      }
    }

    getMeal();
  }, [isMeal, id]);
  function handleShare() {
    const adjust = location.pathname.replace('/in-progress', '');
    navigator.clipboard.writeText(`http://localhost:3000${adjust}`);
    setIsShare(true);
  }
  function handleFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    if (isFavorite) {
      const newFavorite = favoriteRecipes.filter((recipeF: any) => recipeF.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
    } else {
      const favorite = {
        id,
        type: isMeal ? 'meal' : 'drink',
        nationality: recipe[0].strArea || '',
        category: recipe[0].strCategory,
        alcoholicOrNot: recipe[0].strAlcoholic || '',
        name: recipe[0].strMeal || recipe[0].strDrink,
        image: recipe[0].strMealThumb || recipe[0].strDrinkThumb,
      };
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, favorite]));
    }
    setIsFavorite(!isFavorite);
  }
  function textStyle(index: any) {
    const itemSelected = `label[data-testid="${index}-ingredient-step"]`;
    const elementText = document.querySelector(itemSelected) as HTMLElement;
    const ingredientText = elementText.innerText;
    const progressKey = isMeal ? 'meals' : 'drinks';
    const savedProgress = IngredientsLocal[progressKey]
      ?.[idKey]?.[0].map((item: any) => item?.trim());
    if (elementText) {
      const itemInLocalStorage = savedProgress.includes(ingredientText);
      if (!itemInLocalStorage) {
        const updatedProgress = [...savedProgress, ingredientText];
        const updatedLocalStorage = {
          ...IngredientsLocal,
          [progressKey]: {
            ...IngredientsLocal[progressKey],
            [idKey]: [updatedProgress.map((item: any) => item)],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(updatedLocalStorage));
      } else {
        const updatedProgress = savedProgress
          .filter((item: any) => item !== ingredientText);
        const updatedLocalStorage = {
          ...IngredientsLocal,
          [progressKey]: {
            ...IngredientsLocal[progressKey],
            [idKey]: [updatedProgress.map((item: any) => item?.trim())],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(updatedLocalStorage));
      }
      if (!ingredients.includes(ingredientText)) {
        elementText
          .setAttribute('style', 'text-decoration: line-through; color: rgb(0, 0, 0);');
        setIngredients([...ingredients, ingredientText]);
      } else {
        setIngredients(ingredients.filter((item) => item !== ingredientText));
        elementText.removeAttribute('style');
      }
    }
  }
  function checkItemStyle(name: any): React.CSSProperties {
    const progressKey = isMeal ? 'meals' : 'drinks';
    const savedProgress = IngredientsLocal[progressKey]?.[idKey]?.[0]
      .map((item: any) => item);
    const isInLocalStorage = savedProgress.includes(name);
    if (isInLocalStorage) {
      return {
        textDecoration: 'none',
        color: 'none',
      };
    }
    return {
      textDecoration: 'line-through',
      color: 'rgb(0, 0, 0)',
    };
  }
  function handleButton() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const eachTag = recipe.flatMap((item) => {
      if (item.strTags) {
        return item.strTags.split(',').map((tag) => tag?.trim());
      }
      return [];
    });
    const done = {
      id,
      type: isMeal ? 'meal' : 'drink',
      nationality: recipe[0].strArea || '',
      category: recipe[0].strCategory,
      alcoholicOrNot: recipe[0].strAlcoholic || '',
      name: recipe[0].strMeal || recipe[0].strDrink,
      image: recipe[0].strMealThumb || recipe[0].strDrinkThumb,
      doneDate: new Date().toISOString(),
      tags: eachTag,
    };
    localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, done]));
    navigate('/done-recipes');
  }
  function checkInput(name: any) {
    const progressKey = isMeal ? 'meals' : 'drinks';
    const savedProgress = IngredientsLocal[progressKey]?.[idKey]?.[0]
      .map((item: any) => item?.trim());
    const isInLocalStorage = savedProgress.includes(name?.trim());
    return !(isInLocalStorage);
  }
  return (
    recipe.map((description) => (
      <div key={ isMeal ? description.idMeal : description.idDrink }>
        <h1>RecipeInProgress</h1>
        {isShare && <span>Link copied!</span>}
        <img
          data-testid="recipe-photo"
          src={ isMeal ? description.strMealThumb : description.strDrinkThumb }
          aria-label={ isMeal ? description.strMeal : description.strDrink }
          width="350px"
          height="350px"
        />
        <button data-testid="share-btn" onClick={ handleShare }>Compartilhar</button>
        <button onClick={ handleFavorite }>
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? heartFull : heart }
            alt="favorite"
          />
        </button>
        <h1
          data-testid="recipe-title"
        >
          { isMeal ? description.strMeal : description.strDrink }
        </h1>
        <h3
          data-testid="recipe-category"
        >
          { isMeal ? description.strCategory : description.strAlcoholic }
        </h3>
        <div id="ingredientes">
          { recipeIngredients(description).map((item, index) => (
            <div key={ index }>
              <label
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ item }
                style={ checkItemStyle(item) }
              >
                <input
                  type="checkbox"
                  name={ item }
                  data-testid={ `checkbox-${index}` }
                  checked={ checkInput(item) }
                  onChange={ () => textStyle(index) }
                />
                {item}
              </label>
            </div>
          )) }
        </div>
        <p data-testid="instructions">{ description.strInstructions }</p>
        <button
          className="footer"
          data-testid="finish-recipe-btn"
          onClick={ handleButton }
          disabled={ IngredientsLocal[isMeal ? 'meals' : 'drinks']
            ?.[idKey]?.[0].length !== 0 }
        >
          Finish Recipe
        </button>
      </div>
    ))
  );
}
export default RecipeInProgress;
