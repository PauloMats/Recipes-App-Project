import { screen } from '@testing-library/dom';
import renderWithRouter  from '../Helper/renderWihtRouter';
import Profile from '../Pages/pages/Profile';

const profId = 'profile-top-btn';
const buttonInputId = 'search-top-btn';

describe('Testa o componente Profile', () => {
  test('Verifica todos os botões são exibidos na tela e inclusive o e', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
    renderWithRouter(<Profile />, { route: '/profile' });

    expect(screen.getByText('teste@teste.com')).toBeInTheDocument();
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão "Done Recipes"', async () => {
    const { user } = renderWithRouter(<Profile />, { route: '/profile' });

    const buttonDone = screen.getByTestId('profile-done-btn');
    await user.click(buttonDone);

    expect(window.location.pathname).toBe('/done-recipes');
  });

  test('Testa se ao clicar no botão "Favorite Recipes"', async () => {
    const { user } = renderWithRouter(<Profile />, { route: '/profile' });

    const buttonFavorite = screen.getByTestId('profile-favorite-btn');
    await user.click(buttonFavorite);

    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  test('Testa se ao clicar no botão "Logout"', async () => {
    const { user } = renderWithRouter(<Profile />, { route: '/profile' });

    const buttonLogout = screen.getByTestId('profile-logout-btn');
    await user.click(buttonLogout);

    expect(window.location.pathname).toBe('/');
  });
});

