import { MemoryRouter, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { render, screen, waitFor, within } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../Helper/renderWihtRouter';
import { mockDetails } from '../Helper/mockDetailsAPI';
import App from '../App';
import RecipeInProgress from '../Pages/pages/RecipeInProgress';

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

const drinkRoute = '/drinks/15997/in-progress';
const rotaTestada = '/meals/53065';
const favorite = 'favorite-btn';
const startRecipeBtn = 'start-recipe-btn';
const start = 'Start Recipe';
const share = 'share-btn';
const testLocalStorage = {
  drinks: {},
  meals: {
    52771: [],
  },
};

describe('Testa a página de detalhes de uma bebida', () => {
  test('Renderiza sem erros', () => {
    render(
      <MemoryRouter>
        <RecipeInProgress />
      </MemoryRouter>,
    );
  });
  test('Verifica se os itens foram renderizados corretamente', async () => {
    renderWithRouter(<App />, { route: drinkRoute });
    expect(await screen.findByTestId(favorite)).toBeInTheDocument();
    expect(await screen.findByTestId(share)).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
    expect(await screen.findByTestId('0-ingredient-step')).toBeInTheDocument();
    expect(await screen.findByTestId('1-ingredient-step')).toBeInTheDocument();
    expect(await screen.findByTestId('2-ingredient-step')).toBeInTheDocument();
  });
  test('Verifica o botão share', async () => {
    renderWithRouter(<App />, { route: drinkRoute });
    expect(await screen.findByTestId(share)).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId('share-btn'));
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
  });
  test('Verifica o botão de favoritar', async () => {
    const data = '[{"id":"15997","type":"drink","nationality":"Japanese","category":"Seafood","alcoholicOrNot":"","name":"Sushi","image":"https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg"}]';
    renderWithRouter(<App />, { route: drinkRoute });
    expect(await screen.findByTestId(favorite)).toBeInTheDocument();
    expect(screen.getByTestId(favorite)).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    await userEvent.click(await screen.findByTestId(favorite));
    expect(screen.getByTestId(favorite)).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
    expect(localStorage.getItem('favoriteRecipes')).toBe(data);
  });
  test('Verifica o botão de finalizar a receita', async () => {
    renderWithRouter(<App />, { route: drinkRoute });
    const checkbox0 = await screen.findByTestId('checkbox-0');
    const checkbox1 = await screen.findByTestId('checkbox-1');
    const checkbox2 = await screen.findByTestId('checkbox-2');
    expect(checkbox0).toBeInTheDocument();
    expect(checkbox1).toBeInTheDocument();
    expect(checkbox2).toBeInTheDocument();
    userEvent.click(checkbox0);
    userEvent.click(checkbox1);
    userEvent.click(checkbox2);
    userEvent.click(screen.getByTestId('finish-recipe-btn'));
    // await waitFor(() => {
    //   expect(screen.getByTestId('0')).toBeInTheDocument();
    //   expect(screen.getByTestId('1')).toBeInTheDocument();
    //   expect(screen.getByTestId('2')).toBeInTheDocument();
    //   userEvent.click(screen.getByTestId('0'));
    //   userEvent.click(screen.getByTestId('1'));
    //   userEvent.click(screen.getByTestId('2'));
    //   userEvent.click(screen.getByTestId('finish-recipe-btn'));
    // });
    // await userEvent.click(screen.getByTestId('0'));
    // await userEvent.click(screen.getByTestId('1'));
    // await userEvent.click(screen.getByTestId('2'));
    // await userEvent.click(await screen.findByTestId('finish-recipe-btn'));
    // await expect(screen.getByTestId('0')).toBeInTheDocument();
    // await expect(screen.getByTestId('1')).toBeInTheDocument();
    // await expect(screen.getByTestId('2')).toBeInTheDocument();
    // await userEvent.click(await screen.findByTestId('finish-recipe-btn'));
    // expect(window.location.pathname).toBe('/done-recipes');
    // await expect(await localStorage.getItem('doneRecipes')).toBe('[{"id":"15997","type":"drink","area":"","category":"Seafood","alcoholicOrNot":"","name":"Sushi","image":"https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg","doneDate":"2021-8-26"}]');
  });
});
