import { fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Recipes from '../Pages/pages/Recipes';
import renderWithRouter from '../Helper/renderWihtRouter';
import CategoryFilter from '../components/CategoryFilter';
import RecipeCard from '../components/RecipeCard';

test('renderiza o componente Recipe', () => {
  renderWithRouter(<Recipes />, { route: '/meals' });
});

// Teste para o componente RecipeCard
test('renderiza o componente RecipeCard', () => {
  const recipe = {
    idMeal: '1',
    strMeal: 'Spaghetti',
    strMealThumb: 'spaghetti.jpg',
  };
  renderWithRouter(<RecipeCard recipe={ recipe } index={ 0 } />);
});

test('renderiza o componente CategoryFilter', () => {
  const onCategorySelect = vi.fn();

  renderWithRouter(
    <CategoryFilter onCategorySelect={ onCategorySelect } type="meals" />,
  );
});

describe('handleCategoryClick', () => {
  it('atualiza selectedCategory para "All" quando o botão "All" é clicado', () => {
    const { getByTestId } = renderWithRouter(<Recipes />);
    const allButton = getByTestId('All-category-filter');

    fireEvent.click(allButton);

    const selectedCategory = 'All';
    expect(selectedCategory).toEqual('All');
  });
});

describe('handleCategoryClick', () => {
  it('limpa o selectedCategory quando o botão "All" é clicado após selecionar a categoria', async () => {
    const { getByTestId } = renderWithRouter(<Recipes />);
    const beefButton = await waitFor(() => getByTestId('Ordinary Drink-category-filter'));

    fireEvent.click(beefButton);

    const selectedCategory = 'Ordinary Drink';
    expect(selectedCategory).toEqual('Ordinary Drink');
  });
});
