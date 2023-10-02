import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../Helper/renderWihtRouter';
import RecipeInProgress from '../Pages/pages/RecipeInProgress';
import { mockDetails, mockDrinks } from '../Helper/mockDetailsAPI';

const drinkRoute = '/drinks/15997/in-progress';
const mealRoute = '/meals/53065/in-progress';
const checkbox0 = 'checkbox-0';
const checkbox1 = 'checkbox-1';
const checkbox2 = 'checkbox-2';
const checkbox3 = 'checkbox-3';
const checkbox4 = 'checkbox-4';
const checkbox5 = 'checkbox-5';
const checkbox6 = 'checkbox-6';
const finishBtn = 'finish-recipe-btn';
const favorite = 'favorite-btn';
const share = 'share-btn';

describe('Testa a página de receita em progressso', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });
  test('Renderiza sem erros', () => {
    render(
      <MemoryRouter>
        <RecipeInProgress />
      </MemoryRouter>,
    );
  });
  test('Testa se os elementos são renderizados', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockDetails,
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    renderWithRouter(<App />, { route: mealRoute });
    expect(window.location.pathname).toBe('/meals/53065/in-progress');
    expect(await screen.findByTestId(favorite)).toBeInTheDocument();
    expect(await screen.findByTestId(share)).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-photo')).toBeInTheDocument();
    expect(await screen.findByTestId('instructions')).toBeInTheDocument();
    expect(await screen.findByTestId('0-ingredient-step')).toBeInTheDocument();
    expect(await screen.findByTestId('1-ingredient-step')).toBeInTheDocument();
    expect(await screen.findByTestId('2-ingredient-step')).toBeInTheDocument();
    expect(await screen.findByTestId('3-ingredient-step')).toBeInTheDocument();
    expect(await screen.findByTestId('4-ingredient-step')).toBeInTheDocument();
    expect(await screen.findByTestId('5-ingredient-step')).toBeInTheDocument();
    expect(await screen.findByTestId('6-ingredient-step')).toBeInTheDocument();
    expect(await screen.findByTestId(checkbox0)).toBeInTheDocument();
    expect(await screen.findByTestId(checkbox1)).toBeInTheDocument();
    expect(await screen.findByTestId(checkbox2)).toBeInTheDocument();
    expect(await screen.findByTestId(checkbox3)).toBeInTheDocument();
    expect(await screen.findByTestId(checkbox4)).toBeInTheDocument();
    expect(await screen.findByTestId(checkbox5)).toBeInTheDocument();
    expect(await screen.findByTestId(checkbox6)).toBeInTheDocument();
    expect(await screen.findByTestId(finishBtn)).toBeInTheDocument();
    expect(await screen.findByTestId(finishBtn)).toHaveAttribute('disabled');
  });
  test('Verifica o botão de favoritar', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockDetails,
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    const data = JSON.stringify([{ id: '53065', type: 'meal', nationality: 'Japanese', category: 'Seafood', alcoholicOrNot: '', name: 'Sushi', image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg' }]);
    renderWithRouter(<App />, { route: mealRoute });
    expect(await screen.findByTestId(favorite)).toBeInTheDocument();
    expect(localStorage.getItem('favoriteRecipes')).toBe(null);
    expect(screen.getByTestId(favorite)).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
    await userEvent.click(await screen.findByTestId(favorite));
    expect(screen.getByTestId(favorite)).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
    expect(localStorage.getItem('favoriteRecipes')).toBe(data);
  });
  test('Verifica o botão share', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockDetails,
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    renderWithRouter(<App />, { route: mealRoute });
    expect(await screen.findByTestId(share)).toBeInTheDocument();
    await userEvent.click(await screen.findByTestId('share-btn'));
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();
  });
  test('Verifica os inputs', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockDetails,
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    renderWithRouter(<App />, { route: mealRoute });
    await userEvent.click(await screen.findByTestId(checkbox0));
    await userEvent.click(await screen.findByTestId(checkbox1));
    expect(await screen.findByTestId('0-ingredient-step')).toHaveAttribute('style', 'text-decoration: line-through; color: rgb(0, 0, 0);');
  });
  // test('Verifica o item', async () => {
  //   const MOCK_RESPONSE = {
  //     ok: true,
  //     status: 200,
  //     json: async () => mockDetails,
  //   } as Response;
  //   vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
  //   renderWithRouter(<App />, { route: mealRoute });
  //   const finishButton = await screen.findByRole('button', { name: /finish recipe/i });

  //   await waitFor(async () => {
  //     await screen.getByText(/sushi rice - 300ml/i);
  //     await screen.getByText(/rice wine - 100ml/i);
  //     await screen.getByText(/caster sugar - 2 tbs/i);
  //     await screen.getByText(/mayonnaise - 3 tbs/i);
  //     await screen.getByText(/rice wine - 1 tbs/i);
  //     await screen.getByText(/soy sauce - 1 tbs/i);
  //     await screen.getByText(/cucumber - 1/i);
  //   }, { timeout: 5000 });
  //   const check1 = await screen.getByText(/sushi rice - 300ml/i);
  //   const check2 = await screen.getByText(/rice wine - 100ml/i);
  //   const check3 = await screen.getByText(/caster sugar - 2 tbs/i);
  //   const check4 = await screen.getByText(/mayonnaise - 3 tbs/i);
  //   const check5 = await screen.getByText(/rice wine - 1 tbs/i);
  //   const check6 = await screen.getByText(/soy sauce - 1 tbs/i);
  //   const check7 = await screen.getByText(/cucumber - 1/i);
  //   await userEvent.click(check1);
  //   await userEvent.click(check2);
  //   await userEvent.click(check3);
  //   await userEvent.click(check4);
  //   await userEvent.click(check5);
  //   await userEvent.click(check6);
  //   await userEvent.click(check7);
  //   await userEvent.click(finishButton);
  //   waitFor(() => {
  //     expect(window.location.pathname).toBe('/done-recipes');
  //   }, { timeout: 5000 });
  // });

  test('Verifica se os itens do drink foram renderizados corretamente', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mockDrinks,
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    renderWithRouter(<App />, { route: drinkRoute });
    expect(await screen.findByTestId(favorite)).toBeInTheDocument();
    expect(await screen.findByTestId(share)).toBeInTheDocument();
    expect(await screen.findByTestId('recipe-title')).toBeInTheDocument();
    expect(await screen.findByTestId('0-ingredient-step')).toBeInTheDocument();
    expect(await screen.findByTestId('1-ingredient-step')).toBeInTheDocument();
    expect(await screen.findByTestId('2-ingredient-step')).toBeInTheDocument();
    expect(await screen.findByTestId(checkbox0)).toBeInTheDocument();
    expect(await screen.findByTestId(checkbox1)).toBeInTheDocument();
    expect(await screen.findByTestId(checkbox2)).toBeInTheDocument();
    expect(await screen.findByTestId(finishBtn)).toBeInTheDocument();
    expect(await screen.findByTestId(finishBtn)).toHaveAttribute('disabled');
  });
  // test('Verifica o botão share', async () => {
  //   const MOCK_RESPONSE = {
  //     ok: true,
  //     status: 200,
  //     json: async () => mockDrinks,
  //   } as Response;
  //   vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
  //   const data = '[{"id":"15997","type":"drink","nationality":"","category":"Ordinary Drink","alcoholicOrNot":"Optional alcohol","name":"GG","image":"https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg"}]';
  //   renderWithRouter(<App />, { route: drinkRoute });
  //   expect(await screen.findByTestId(favorite)).toBeInTheDocument();
  //   expect(localStorage.getItem('favoriteRecipes')).toBe(null);
  //   expect(screen.getByTestId(favorite)).toHaveAttribute('src', '/src/images/whiteHeartIcon.svg');
  //   await userEvent.click(await screen.findByTestId(favorite));
  //   expect(screen.getByTestId(favorite)).toHaveAttribute('src', '/src/images/blackHeartIcon.svg');
  //   expect(localStorage.getItem('favoriteRecipes')).toBe(data);
  // });
});
