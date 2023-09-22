import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import fetchAPi from '../../utils/fetchApi';
import { RecipeType } from '../../utils/types';
import RecommendationCard from '../RecomendationsCard';
import 'bootstrap/dist/css/bootstrap.css';
import { recipeIngredients, youtubeVideoLink } from '../../utils/recipeDetailsUtils';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [recipe, setRecipe] = useState<RecipeType[]>([]);
  const [recomendations, setRecomendations] = useState<RecipeType[]>([]);
  const [btnStart, setBtnStart] = useState<boolean>(true);

  useEffect(() => {
    const isMeal = location.pathname.includes('/meals/');
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
      console.log(recipeDescription);
      setRecipe(recipeDescription);
    }
    getMeal();
    getRecomendations();
  }, [location.pathname, id]);

  // function recipeIngredients(description: RecipeType) {
  //   const ingredients = Object.entries(description)
  //     .filter((entry) => entry[0].includes('strIngredient') && entry[1])
  //     .map((entry) => entry[1]);

  //   const measures = Object.entries(description)
  //     .filter((entry) => entry[0].includes('strMeasure') && entry[1])
  //     .map((entry) => entry[1]);

  //   const ingredientsAndMeasures = ingredients.map((ingredient, index) => (
  //     `${ingredient} - ${measures[index]}`
  //   ));

  //   return ingredientsAndMeasures;
  // }

  // function youtubeVideoLink(url: string) {
  //   const youtubeLink = 'https://www.youtube.com/embed/';
  //   const youtubeId = url.split('v=')[1];
  //   return `${youtubeLink}${youtubeId}`;
  // }

  function handleButton() {
    setBtnStart(false);
    console.log('teste');
  }

  if (location.pathname.includes('/meals/')) {
    return (
      recipe.map((description) => (
        <div key={ description.idMeal }>
          <img
            data-testid="recipe-photo"
            src={ description.strMealThumb }
            aria-label={ description.strMeal }
            width="350px"
            height="350px"
          />
          <h1 data-testid="recipe-title">{ description.strMeal }</h1>
          <h3 data-testid="recipe-category">{ description.strCategory }</h3>
          { recipeIngredients(description).map((item, index) => (
            <h6
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { item }
            </h6>
          )) }
          <p data-testid="instructions">{description.strInstructions}</p>
          {location.pathname.includes('/meals/') && (
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
                <RecommendationCard
                  key={ recommendation.idMeal }
                  recipe={ recommendation }
                  index={ index }
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <button
            className="footer"
            data-testid="start-recipe-btn"
            onClick={ handleButton }
          >
            {btnStart ? 'Start Recipe' : 'Continue Recipe' }
          </button>
        </div>
      ))
    );
  }

  if (location.pathname.includes('/drinks/')) {
    return (
      recipe.map((description) => (
        <div key={ description.idDrink }>
          <img
            data-testid="recipe-photo"
            src={ description.strDrinkThumb }
            aria-label={ description.strDrink }
            width="350px"
            height="350px"
          />
          <h1 data-testid="recipe-title">{ description.strDrink }</h1>
          <h3 data-testid="recipe-category">{ description.strAlcoholic}</h3>
          { recipeIngredients(description).map((item, index) => (
            <h6
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { item }
            </h6>
          )) }
          <p data-testid="instructions">{description.strInstructions}</p>
          <Carousel>
            { recomendations.slice(0, 6).map((recommendation, index) => (
              <Carousel.Item key={ index }>
                <RecommendationCard
                  key={ recommendation.idDrink }
                  recipe={ recommendation }
                  index={ index }
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <button
            className="footer"
            data-testid="start-recipe-btn"
            onClick={ handleButton }
          >
            {btnStart ? 'Start Recipe' : 'Continue Recipe' }
          </button>
        </div>
      ))
    );
  }
}

export default RecipeDetails;
