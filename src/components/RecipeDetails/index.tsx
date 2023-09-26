import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import fetchAPi from '../../utils/fetchApi';
import { RecipeType } from '../../utils/types';
import RecommendationCard from '../RecomendationsCard';
import 'bootstrap/dist/css/bootstrap.css';
import { recipeIngredients, youtubeVideoLink } from '../../utils/recipeDetailsUtils';
import { FavoriteRecipe } from '../../utils/favoriteRecipes';
import heart from '../../images/whiteHeartIcon.svg';
import heartFull from '../../images/blackHeartIcon.svg';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [recipe, setRecipe] = useState<RecipeType[]>([]);
  const [recomendations, setRecomendations] = useState<RecipeType[]>([]);
  const [btnStatus, setBtnStatus] = useState<boolean>(true);
  const [isShare, setIsShare] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const isMeal = location.pathname.includes('/meals/');
  const navigate = useNavigate();

  useEffect(() => {
    async function getRecomendations() {
      if (isMeal) {
        const recomendationsDrink = await fetchAPi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setRecomendations(recomendationsDrink);
      } else {
        const recomendationsMeal = await fetchAPi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecomendations(recomendationsMeal);
      }
    }
    const endpoint = isMeal ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}` : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    async function getMeal() {
      const recipeDescription = await fetchAPi(endpoint);
      // console.log(recipeDescription);
      setRecipe(recipeDescription);
    }
    const inProgressRecipes = JSON
      .parse(localStorage.getItem('inProgressRecipes') || '{}');
    const category = isMeal ? 'meals' : 'drinks';
    setBtnStatus(!!(
      inProgressRecipes[category] && id && inProgressRecipes[category][id]
    ));
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isFav = favoriteRecipes.some((recipeF: any) => recipeF.id === id);
    setIsFavorite(isFav);

    getMeal();
    getRecomendations();
  }, [isMeal, id]);

  function handleButton() {
    setBtnStatus(true);
    const data = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    const category = isMeal ? 'meals' : 'drinks';

    const ingredients = recipe.map((description) => recipeIngredients(description));

    data[category] = {
      ...data[category],
      [id || '']: ingredients,
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(data));
    navigate(`${location.pathname}/in-progress`);
  }
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
        category: recipe[0].strCategory || '',
        alcoholicOrNot: recipe[0].strAlcoholic || '',
        name: recipe[0].strMeal || recipe[0].strDrink,
        image: recipe[0].strMealThumb || recipe[0].strDrinkThumb,
      };
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...favoriteRecipes, favorite]));
    }
    setIsFavorite(!isFavorite);
  }

  return (
    recipe.map((description) => (
      <div key={ isMeal ? description.idMeal : description.idDrink }>
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
        { recipeIngredients(description).map((item, index) => (
          <h6 key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            { item }
          </h6>
        )) }
        <p data-testid="instructions">{ description.strInstructions }</p>
        { isMeal && (
          <iframe
            title="YouTube Video"
            data-testid="video"
            width="420"
            height="315"
            src={ youtubeVideoLink(description.strYoutube) }
          />
        )}
        <Carousel>
          { recomendations.slice(0, 6).map((recommendation, index) => (
            <Carousel.Item key={ index }>
              <RecommendationCard recipe={ recommendation } index={ index } />
            </Carousel.Item>
          )) }
        </Carousel>
        <button
          className="footer"
          data-testid="start-recipe-btn"
          onClick={ handleButton }
        >
          { btnStatus ? 'Continue Recipe' : 'Start Recipe' }
        </button>
      </div>
    ))
  );
}

export default RecipeDetails;
