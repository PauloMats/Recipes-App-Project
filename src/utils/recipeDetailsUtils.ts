import { RecipeType } from './types';

export function recipeIngredients(description: RecipeType) {
  const ingredients = Object.entries(description)
    .filter((entry) => entry[0].includes('strIngredient') && entry[1])
    .map((entry) => entry[1]);

  const measures = Object.entries(description)
    .filter((entry) => entry[0].includes('strMeasure') && entry[1])
    .map((entry) => entry[1]);

  const ingredientsAndMeasures = ingredients.map((ingredient, index) => (
    `${ingredient} - ${measures[index]}`
  ));

  return ingredientsAndMeasures;
}

export function youtubeVideoLink(url: string) {
  const youtubeLink = 'https://www.youtube.com/embed/';
  const youtubeId = url.split('v=')[1];
  return `${youtubeLink}${youtubeId}`;
}
