import { MemoryRouter, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import renderWithRouter from '../Helper/renderWihtRouter';
import RecipeDetails from '../components/RecipeDetails';
import { mockDetails } from '../Helper/mockDetailsAPI';
import App from '../App';

beforeEach(() => {
  const MOCK_RESPONSE = {
    ok: true,
    status: 200,
    json: async () => mockDetails,
  } as Response;
  const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
});

const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
  getItemSpy.mockClear();
  setItemSpy.mockClear();
});

const recipeMock = [
  {
    idMeal: 1,
    strMeal: 'Meal Name',
    strMealThumb: 'meal_image.jpg',
    strCategory: 'Meal Category',
    strInstructions: 'Instructions for the meal',
  },
];

const testIds = {
  PHOTO: 'recipe-photo',
  SHARE: 'share-btn',
  // FAVORITE: 'favorite-btn',
  TITLE: 'recipe-title',
  CATEGORY: 'recipe-category',
  INSTRUCTIONS: 'instructions',
  VIDEO: 'video',
  // START_RECIPE: 'start-recipe-btn',
};

const rotaTestada = '/meals/53065';
const rotaTestadaDrink = '/drinks/15997';
const favorite = 'favorite-btn';
const startRecipeBtn = 'start-recipe-btn';
const start = 'Start Recipe';
const testLocalStorage = {
  drinks: {},
  meals: {
    52771: [],
  },
};
