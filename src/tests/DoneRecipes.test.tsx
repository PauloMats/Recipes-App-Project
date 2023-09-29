import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../utils/renderWithRouter';
import DoneRecipes from '../components/DoneRecipes';

beforeEach(() => {
  const mockedDoneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  localStorage.setItem('doneRecipes', JSON.stringify(mockedDoneRecipes));
});

describe('Testa a page DoneRecipes', () => {
  it('Verificando os botões de filtro e compartilhar', async () => {
    await renderWithRouter(<DoneRecipes />);
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    const buttonMeals = screen.getByTestId('filter-by-meal-btn');
    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(buttonAll).toBeInTheDocument();
    expect(buttonMeals).toBeInTheDocument();
    expect(buttonDrinks).toBeInTheDocument();

    const buttonShare = screen.getAllByTestId('0-horizontal-share-btn');
    expect(buttonShare.length > 0).toBe(true);

    await userEvent.click(buttonShare[0]);
    const linkCopied = screen.getAllByText('Link copied!');
    expect(linkCopied.length > 0).toBe(true);
  });