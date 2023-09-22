import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import fetchAPi from '../../utils/fetchApi';
import { Meals } from '../../utils/types';

function RecipeDetails() {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meals[]>([]);
  const [mealIngredients, setMealIngredients] = useState<object>([]);
  const [drink, setDrink] = useState<object>({});

  useEffect(() => {
    async function getMeal() {
      // const mealDescription = await fetchAPi(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const mealDescription = await fetchAPi('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52767');
      console.log(mealDescription);
      setMeal(mealDescription);
    }
    // async function getDrink() {
    //   const drinkDescription = await fetchAPi(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    //   setDrink(drinkDescription.drinks[0]);
    // }
    getMeal();
    // getDrink();
  }, [id]);

  function mealsIngredients(description: Meals) {

    }

  function youtubeVideoLink(url: string) {
    const youtubeLink = 'https://www.youtube.com/embed/';
    const youtubeId = url.split('v=')[1];
    return `${youtubeLink}${youtubeId}`;
  }

  // function ordenate(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  //   event.preventDefault();

  //   const saveOrder = formTwo.filter;
  //   const sortOrder = formTwo.ordenar === 'DESC' ? -1 : 1;

  //   const sortedResults = apiResults.sort((a, b) => {
  //     const aValue = a[saveOrder];
  //     const bValue = b[saveOrder];

  //     if (aValue === 'unknown' || bValue === 'unknown') {
  //       return aValue === 'unknown' ? 1 : -1; // Coloca 'unknown' por último
  //     }

  //     return (Number(aValue) - Number(bValue)) * sortOrder;
  //   });

  //   setApiResults([...sortedResults]);
  // }

  return (
    meal.map((description, index) => (
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
        <h6
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          { mealsIngredients(description) }
        </h6>
        <p data-testid="instructions">{ description.strInstructions }</p>
        <iframe
          title={ description.strTags }
          data-testid="video"
          width="420"
          height="315"
          src={ youtubeVideoLink(description.strYoutube) }
        />
      </div>
    ))
  );
}

export default RecipeDetails;
