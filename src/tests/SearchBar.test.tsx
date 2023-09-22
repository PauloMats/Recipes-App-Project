import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import { MemoryRouter, Route, BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

export const renderWithRouter = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
};
const testIds = {
  SEARCH_INPUT: 'search-input',
  INGREDIENT_SEARCH_RADIO: 'ingredient-search-radio',
  NAME_SEARCH_RADIO: 'name-search-radio',
  FIRST_LETTER_SEARCH_RADIO: 'first-letter-search-radio',
  EXEC_SEARCH_BTN: 'exec-search-btn',
};

describe('SearchBar Component', () => {
  test('should render without errors', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>,
    );
  });

  test('should render input and buttons', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>,
    );
    Object.values(testIds).forEach((testId) => {
      expect(getByTestId(testId)).toBeInTheDocument();
    });
  });

  test('should update searchType state when radio button is clicked', () => {
    const { getByTestId } = render(

      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>,
    );
    const ingredientRadio = getByTestId(testIds.INGREDIENT_SEARCH_RADIO);
    fireEvent.click(ingredientRadio);
    expect(ingredientRadio).toBeChecked();
  });

  test('handleSearchTypeChange updates searchType correctly', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>,
    );
    const ingredientRadio = getByTestId(testIds.INGREDIENT_SEARCH_RADIO);
    const nameRadio = getByTestId(testIds.NAME_SEARCH_RADIO);
    const firstLetterRadio = getByTestId(testIds.FIRST_LETTER_SEARCH_RADIO);

    expect(ingredientRadio).toBeChecked();
    expect(nameRadio).not.toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();

    fireEvent.click(nameRadio);

    expect(ingredientRadio).not.toBeChecked();
    expect(nameRadio).toBeChecked();
    expect(firstLetterRadio).not.toBeChecked();

    fireEvent.click(firstLetterRadio);

    expect(ingredientRadio).not.toBeChecked();
    expect(nameRadio).not.toBeChecked();
    expect(firstLetterRadio).toBeChecked();
  });

  test('handleSearchInputChange updates searchValue correctly', () => {
    const { getByTestId } = render(

      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>,
    );
    const input = getByTestId(testIds.SEARCH_INPUT);

    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: 'chicken' } });

    expect(input).toHaveValue('chicken');
  });

  test('Pesquisa com tipo "ingredient" funciona corretamente', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>,
    );

    const searchInput = getByTestId(testIds.SEARCH_INPUT);
    const searchBtn = getByTestId(testIds.EXEC_SEARCH_BTN);

    fireEvent.change(searchInput, { target: { value: 'chicken' } });
    fireEvent.click(searchBtn);

    await waitFor(() => getByTestId('0-recipe-card'));

    expect(getByTestId('0-recipe-card')).toBeInTheDocument();
  });

  test('Pesquisa com tipo "first-letter" mostra alerta para entrada inválida', () => {
    const alertSpy = vi.spyOn(window, 'alert');
    alertSpy.mockImplementation(() => { });

    const { getByTestId } = render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>,
    );
    const searchInput = getByTestId(testIds.SEARCH_INPUT);
    const searchTypeRadio = getByTestId(testIds.FIRST_LETTER_SEARCH_RADIO);
    const searchBtn = getByTestId(testIds.EXEC_SEARCH_BTN);

    fireEvent.change(searchInput, { target: { value: 'abc' } });
    fireEvent.click(searchTypeRadio);
    fireEvent.click(searchBtn);

    expect(alertSpy).toHaveBeenCalledWith('Your search must have only 1 (one) character');

    alertSpy.mockRestore();
  });

  test('Pesquisa de receitas funciona corretamente', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>,
    );
    const nameRadio = getByTestId(testIds.NAME_SEARCH_RADIO);
    fireEvent.click(nameRadio);
    expect(nameRadio).toBeChecked();

    const searchInput = screen.getByTestId(testIds.SEARCH_INPUT);
    const searchBtn = screen.getByTestId(testIds.EXEC_SEARCH_BTN);

    fireEvent.change(searchInput, { target: { value: 'Chicken Handi' } });
    fireEvent.click(searchBtn);

    await waitFor(() => expect(screen.getByText('Chicken Handi')).toBeInTheDocument());

    // Verifique se a rota foi alterada corretamente
    expect(window.location.pathname).toBe('/');
  });

  test('Testar bloco .catch para erro na pesquisa', async () => {
    const errorMock = vi.spyOn(console, 'error');

    global.fetch = vi.fn(() => Promise.reject(new Error('Erro na pesquisa')));

    const { getByTestId } = render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>,
    );

    const searchInput = getByTestId(testIds.SEARCH_INPUT);
    const searchBtn = getByTestId(testIds.EXEC_SEARCH_BTN);

    fireEvent.change(searchInput, { target: { value: 'Chicken' } });
    fireEvent.click(searchBtn);
    await waitFor(() => {
      expect(errorMock).toHaveBeenCalledWith(expect.any(Error));
      expect(errorMock.mock.calls[0][0].message).toBe('Erro na pesquisa');
    });
    errorMock.mockRestore();
  });

  test('displays an alert when data.meals and data.drinks are both missing', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: null, meals: null }), // Return an empty object
    }));

    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByTestId(testIds.SEARCH_INPUT), { target: { value: 'test' } });
    fireEvent.change(screen.getByTestId(testIds.INGREDIENT_SEARCH_RADIO), { target: { value: 'ingredient' } });
    fireEvent.click(screen.getByTestId(testIds.EXEC_SEARCH_BTN));

    // await act(async () => {
    //   await new Promise((resolve) => setTimeout(resolve, 0));
    // });

    await waitFor(() => {
      // Expect the alert to have been called when both drinks and meals are missing
      expect(window.alert).toHaveBeenCalledWith(
        'Sorry, we haven\'t found any recipes for these filters.',
      );
    });
  });
  test('navigates to the drinks details page when one drink is found', async () => {
    const { user, getByTestId } = renderWithRouter(<SearchBar />);

    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve({ drinks: [{ idDrink: '11115' }] }), // Retorne um drink
    }) as unknown as Response);

    user.type(getByTestId('search-input'), 'test');
    user.click(getByTestId('ingredient-search-radio'));
    user.click(getByTestId('exec-search-btn'));

    await act(async () => {
      await waitFor(() => {
        expect(window.location.pathname).toBe('/drinks/11115');
      });
    });
  });
});
