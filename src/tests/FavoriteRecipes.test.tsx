import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import FavoriteRecipes from '../Pages/FavoriteRecipes';
import FavoriteCard from '../components/FavoriteCard';

const mockRecipe = {
  id: '52771',
  type: 'meal',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
};

const mockDrink = {
  id: '13501',
  type: 'drink',
  nationality: '',
  category: 'Shot',
  alcoholicOrNot: 'Alcoholic',
  name: 'ABC',
  image: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
};

beforeEach(() => {
  Object.defineProperty(global.navigator, 'clipboard', {
    value: {
      writeText: vi.fn(),
    },
    writable: true,
  });
});

describe('Testa a página de receitas favoritas', () => {
  it('Renderiza sem erros', () => {
    render(
      <MemoryRouter>
        <FavoriteRecipes />
      </MemoryRouter>,
    );
  });

  it('Testa se os elementos são renderizados', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([mockRecipe, mockDrink]));
    render(
      <MemoryRouter>
        <FavoriteRecipes />
      </MemoryRouter>,
    );

    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');

    expect(allButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('filter-by-all-btn'));
    await userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    expect(await screen.findByTestId('0-horizontal-image')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('filter-by-drink-btn'));
  });

  it('Testa se as funções são chamadas quando os botões são clicados', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([mockRecipe]));

    render(
      <MemoryRouter>
        <FavoriteRecipes />
      </MemoryRouter>,
    );

    const shareButton = await screen.findByTestId('0-horizontal-share-btn');
    await userEvent.click(shareButton);
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument();

    const favoriteButton = await screen.findByTestId('0-horizontal-favorite-btn');
    await userEvent.click(favoriteButton);
    expect(localStorage.getItem('favoriteRecipes')).toBe('[]');
  });
  it('Testa se a rota muda ao clicar na imagem', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([mockRecipe]));

    render(
      <MemoryRouter>
        <FavoriteRecipes />
      </MemoryRouter>,
    );

    const detailImage = await screen.findByTestId('0-horizontal-image');
    await userEvent.click(detailImage);
    await waitFor(() => {
      expect(window.location.pathname).not.toBe('/favorite-recipes');
    });
  });
  it('Testa se a rota muda ao clicar no nome', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify([mockRecipe]));

    render(
      <MemoryRouter>
        <FavoriteRecipes />
      </MemoryRouter>,
    );

    const detailImage = await screen.findByTestId('0-horizontal-name');
    await userEvent.click(detailImage);
    await waitFor(() => {
      expect(window.location.pathname).not.toBe('/favorite-recipes');
    });
  });
});

describe('Testa o FavoriteCard', () => {
  it('Testa se os componentes são renderizados', async () => {
    const handleShare = vi.fn();
    const handleFavorite = vi.fn();

    render(
      <MemoryRouter>
        <FavoriteCard
          recipe={ mockRecipe }
          index={ 0 }
          handleShare={ handleShare }
          handleFavorite={ handleFavorite }
          isShare={ false }
        />
      </MemoryRouter>,
    );

    const categoryOrNot = await screen.findByText(/Italian - Vegetarian -/i);
    expect(categoryOrNot).toBeInTheDocument();
  });
  it('Deveria chamar handleShare e handleFavorite quando os botões correspondentes são clicados', async () => {
    const handleShare = vi.fn();
    const handleFavorite = vi.fn();

    render(
      <MemoryRouter>
        <FavoriteCard
          recipe={ mockRecipe }
          index={ 0 }
          handleShare={ handleShare }
          handleFavorite={ handleFavorite }
          isShare={ false }
        />
      </MemoryRouter>,
    );

    const shareButton = screen.getByTestId('0-horizontal-share-btn');
    await userEvent.click(shareButton);
    expect(handleShare).toHaveBeenCalled();

    const favoriteButton = screen.getByTestId('0-horizontal-favorite-btn');
    await userEvent.click(favoriteButton);
    expect(handleFavorite).toHaveBeenCalled();
  });
});
