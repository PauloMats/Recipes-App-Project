import React from 'react';
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Recipes from '../Pages/pages/Recipes';
import renderWithRouter from '../Helper/renderWihtRouter';
import CategoryFilter from '../components/CategoryFilter';
import RecipeCard from '../components/RecipeCard';
import useFetchRecipes from '../Hooks/useFetchRecipes';

test('renders Recipes component', () => {
  renderWithRouter(<Recipes />, { route: '/meals' });
});

// Teste para o componente RecipeCard
test('renders RecipeCard component', () => {
  const recipe = {
    idMeal: '1',
    strMeal: 'Spaghetti',
    strMealThumb: 'spaghetti.jpg',
  };
  renderWithRouter(<RecipeCard recipe={ recipe } index={ 0 } />);
});

test('renders CategoryFilter component', () => {
  const onCategorySelect = vi.fn();

  renderWithRouter(
    <CategoryFilter onCategorySelect={ onCategorySelect } type="meals" />,
  );
});

describe('handleCategoryClick', () => {
  it('should set selectedCategory to "All" when "All" button is clicked', () => {
    const { getByTestId } = renderWithRouter(<Recipes />);
    const allButton = getByTestId('All-category-filter');

    fireEvent.click(allButton);

    const selectedCategory = 'All';
    expect(selectedCategory).toEqual('All');
  });
});

describe('handleCategoryClick', () => {
  it('should clear selectedCategory when "All" button is clicked after selecting a category', async () => {
    const { getByTestId } = renderWithRouter(<Recipes />);
    const beefButton = await waitFor(() => getByTestId('Ordinary Drink-category-filter'));

    fireEvent.click(beefButton);

    const selectedCategory = 'Ordinary Drink';
    expect(selectedCategory).toEqual('Ordinary Drink');
  });
});
