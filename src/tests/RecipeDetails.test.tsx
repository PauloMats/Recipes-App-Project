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
const favorite = 'favorite-btn';
const startRecipeBtn = 'start-recipe-btn';

describe('Testa a página de detalhes de uma receita', () => {
  test('Renderiza sem erros', () => {
    render(
      <MemoryRouter>
        <RecipeDetails />
      </MemoryRouter>,
    );
  });
  test('Testa se os elementos são renderizados', async () => {
    renderWithRouter(<App />, { route: rotaTestada });
    expect(await screen.findByTestId('recipe-photo')).toBeInTheDocument();
    expect(await screen.findByTestId('share-btn')).toBeInTheDocument();
    expect(await screen.findByTestId(favorite)).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-category')).toBeInTheDocument();
    expect(await screen.findByTestId('instructions')).toBeInTheDocument();
    expect(await screen.findByTestId('video')).toBeInTheDocument();
    expect(await screen.findByTestId(startRecipeBtn)).toBeInTheDocument();
  });
  test('Testa se a funcionalidade dos elementos de evento', async () => {
    renderWithRouter(<App />, { route: rotaTestada });

    await userEvent.click(await screen.findByTestId('share-btn'));
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
    // expect(await screen.findByTestId('favorite-btn')).toBeInTheDocument();
    // await userEvent.click(screen.getByRole('img', { name: /favorite/i }));

    // await userEvent.click(screen.getByRole('button', { name: /favorite/i }));
    // expect(localStorage.getItem('favoriteRecipes')).tobe();
  });
  test('Testa o botao de favorito', async () => {
    renderWithRouter(<App />, { route: rotaTestada });
    expect(await screen.findByTestId(favorite)).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId(favorite));
    expect(localStorage.getItem('favoriteRecipes')).toBe('[{"id":"53065","type":"meal","nationality":"Japanese","category":"Seafood","alcoholicOrNot":"","name":"Sushi","image":"https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg"}]');
    await userEvent.click(await screen.findByTestId(favorite));
  });
  test('Testa o botao de iniciar a receita', async () => {
    const data = '{"meals":{"53065":[["Sushi Rice - 300ml ","Rice wine - 100ml","Caster Sugar - 2 tbs","Mayonnaise - 3 tbs","Rice wine - 1 tbs","Soy Sauce - 1 tbs","Cucumber - 1","  -  ","  -  ","  -  ","  -  ","  -  ","  -  ","  -  ","  -  ","  -  ","  -  ","  -  ","  -  ","  -  "]]}}';
    renderWithRouter(<App />, { route: rotaTestada });
    await expect(await screen.findByTestId(startRecipeBtn)).toHaveTextContent('Start Recipe');
    await userEvent.click(await screen.findByTestId(startRecipeBtn));
    expect(screen.queryByTestId(startRecipeBtn)).toBeNull();
    expect(screen.getByRole('heading', { name: /recipeinprogress/i })).toBeInTheDocument();
    expect(localStorage.getItem('inProgressRecipes')).toBe(data);
  });
  // test('teste teste', async () => {
  //   const data = '{"meals":{"53065":[["Sushi Rice - 300ml ","Rice wine - 100ml","Caster Sugar - 2 tbs","Mayonnaise - 3 tbs","Rice wine - 1 tbs","Soy Sauce - 1 tbs","Cucumber - 1","  -  ","  -  ","  -  ","  -  ","  -  ","  -  ","  -  ","  -  ","  -  ","  -  ","  -  ","  -  ","  -  "]]}}';
  //   const history = createMemoryHistory();

  //   renderWithRouter(<App />, { route: rotaTestada });

  //   await expect(await screen.findByTestId(startRecipeBtn)).toHaveTextContent('Start Recipe');
  //   await userEvent.click(await screen.findByTestId(startRecipeBtn));

  //   expect(screen.queryByTestId(startRecipeBtn)).toBeNull();
  //   expect(screen.getByRole('heading', { name: /recipeinprogress/i })).toBeInTheDocument();
  //   expect(localStorage.getItem('inProgressRecipes')).toBe(data);

  //   history.back();
  //   // await waitFor(() => expect(screen.findByTestId(startRecipeBtn)).toHaveTextContent('Continue Recipe'));
  // });
});
