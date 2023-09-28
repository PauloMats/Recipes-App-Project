import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RecipeType } from '../../utils/types';
import fetchAPi from '../../utils/fetchApi';
import heart from '../../images/whiteHeartIcon.svg';
import heartFull from '../../images/blackHeartIcon.svg';
import { recipeIngredients } from '../../utils/recipeDetailsUtils';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [recipe, setRecipe] = useState<RecipeType[]>([]);
  const [recomendations, setRecomendations] = useState<RecipeType[]>([]);
  const [btnStatus, setBtnStatus] = useState<boolean>(true);
  const [isShare, setIsShare] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<string[]>([]);

  const isMeal = location.pathname.includes('/meals/');

  useEffect(() => {
    const endpoint = isMeal ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    async function getMeal() {
      const recipeDescription = await fetchAPi(endpoint);
      // console.log(recipeDescription);
      setRecipe(recipeDescription);
    }

    getMeal();
  }, [isMeal, id]);

  // console.log(recomendations);

  function handleShare() {
    navigator.clipboard.writeText(`http://localhost:3000${location.pathname}`);
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
    const element = document.querySelector(itemSelected) as HTMLElement;

    const inputSelected = `input[id="${index}"]`;
    const elementText = document.querySelector(itemSelected) as HTMLElement;

    if (element) {
      element
        .setAttribute('style', 'text-decoration: line-through; color: rgb(0, 0, 0);');
      setIngredients([...ingredients, itemSelected]);
      const receita = localStorage.getItem('inProgressRecipes');
      console.log(element.innerText);
      console.log(receita);
    }
    if (ingredients.includes(itemSelected)) {
      setIngredients(ingredients.filter((item) => item !== itemSelected));
      if (element) {
        element.removeAttribute('style');
      }
    }
    // console.log(ingredients);
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
        <div>
          { recipeIngredients(description).map((item, index) => (
            <div key={ index }>
              <label
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ item }
              >
                <input
                  type="checkbox"
                  name={ item }
                  id={ String(index) }
                  onClick={ () => textStyle(index) }
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
          // onClick={ handleButton }
        >
          Finish Recipe
        </button>
      </div>
    ))
  );
}
export default RecipeInProgress;
